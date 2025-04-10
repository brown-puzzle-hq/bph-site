"use client";
import { useState, useEffect, Fragment, startTransition } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { Check, ChevronDown, CornerUpLeft, Pencil, X } from "lucide-react";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import {
  editMessage,
  insertFollowUp,
  insertHintRequest,
  MessageType,
} from "../actions";
import { toast } from "~/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type TableProps = {
  previousHints: PreviousHints;
  hintRequestState: HintRequestState;
  teamDisplayName?: string;
  reply?: number;
  puzzleId?: string;
  puzzleName?: string;
};

// Intitial state
type PreviousHints = {
  id: number;
  request: string;
  response: string | null;
  team: {
    id: string;
    displayName: string;
    members: string;
  };
  claimer: {
    id: string;
    displayName: string;
  } | null;
  requestTime: Date;
  followUps: {
    id: number;
    message: string;
    user: { id: string; displayName: string };
    time: Date;
  }[];
}[];

// Requesting hint state
type HintRequestState = {
  puzzleId: string;
  hintsRemaining: number;
  unansweredHint: { puzzleId: string; puzzleName: string } | null;
  isSolved: boolean;
};

// Edited messages
type EditedMessage = {
  id: number;
  value: string;
  type: MessageType;
};

// New follow-up messages
type FollowUp = {
  hintId: number;
  message: string;
};

const DURATION = 0.15;

