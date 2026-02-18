"use client";
import { useState, useEffect, Fragment, startTransition } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import {
  Check,
  ChevronDown,
  CornerUpLeft,
  Pencil,
  RefreshCcw,
  X,
} from "lucide-react";
import { IN_PERSON, REMOTE } from "@/config/client";
import {
  editTeamMessage,
  insertTeamReply,
  insertHintRequest,
  MessageType,
} from "./actions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { type HintStatus } from "@/config/client";
import { ensureError } from "~/lib/utils";

type TableProps = {
  previousHints: PreviousHints;
  hintRequestState: HintRequestState;
  reply?: number;
};

// Intitial state
type PreviousHints = {
  id: number;
  request: string;
  response: string | null;
  status: HintStatus;
  team: {
    id: string;
    displayName: string;
  };
  claimer: {
    id: string;
    displayName: string;
  } | null;
  requestTime: Date;
  replies: {
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

// New reply messages
type Reply = {
  hintId: number;
  message: string;
};

const DURATION = 0.15;

export default function HuntHintThreads({
  previousHints,
  hintRequestState,
  reply,
}: TableProps) {
  const { data: session } = useSession();
  const [optimisticHints, setOptimisticHints] = useState(previousHints);
  const [request, setRequest] = useState<string>("");
  const [newReply, setNewReply] = useState<Reply | null>(
    reply ? { hintId: reply, message: "" } : null,
  );
  const [edit, setEdit] = useState<EditedMessage | null>(null);
  const [hiddenReplies, setHiddenReplies] = useState<number[]>([]);

  const handleSubmitRequest = async (puzzleId: string, message: string) => {
    setOptimisticHints((prev) => [
      ...prev,
      {
        id: 0,
        team: {
          displayName: session!.user.displayName,
          id: session!.user.id,
        },
        claimer: null,
        request,
        response: null,
        status: "no_response",
        requestTime: new Date(),
        replies: [],
      },
    ]);
    setRequest("");

    startTransition(async () => {
      try {
        const { id } = await insertHintRequest(puzzleId, message);
        setOptimisticHints((prev) =>
          prev.map((hint) => (hint.id === 0 ? { ...hint, id } : hint)),
        );
      } catch (e) {
        setOptimisticHints((prev) => prev.filter((hint) => hint.id !== 0));
        // Don't revert request box in case hint limit was reached
        navigator.clipboard.writeText(message);

        const error = ensureError(e);
        toast.error("Failed to request hint.", {
          description: error.message + " Request copied to clipboard.",
        });
      }
    });
  };

  const handleSubmitEdit = async (
    id: number,
    value: string,
    type: MessageType,
  ) => {
    setOptimisticHints((prev) =>
      prev.map((hint) => {
        if (!hint) return hint;
        switch (type) {
          case "request":
            return hint.id === id ? { ...hint, request: value } : hint;
          case "reply":
            return {
              ...hint,
              replies: hint.replies.map((reply) =>
                reply.id === id ? { ...reply, message: value } : reply,
              ),
            };
          default:
            return hint;
        }
      }),
    );
    setEdit(null);
    startTransition(async () => {
      try {
        await editTeamMessage(id, value, type);
      } catch {
        setOptimisticHints(optimisticHints);
        setEdit(edit);
        toast.error("Failed to edit message.");
      }
    });
  };

  const handleSubmitReply = async (hintId: number, message: string) => {
    setOptimisticHints((prev) =>
      prev.map((hint) =>
        hint.id === hintId
          ? {
              ...hint,
              replies: hint.replies.concat({
                id: 0,
                message,
                user: {
                  displayName: session!.user.displayName,
                  id: session!.user.id,
                },
                time: new Date(),
              }),
            }
          : hint,
      ),
    );
    setNewReply(null);

    startTransition(async () => {
      try {
        const { replyId } = await insertTeamReply(hintId, message);
        setOptimisticHints((prev) =>
          prev.map((hint) =>
            hint.id === hintId
              ? {
                  ...hint,
                  replies: hint.replies.map((reply) =>
                    reply.id === 0 ? { ...reply, id: replyId } : reply,
                  ),
                }
              : hint,
          ),
        );
      } catch {
        setOptimisticHints(optimisticHints);
        setNewReply(newReply);
        toast.error("Failed to submit reply.");
      }
    });
  };

  const handleHideReplies = (hintId: number) => {
    if (hiddenReplies.includes(hintId)) {
      setHiddenReplies((prev) => prev.filter((id) => id !== hintId));
    } else {
      setHiddenReplies((prev) => prev.concat(hintId));
      if (newReply?.hintId === hintId) {
        setTimeout(() => setNewReply(null), DURATION * 1000);
      }
    }
  };

  const getFormDescription = (hintRequestState: HintRequestState) => {
    const { puzzleId, hintsRemaining, unansweredHint, isSolved } =
      hintRequestState;
    if (
      new Date() >
      (session?.user.interactionMode === "in-person"
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
      document.getElementById(`${reply}-reply-request`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div className="px-1 text-sm">
      <div className="mb-6 break-words px-3">
        <p className="mb-1 font-semibold text-main-header">Request</p>
        <p className="text-main-text">
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
              (session?.user.interactionMode === "in-person"
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
              (session?.user.interactionMode === "in-person"
                ? IN_PERSON.END_TIME
                : REMOTE.END_TIME)
          }
          className="mt-2 rounded-md bg-black/30 px-3 py-2 font-medium text-main-text hover:opacity-85 disabled:pointer-events-none disabled:opacity-50"
        >
          Submit
        </button>
        {(() => {
          const now = new Date();
          const hour = new Date(
            now.toLocaleString("en-US", { timeZone: "America/New_York" }),
          ).getHours();
          return (
            now <
              (session?.user.interactionMode === "in-person"
                ? IN_PERSON.END_TIME
                : REMOTE.END_TIME) &&
            hour >= 0 &&
            hour < 9
          );
        })() && (
          <p className="mt-2 text-white/70">
            <span className="font-semibold">Writers' Strike:</span> hint answers
            will be delayed until 9 AM EST.
          </p>
        )}
      </div>
      {optimisticHints.length !== 0 && <hr className="mb-3.5 px-3" />}
      {optimisticHints.map((hint) => (
        <Fragment key={`${hint.id}`}>
          {/* Hint request row */}
          <div className="group break-words rounded-md px-3 py-2 hover:bg-black/5">
            {/* Top section with the team ID and the edit button */}
            <div className="relative flex justify-between">
              <b>Team</b>
              {/* If the hint request was made by the current user, allow edits */}
              {hint.team.id === session?.user.id && (
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
                        setNewReply(null);
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
                {/* Top section for claimer ID, the reply button, and the edit button */}
                <div className="flex items-center">
                  <b>Admin</b>
                  {hint.status === "refunded" && (
                    <RefreshCcw className="h-[13px] stroke-[3.5]" />
                  )}
                </div>
                {/* reply button, only show if collapsed */}
                {(!hint.replies.length || hiddenReplies.includes(hint.id)) &&
                  newReply?.hintId !== hint.id && (
                    <div className="absolute -top-5 right-0">
                      <button
                        onClick={() => {
                          setEdit(null);
                          // Hide other replies under the same hint
                          setHiddenReplies((prev) =>
                            prev.filter((prevId) => prevId !== hint.id),
                          );
                          setNewReply({
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
              <p className="whitespace-pre-wrap">{hint.response}</p>
            </div>
          )}

          {/* Replies row */}
          <AnimatePresence>
            <motion.div
              style={{ overflow: "hidden" }}
              animate={{
                height: hiddenReplies.includes(hint.id) ? 20 : "auto",
                transition: {
                  duration: DURATION,
                  ease: "linear",
                },
              }}
            >
              {/* Icon for displaying reply hints */}
              {hint.replies.length > 0 &&
                (hiddenReplies.includes(hint.id) ? (
                  <button
                    className="ml-3 flex items-center space-x-1.5 text-main-text/70 hover:opacity-85"
                    onClick={() => handleHideReplies(hint.id)}
                  >
                    <ChevronDown className="-mx-1 size-5" />
                    <p className="font-medium">Show Replies</p>
                  </button>
                ) : (
                  <button
                    className="relative ml-3 flex items-center space-x-1.5 hover:opacity-85"
                    onClick={() => handleHideReplies(hint.id)}
                  >
                    <div className="size-3 rounded-full bg-main-text/70" />
                    <div className="absolute -left-[1px] bottom-0 h-[4px] border-l-2 border-main-text/70"></div>
                    <p className="font-medium text-main-text/70">
                      Hide Replies
                    </p>
                  </button>
                ))}

              {hint.replies
                .filter((reply) => reply.message !== "[Claimed]")
                .map((reply, i, row) => (
                  <div
                    key={`${reply.id}`}
                    className="group ml-[17px] break-words rounded-r-md border-l-2 border-main-text/70 px-3 py-2 hover:bg-black/5"
                  >
                    {/* Top section with userId and edit button */}
                    <div className="relative flex justify-between">
                      {reply.user.id === hint.team.id ? (
                        <b>Team</b>
                      ) : (
                        <b>Admin</b>
                      )}
                      <div className="absolute -top-5 right-0 flex space-x-0.5">
                        {i + 1 === row.length &&
                          !(edit?.type === "reply" && edit.id === reply.id) &&
                          newReply?.hintId !== hint.id && (
                            <button
                              onClick={() => {
                                setEdit(null);
                                // Hide other replies under the same hint
                                setHiddenReplies((prev) =>
                                  prev.filter((prevId) => prevId !== hint.id),
                                );
                                setNewReply({
                                  hintId: hint.id,
                                  message: "",
                                });
                              }}
                              className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                            >
                              <CornerUpLeft className="size-4" />
                            </button>
                          )}

                        {/* If the previous hint reply was made by user, allow edits */}
                        {reply.user.id === session?.user.id &&
                          (edit?.type === "reply" && edit.id === reply.id ? (
                            <div className="space-x-0.5">
                              <button
                                onClick={() =>
                                  handleSubmitEdit(
                                    reply.id,
                                    edit.value,
                                    "reply",
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
                                setNewReply(null);
                                setEdit({
                                  id: reply.id,
                                  value: reply.message,
                                  type: "reply",
                                });
                              }}
                              className="rounded-md bg-black/20 p-1 text-main-text opacity-0 group-hover:opacity-100"
                            >
                              <Pencil className="size-4" />
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Botton section with reply message */}
                    <div>
                      {edit?.type === "reply" && edit.id === reply.id ? (
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
                          {reply.message}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* New reply request row */}
              {newReply !== null && newReply.hintId === hint.id && (
                <div
                  id={`${hint.id}-reply-request`}
                  key={`${hint.id}-reply-request`}
                  className="group ml-[17px] break-words border-l-2 border-main-text/70 px-3 py-2"
                >
                  <p className="font-semibold">Reply</p>
                  <p className="text-main-text/70">
                    Ask for clarification in this reply thread. Replies don't
                    count toward your hint limit!
                  </p>
                  <AutosizeTextarea
                    maxHeight={500}
                    className="mt-1 resize-none border-0 bg-white bg-opacity-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={newReply.message}
                    onChange={(e) => {
                      if (newReply === null) return;
                      setNewReply({
                        hintId: hint.id,
                        message: e.target.value,
                      });
                    }}
                  />
                  <div className="mb-1 mt-2 flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleSubmitReply(hint.id, newReply.message)
                      }
                      disabled={!newReply.message}
                      className="rounded-sm bg-black/30 px-2.5 py-1.5 font-medium text-main-text hover:opacity-85 disabled:opacity-50"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => {
                        setNewReply(null);
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
