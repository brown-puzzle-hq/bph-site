"use client";
import { toast } from "~/hooks/use-toast";
import { useState, startTransition, Fragment } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { IN_PERSON, REMOTE } from "~/hunt.config";

import {
  editMessage,
  insertFollowUp,
  insertHintRequest,
  MessageType,
} from "./actions";

type TableProps = {
  anonymize?: boolean;
  previousHints: PreviousHints;
  hintRequestState?: HintRequestState;
  teamDisplayName?: string;
};

// Intitial state
type PreviousHints = {
  id: number;
  teamId: string;
  claimer: string | null;
  request: string;
  response: string | null;
  followUps: { id: number; message: string; userId: string }[];
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

export default function PreviousHintTable({
  anonymize,
  previousHints,
  hintRequestState,
  teamDisplayName,
}: TableProps) {
  const { data: session } = useSession();
  const [optimisticHints, setOptimisticHints] = useState(previousHints);
  const [request, setRequest] = useState<string>("");
  const [followUp, setFollowUp] = useState<FollowUp | null>(null);
  const [edit, setEdit] = useState<EditedMessage | null>(null);
  const [hiddenFollowUps, setHiddenFollowUps] = useState<number[]>([]);

  const handleSubmitRequest = async (puzzleId: string, message: string) => {
    // Optimistic update
    startTransition(() => {
      setOptimisticHints((prev) => [
        ...prev,
        {
          id: 0,
          teamId: session?.user?.id!,
          claimer: null,
          request,
          response: null,
          followUps: [],
        },
      ]);
    });

    setRequest("");
    const id = await insertHintRequest(puzzleId, message);
    if (!id) {
      // Revert optimistic update
      startTransition(() => {
        setOptimisticHints((prev) => prev.filter((hint) => hint.id !== 0));
      });
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
  };

  const handleSubmitEdit = async (
    id: number,
    value: string,
    type: MessageType,
  ) => {
    switch (type) {
      case "request":
        startTransition(() => {
          setOptimisticHints((prev) =>
            prev.map((hint) =>
              hint.id === id ? { ...hint, request: value } : hint,
            ),
          );
          setEdit(null);
        });
        await editMessage(id, value, type);
        break;
      case "response":
        startTransition(() => {
          setOptimisticHints((prev) =>
            prev.map((hint) =>
              hint.id === id ? { ...hint, response: value } : hint,
            ),
          );
          setEdit(null);
        });
        await editMessage(id, value, type);
        break;
      case "follow-up":
        startTransition(() => {
          setOptimisticHints((prev) =>
            prev.map((hint) => ({
              ...hint,
              followUps: hint.followUps.map((followUp) =>
                followUp.id === id ? { ...followUp, message: value } : followUp,
              ),
            })),
          );
        });
        setEdit(null);
        await editMessage(id, value, type);
        break;
    }
  };

  const handleSubmitFollowUp = async (hintId: number, message: string) => {
    // Optimistic update
    startTransition(() => {
      setOptimisticHints((prev) =>
        prev.map((hint) =>
          hint.id === hintId
            ? {
                ...hint,
                followUps: hint.followUps.concat({
                  id: 0,
                  message,
                  userId: session!.user!.id!,
                }),
              }
            : hint,
        ),
      );
    });
    setFollowUp(null);
    const followUpId = await insertFollowUp(hintId, message);
    if (followUpId === null) {
      // Revert optimistic update
      startTransition(() => {
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
      });
    } else {
      // Update followUpId
      startTransition(() => {
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
      });
      // TODO: Not working for some reason
      // toast({
      //   title: "Failed to submit follow-up.",
      //   description:
      //     "Please try again. If the problem persists, please submit the feedback form.",
      //   variant: "destructive",
      // });
    }
  };

  const handleHideFollowUps = (hintId: number) => {
    if (hiddenFollowUps.includes(hintId)) {
      setHiddenFollowUps((prev) => prev.filter((id) => id !== hintId));
    } else {
      setHiddenFollowUps((prev) => prev.concat(hintId));
      if (followUp?.hintId === hintId) {
        setFollowUp(null);
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
              href={`/puzzle/${unansweredHint.puzzleId}`}
              className="text-link hover:text-link hover:underline"
            >
              {unansweredHint.puzzleName}
            </Link>
            .
          </>
        );
      }
    }

    if (hintsRemaining === 0) {
      return <>No hints remaining.</>;
    } else if (hintsRemaining === 1) {
      return <>1 hint remaining.</>;
    } else {
      return <>{hintsRemaining} hints remaining.</>;
    }
  };

  return (
    <Table className="table-fixed">
      <TableBody>
        {/* Hint request row */}
        {hintRequestState && (
          <TableRow className="hover:bg-inherit">
            <TableCell className="w-4"></TableCell>
            <TableCell className="break-words rounded-lg pb-4 pr-5">
              <p className="font-bold">Request</p>
              <p className="pb-3 pt-2 text-secondary-text">
                Please provide as much detail as possible to help us understand
                where you're at and where you're stuck! Specific clues, steps,
                and hypotheses are all helpful. If you're working with any
                spreadsheets, diagrams, or external resources, you can include
                links.
              </p>
              <AutosizeTextarea
                maxHeight={500}
                className="resize-none border-black bg-white"
                disabled={
                  hintRequestState.isSolved ||
                  !!hintRequestState.unansweredHint ||
                  hintRequestState.hintsRemaining < 1 ||
                  new Date() >
                    (session?.user?.interactionMode === "in-person"
                      ? IN_PERSON.END_TIME
                      : REMOTE.END_TIME)
                }
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />
              <div className="py-3 text-sm text-secondary-text">
                {getFormDescription(hintRequestState)}
              </div>
              <Button
                onClick={() =>
                  handleSubmitRequest(hintRequestState.puzzleId, request)
                }
                disabled={
                  hintRequestState.isSolved ||
                  !!hintRequestState.unansweredHint ||
                  hintRequestState.hintsRemaining < 1 ||
                  new Date() >
                    (session?.user?.interactionMode === "in-person"
                      ? IN_PERSON.END_TIME
                      : REMOTE.END_TIME)
                }
              >
                Submit
              </Button>
            </TableCell>
          </TableRow>
        )}

        {optimisticHints.map((hint) => (
          <Fragment key={`${hint.id}`}>
            {/* Hint request row */}
            <TableRow
              key={`${hint.id}-request`}
              className="border-0 hover:bg-inherit"
            >
              <TableCell className="w-4"></TableCell>
              <TableCell className="break-words pr-5">
                {/* Top section with the team ID and the edit button */}
                <div className="flex justify-between">
                  <p className="pb-1 font-bold">
                    {anonymize ? "Team" : teamDisplayName}
                  </p>
                  {/* If the hint request was made by the current user, allow edits */}
                  {hint.teamId === session?.user?.id && (
                    <div>
                      {edit?.id === hint.id && edit.type === "request" ? (
                        <div className="space-x-2">
                          <button
                            onClick={() =>
                              handleSubmitEdit(edit.id, edit.value, "request")
                            }
                            className="text-link hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEdit(null)}
                            className="text-link hover:underline"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setFollowUp(null);
                            setEdit({
                              id: hint.id,
                              value: hint.request,
                              type: "request",
                            });
                          }}
                          className="text-link hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom section with the hint request */}
                {edit?.type === "request" && edit.id === hint.id ? (
                  <div className="pt-2">
                    <AutosizeTextarea
                      maxHeight={500}
                      className="resize-none"
                      value={edit.value}
                      onChange={(e) => {
                        if (!edit) return;
                        setEdit({ ...edit, value: e.target.value });
                      }}
                    />
                  </div>
                ) : (
                  hint.request
                )}
              </TableCell>
            </TableRow>

            {/* Hint response row */}
            {hint.response && (
              <TableRow
                key={`${hint.id}-response`}
                className="border-0 hover:bg-inherit"
              >
                {/* Chevron for hiding follow-up hints */}
                <TableCell className="relative">
                  {hint.followUps.length > 0 && (
                    <div className="absolute left-0 top-2">
                      {hiddenFollowUps.includes(hint.id) ? (
                        <button onClick={() => handleHideFollowUps(hint.id)}>
                          <ChevronRight className="h-5 w-5 text-link" />
                        </button>
                      ) : (
                        <button onClick={() => handleHideFollowUps(hint.id)}>
                          <ChevronDown className="h-5 w-5 text-link" />
                        </button>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell className="break-words pr-5">
                  {/* Top section for claimer ID, the follow-up button, and the edit button */}
                  <div className="flex items-center justify-between">
                    <p className="pb-1 font-bold">
                      {anonymize ? "Admin" : hint.claimer}
                    </p>
                    <div className="flex space-x-2">
                      {/* Follow-up button */}
                      {followUp?.hintId !== hint.id ? (
                        <button
                          onClick={() => {
                            setEdit(null);
                            // Hide other follow-ups under the same hint
                            setHiddenFollowUps((prev) =>
                              prev.filter((prevId) => prevId !== hint.id),
                            );
                            setFollowUp({ hintId: hint.id, message: "" });
                          }}
                          className="text-link hover:underline"
                        >
                          Reply
                        </button>
                      ) : (
                        <button
                          onClick={() => setFollowUp(null)}
                          className="text-link hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                      {/* If the response was made by the current user, allow edits */}
                      {hint.claimer === session?.user?.id && (
                        <div>
                          {edit?.id === hint.id && edit.type === "response" ? (
                            <div className="space-x-2">
                              <button
                                onClick={() =>
                                  handleSubmitEdit(
                                    edit.id,
                                    edit.value,
                                    "response",
                                  )
                                }
                                className="text-link hover:underline"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEdit(null)}
                                className="text-link hover:underline"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setFollowUp(null);
                                setEdit({
                                  id: hint.id,
                                  value: hint.response ?? "",
                                  type: "response",
                                });
                              }}
                              className="text-link hover:underline"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Botton section with hint response */}
                  <div>
                    {edit?.type === "response" && edit.id === hint.id ? (
                      <div className="pt-2">
                        <AutosizeTextarea
                          maxHeight={500}
                          className="resize-none"
                          value={edit.value}
                          onChange={(e) => {
                            if (!edit) return;
                            setEdit({ ...edit, value: e.target.value });
                          }}
                        />
                      </div>
                    ) : (
                      hint.response
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Follow-ups row */}
            {!hiddenFollowUps.includes(hint.id) &&
              hint.followUps.map((followUp) => (
                <TableRow
                  key={`${followUp.id}`}
                  className="border-0 hover:bg-inherit"
                >
                  <TableCell className="relative">
                    <div className="absolute inset-y-0 w-1 bg-gray-200"></div>
                  </TableCell>
                  <TableCell className="break-words pr-5">
                    {/* Top section with userId and edit button */}
                    <div className="flex justify-between">
                      {followUp.userId === hint.teamId ? (
                        <p className="pb-1 font-bold">
                          {anonymize ? "Team" : teamDisplayName}
                        </p>
                      ) : (
                        <p className="pb-1 font-bold">
                          {anonymize ? "Admin" : followUp.userId}
                        </p>
                      )}
                      {/* If the previous hint follow-up was made by user, allow edits */}
                      {followUp.userId === session?.user?.id && (
                        <div>
                          {edit?.type === "follow-up" &&
                          edit.id === followUp.id ? (
                            <button
                              onClick={() =>
                                handleSubmitEdit(
                                  followUp.id,
                                  edit.value,
                                  "follow-up",
                                )
                              }
                              className="text-link hover:underline"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setFollowUp(null);
                                setEdit({
                                  id: followUp.id,
                                  value: followUp.message,
                                  type: "follow-up",
                                });
                              }}
                              className="text-link hover:underline"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Botton section with follow-up message */}
                    <div>
                      {edit?.type === "follow-up" && edit.id === followUp.id ? (
                        <div className="pt-2">
                          <AutosizeTextarea
                            maxHeight={500}
                            className="resize-none"
                            value={edit.value}
                            onChange={(e) => {
                              if (!edit) return;
                              setEdit({ ...edit, value: e.target.value });
                            }}
                          />
                        </div>
                      ) : (
                        followUp.message
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

            {/* New follow-up request row */}
            {followUp !== null && followUp.hintId === hint.id && (
              <TableRow
                key={`${hint.id}-follow-up-request`}
                className="border-0 hover:bg-inherit"
              >
                <TableCell className="relative">
                  <div className="absolute inset-y-0 w-1 bg-gray-200"></div>
                </TableCell>
                <TableCell className="break-words pr-5">
                  <div className="rounded-lg bg-gray-200 p-3">
                    <p className="font-bold">Follow-Up</p>
                    <p className="pb-3 pt-2 text-gray-800">
                      Ask for clarification in this follow-up thread. Follow-ups
                      don't count toward your hint limit!
                    </p>

                    <AutosizeTextarea
                      maxHeight={500}
                      className="resize-none"
                      value={followUp.message}
                      onChange={(e) => {
                        if (followUp === null) return;
                        setFollowUp({
                          hintId: hint.id,
                          message: e.target.value,
                        });
                      }}
                    />
                    <div className="flex space-x-2 pt-3">
                      <Button
                        onClick={() =>
                          handleSubmitFollowUp(hint.id, followUp.message)
                        }
                      >
                        Submit
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setFollowUp(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