export default function HuntHintThreads({
  previousHints,
  hintRequestState,
  teamDisplayName,
  reply,
  puzzleId,
  puzzleName,
}: TableProps) {
  const { data: session } = useSession();
  const [optimisticHints, setOptimisticHints] = useState(previousHints);
  const [request, setRequest] = useState<string>("");
  const [newFollowUp, setNewFollowUp] = useState<FollowUp | null>(
    reply ? { hintId: reply, message: "" } : null,
  );
  const [edit, setEdit] = useState<EditedMessage | null>(null);
  const [hiddenFollowUps, setHiddenFollowUps] = useState<number[]>([]);

  const handleSubmitRequest = async (puzzleId: string, message: string) => {
    setOptimisticHints((prev) => [
      ...prev,
      {
        id: 0,
        team: {
          displayName: session?.user?.displayName!,
          id: session?.user?.id!,
          members: "",
        },
        claimer: null,
        request,
        response: null,
        requestTime: new Date(),
        followUps: [],
      },
    ]);
    setRequest("");

    startTransition(async () => {
      const id = await insertHintRequest(puzzleId, message);
      if (!id) {
        // Revert optimistic update
        setOptimisticHints((prev) => prev.filter((hint) => hint.id !== 0));
        setRequest(request);
      } else {
        // Update followUpId
        startTransition(() => {
          setOptimisticHints((prev) =>
            prev.map((hint) =>
              hint.id === 0
                ? {
                    ...hint,
                    id,
                  }
                : hint,
            ),
          );
        });
      }
    });
  };

  const handleSubmitEdit = async (
    id: number,
    value: string,
    type: MessageType,
  ) => {
    startTransition(async () => await editMessage(id, value, type));
    setOptimisticHints((prev) =>
      prev.map((hint) => {
        if (!hint) return hint;
        switch (type) {
          case "request":
            return hint.id === id ? { ...hint, request: value } : hint;
          case "response":
            return hint.id === id ? { ...hint, response: value } : hint;
          case "follow-up":
            return {
              ...hint,
              followUps: hint.followUps.map((followUp) =>
                followUp.id === id ? { ...followUp, message: value } : followUp,
              ),
            };
          default:
            return hint;
        }
      }),
    );
    setEdit(null);
  };

  const handleSubmitFollowUp = async (
    hintId: number,
    message: string,
    members: string,
  ) => {
    // Optimistic update
    setOptimisticHints((prev) =>
      prev.map((hint) =>
        hint.id === hintId
          ? {
              ...hint,
              followUps: hint.followUps.concat({
                id: 0,
                message,
                user: {
                  displayName: session!.user!.displayName,
                  id: session!.user!.id!,
                },
                time: new Date(),
              }),
            }
          : hint,
      ),
    );

    setNewFollowUp(null);

    startTransition(async () => {
      // TODO: is there a better option than passing a ton of arguments?
      // wondering if we should have centralized hint types, same goes for inserting/emailing normal hint responses
      // Also might be more efficient to only pass team members once instead of storing in each hint
      const followUpId = await insertFollowUp({
        hintId,
        members,
        teamId: session?.user?.id,
        teamDisplayName,
        puzzleId,
        puzzleName,
        message,
      });

      if (followUpId === null) {
        // Revert optimistic update
        setOptimisticHints((prev) =>
          prev.map((hint) =>
            hint.id === hintId
              ? {
                  ...hint,
                  followUps: hint.followUps.filter(
                    (followUp) => followUp.id !== 0,
                  ),
                }
              : hint,
          ),
        );
        setNewFollowUp(newFollowUp); // Works since variable changes are not instant
        toast({
          title: "Failed to submit follow-up.",
          description:
            "Please try again. If the problem persists, contact HQ or use the feedback form.",
          variant: "destructive",
        });
      } else {
        // Update followUpId
        setOptimisticHints((prev) =>
          prev.map((hint) =>
            hint.id === hintId
              ? {
                  ...hint,
                  followUps: hint.followUps.map((followUp) =>
                    followUp.id === 0
                      ? { ...followUp, id: followUpId }
                      : followUp,
                  ),
                }
              : hint,
          ),
        );
      }
    });
  };

  const handleHideFollowUps = (hintId: number) => {
    if (hiddenFollowUps.includes(hintId)) {
      setHiddenFollowUps((prev) => prev.filter((id) => id !== hintId));
    } else {
      setHiddenFollowUps((prev) => prev.concat(hintId));
      if (newFollowUp?.hintId === hintId) {
        setTimeout(() => setNewFollowUp(null), DURATION * 1000);
      }
    }
  };

  const getFormDescription = (hintRequestState: HintRequestState) => {
    const { puzzleId, hintsRemaining, unansweredHint, isSolved } =
      hintRequestState;
    if (
      new Date() >
      (session?.user?.interactionMode === "in-person"
        ? IN_PERSON.END_TIME
        : REMOTE.END_TIME)
    ) {
      return <>Hunt has ended and live hinting has closed.</>;
    }

    if (isSolved) {
      return <>You have already solved this puzzle.</>;
    }

    if (unansweredHint) {
      if (puzzleId === unansweredHint.puzzleId) {
        return <>You have an outstanding hint on this puzzle.</>;
      } else {
        return (
          <>
            You have an outstanding hint on the puzzle{" "}
            <Link
              href={`/puzzle/${unansweredHint.puzzleId}/hint`}
              className="text-link hover:text-link hover:underline"
            >
              {unansweredHint.puzzleName}
            </Link>
            .
          </>
        );
      }
    }

    if (optimisticHints.some((hint) => !hint.response)) {
      return <>You have an outstanding hint on this puzzle.</>;
    }

    if (hintsRemaining === 0) {
      return <>No hints remaining.</>;
    } else if (hintsRemaining === 1) {
      return <>1 hint remaining.</>;
    } else {
      return <>{hintsRemaining} hints remaining.</>;
    }
  };

  useEffect(() => {
    if (reply) {
      document.getElementById(`${reply}-follow-up-request`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div className="px-1 text-sm">
      <div className="mb-6 break-words px-3">
        <p className="mb-1 font-semibold">Request</p>
        <p className="text-main-text/70">
          Please provide as much detail as possible to help us understand where
          you're at and where you're stuck! Specific clues, steps, and
          hypotheses are all helpful. If you're working with any spreadsheets,
          diagrams, or external resources, you can include links.
        </p>
        <AutosizeTextarea
          maxHeight={500}
          className="mt-2 resize-none border-0 bg-white bg-opacity-10 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={
            hintRequestState.isSolved ||
            !!hintRequestState.unansweredHint ||
            hintRequestState.hintsRemaining < 1 ||
            optimisticHints.some((hint) => !hint.response) ||
            new Date() >
              (session?.user?.interactionMode === "in-person"
                ? IN_PERSON.END_TIME
                : REMOTE.END_TIME)
          }
          value={request}
          onChange={(e) => setRequest(e.target.value)}
        />
        <div className="mt-2 text-main-text/70">
          {getFormDescription(hintRequestState)}
        </div>
        <button
          onClick={() =>
            handleSubmitRequest(hintRequestState.puzzleId, request)
          }
          disabled={
            !request ||
            hintRequestState.isSolved ||
            !!hintRequestState.unansweredHint ||
            hintRequestState.hintsRemaining < 1 ||
            optimisticHints.some((hint) => !hint.response) ||
            new Date() >
              (session?.user?.interactionMode === "in-person"
                ? IN_PERSON.END_TIME
                : REMOTE.END_TIME)
          }
          className="mt-2 rounded-md bg-black/30 px-3 py-2 font-medium text-main-text hover:opacity-85 disabled:opacity-50"
        >
          Submit
        </button>
      </div>
      <hr className="mb-3.5 px-3" />
      {optimisticHints.map((hint) => (
        <Fragment key={`${hint.id}`}>
          {/* Hint request row */}
          <div className="group break-words rounded-md px-3 py-2 hover:bg-black/5">
            {/* Top section with the team ID and the edit button */}
            <div className="relative flex justify-between">
              <b>Team</b>
              {/* If the hint request was made by the current user, allow edits */}
              {hint.team.id === session?.user?.id && (
                <div className="absolute -top-5 right-0">
                  {edit?.id === hint.id && edit.type === "request" ? (
                    <div className="space-x-0.5">
                      <button
                        onClick={() =>
                          handleSubmitEdit(edit.id, edit.value, "request")
                        }
                        className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                      >
                        <Check className="size-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEdit(null);
                        }}
                        className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setNewFollowUp(null);
                        setEdit({
                          id: hint.id,
                          value: hint.request,
                          type: "request",
                        });
                      }}
                      className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                    >
                      <Pencil className="size-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Bottom section with the hint request */}
            {edit?.type === "request" && edit.id === hint.id ? (
              <AutosizeTextarea
                maxHeight={500}
                className="mb-1 mt-2 resize-none border-0 bg-white bg-opacity-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={edit.value}
                onChange={(e) => {
                  if (!edit) return;
                  setEdit({ ...edit, value: e.target.value });
                }}
              />
            ) : (
              <p className="whitespace-pre-wrap">{hint.request}</p>
            )}
          </div>

          {/* Hint response row */}
          {hint.response && (
            <div className="group break-words rounded-md px-3 py-2 hover:bg-black/5">
              <div className="relative flex justify-between">
                {/* Top section for claimer ID, the follow-up button, and the edit button */}
                <b>Admin</b>
                {/* Follow-up button, only show if collapsed */}
                {(!hint.followUps.length ||
                  hiddenFollowUps.includes(hint.id)) &&
                  newFollowUp?.hintId !== hint.id && (
                    <div className="absolute -top-5 right-0">
                      <button
                        onClick={() => {
                          setEdit(null);
                          // Hide other follow-ups under the same hint
                          setHiddenFollowUps((prev) =>
                            prev.filter((prevId) => prevId !== hint.id),
                          );
                          setNewFollowUp({
                            hintId: hint.id,
                            message: "",
                          });
                        }}
                        className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                      >
                        <CornerUpLeft className="size-4" />
                      </button>
                    </div>
                  )}
              </div>

              {/* Botton section with hint response */}
              <div className="whitespace-pre-wrap">{hint.response}</div>
            </div>
          )}

          {/* Follow-ups row */}
          <AnimatePresence>
            <motion.div
              style={{ overflow: "hidden" }}
              animate={{
                height: hiddenFollowUps.includes(hint.id) ? 20 : "auto",
                transition: {
                  duration: DURATION,
                  ease: "linear",
                },
              }}
            >
              {/* Icon for displaying follow-up hints */}
              {hint.followUps.length > 0 &&
                (hiddenFollowUps.includes(hint.id) ? (
                  <button
                    className="ml-3 flex items-center space-x-1.5 text-main-text/70 hover:opacity-85"
                    onClick={() => handleHideFollowUps(hint.id)}
                  >
                    <ChevronDown className="-mx-1 size-5" />
                    <p className="font-medium">Show Replies</p>
                  </button>
                ) : (
                  <button
                    className="relative ml-3 flex items-center space-x-1.5 hover:opacity-85"
                    onClick={() => handleHideFollowUps(hint.id)}
                  >
                    <div className="size-3 rounded-full bg-main-text/70" />
                    <div className="absolute -left-[1px] bottom-0 h-[4px] border-l-2 border-main-text/70"></div>
                    <p className="font-medium text-main-text/70">
                      Hide Replies
                    </p>
                  </button>
                ))}

              {hint.followUps
                .filter((followUp) => followUp.message !== "[Claimed]")
                .map((followUp, i, row) => (
                  <div
                    key={`${followUp.id}`}
                    className="group ml-[17px] break-words rounded-r-md border-l-2 border-main-text/70 px-3 py-2 hover:bg-black/5"
                  >
                    {/* Top section with userId and edit button */}
                    <div className="relative flex justify-between">
                      {followUp.user.id === hint.team.id ? (
                        <b>Team</b>
                      ) : (
                        <b>Admin</b>
                      )}
                      <div className="absolute -top-5 right-0 flex space-x-0.5">
                        {i + 1 === row.length &&
                          !(
                            edit?.type === "follow-up" &&
                            edit.id === followUp.id
                          ) &&
                          newFollowUp?.hintId !== hint.id && (
                            <button
                              onClick={() => {
                                setEdit(null);
                                // Hide other follow-ups under the same hint
                                setHiddenFollowUps((prev) =>
                                  prev.filter((prevId) => prevId !== hint.id),
                                );
                                setNewFollowUp({
                                  hintId: hint.id,
                                  message: "",
                                });
                              }}
                              className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                            >
                              <CornerUpLeft className="size-4" />
                            </button>
                          )}

                        {/* If the previous hint follow-up was made by user, allow edits */}
                        {followUp.user.id === session?.user?.id &&
                          (edit?.type === "follow-up" &&
                          edit.id === followUp.id ? (
                            <div className="space-x-0.5">
                              <button
                                onClick={() =>
                                  handleSubmitEdit(
                                    followUp.id,
                                    edit.value,
                                    "follow-up",
                                  )
                                }
                                className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                              >
                                <Check className="size-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEdit(null);
                                }}
                                className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                              >
                                <X className="size-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setNewFollowUp(null);
                                setEdit({
                                  id: followUp.id,
                                  value: followUp.message,
                                  type: "follow-up",
                                });
                              }}
                              className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                            >
                              <Pencil className="size-4" />
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Botton section with follow-up message */}
                    <div>
                      {edit?.type === "follow-up" && edit.id === followUp.id ? (
                        <AutosizeTextarea
                          maxHeight={500}
                          className="mb-1 mt-2 resize-none border-0 bg-white bg-opacity-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={edit.value}
                          onChange={(e) => {
                            if (!edit) return;
                            setEdit({ ...edit, value: e.target.value });
                          }}
                        />
                      ) : (
                        <div className="whitespace-pre-wrap">
                          {followUp.message}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* New follow-up request row */}
              {newFollowUp !== null && newFollowUp.hintId === hint.id && (
                <div
                  id={`${hint.id}-follow-up-request`}
                  key={`${hint.id}-follow-up-request`}
                  className="group ml-[17px] break-words border-l-2 border-main-text/70 px-3 py-2"
                >
                  <p className="font-semibold">Follow-Up</p>
                  <p className="text-main-text/70">
                    Ask for clarification in this follow-up thread. Follow-ups
                    don't count toward your hint limit!
                  </p>
                  <AutosizeTextarea
                    maxHeight={500}
                    className="mt-1 resize-none border-0 bg-white bg-opacity-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={newFollowUp.message}
                    onChange={(e) => {
                      if (newFollowUp === null) return;
                      setNewFollowUp({
                        hintId: hint.id,
                        message: e.target.value,
                      });
                    }}
                  />
                  <div className="mb-1 mt-2 flex items-center space-x-2">
                    <button
                      onClick={() =>
                        // TODO: kinda jank to use empty team members as signal to not send email
                        handleSubmitFollowUp(hint.id, newFollowUp.message, "")
                      }
                      disabled={!newFollowUp.message}
                      className="rounded-sm bg-black/30 px-2.5 py-1.5 font-medium text-main-text hover:opacity-85 disabled:opacity-50"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => {
                        setNewFollowUp(null);
                      }}
                      className="h-fit text-main-text/70 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Fragment>
      ))}
    </div>
  );
}
