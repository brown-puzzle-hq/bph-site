"use client";
import Link from "next/link";
import { useState, useEffect, startTransition } from "react";
import { useSession } from "next-auth/react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { EyeOff, KeyRound, RefreshCw, Waypoints } from "lucide-react";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";
import {
  claimHint,
  unclaimHint,
  editHintStatus,
  insertHintResponse,
  editMessage,
  insertReply,
  MessageType,
} from "../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormattedTime, ElapsedTime } from "~/lib/time";

type TableProps = {
  hint: Hint;
  unlockTime: Date;
  reply?: number;
};

// Intitial state
type Hint = {
  id: number;
  request: string;
  response: string | null;
  status: "no_response" | "answered" | "refunded";
  puzzle: {
    id: string;
    name: string;
  };
  team: {
    id: string;
    displayName: string;
    members: string;
    interactionMode: string;
  };
  claimer: {
    id: string;
    displayName: string;
  } | null;
  requestTime: Date;
  claimTime: Date | null;
  responseTime: Date | null;
  replies: {
    id: number;
    message: string;
    user: { id: string; displayName: string };
    time: Date;
  }[];
};

// Edited messages
type EditedMessage = {
  id: number;
  value: string;
  type: MessageType;
};

// New reply
type Reply = {
  hintId: number;
  message: string;
};

export default function AdminHintThread({
  hint,
  unlockTime,
  reply,
}: TableProps) {
  const { data: session } = useSession();
  const [statusLoading, setStatusLoading] = useState(true);

  const handleStatus = async (
    selectedStatus: "no_response" | "answered" | "refunded",
  ) => {
    setOptimisticHint((prev) => ({
      ...prev,
      status: selectedStatus,
    }));
    setStatusLoading(true);
    startTransition(async () => {
      const { error, title } = await editHintStatus(hint.id, selectedStatus);
      setStatusLoading(false);
      if (error) {
        toast({
          variant: "destructive",
          title,
          description: error,
        });
        setOptimisticHint(optimisticHint);
      }
    });
  };

  const [optimisticHint, setOptimisticHint] = useState(hint);
  const [response, setResponse] = useState<string>("");
  const [newReply, setNewReply] = useState<Reply | null>(
    reply ? { hintId: reply, message: "" } : null,
  );
  const [edit, setEdit] = useState<EditedMessage | null>(null);

  const handleClaim = async () => {
    setOptimisticHint((prev) => ({
      ...prev,
      claimer: { id: session!.user!.id!, displayName: session!.user!.name! },
    }));

    startTransition(async () => {
      const { error, title } = await claimHint(hint.id);
      if (error) {
        toast({
          variant: "destructive",
          title,
          description: error,
        });
        setOptimisticHint(optimisticHint);
      }
    });
  };

  const handleUnclaim = async () => {
    setOptimisticHint((hint) => ({
      ...hint,
      claimer: null,
    }));
    setResponse("");

    startTransition(async () => {
      const { error, title } = await unclaimHint(hint.id);
      if (error) {
        toast({
          variant: "destructive",
          title,
          description: error,
        });
        setOptimisticHint(optimisticHint);
        setResponse(response);
      }
    });
  };

  const handleSubmitResponse = async (message: string) => {
    setOptimisticHint((hint) => ({
      ...hint,
      claimer: {
        id: session!.user!.id!,
        displayName: session!.user!.displayName!,
      },
      response: response,
      status: "answered",
    }));
    setResponse("");

    startTransition(async () => {
      const { error, title, id } = await insertHintResponse(
        hint.id,
        hint.team.displayName,
        hint.puzzle.name,
        message,
        hint.team.members,
      );
      if (error) {
        toast({
          variant: "destructive",
          title,
          description: response
            ? error + " Response copied to clipboard."
            : error,
        });
        if (response) navigator.clipboard.writeText(response);
        setOptimisticHint(optimisticHint);
      } else {
        setOptimisticHint((hint) => ({ ...hint, id: id! }));
      }
    });
  };

  const handleSubmitEdit = (id: number, value: string, type: MessageType) => {
    setOptimisticHint((hint) => {
      if (!hint) return hint;
      switch (type) {
        case "request":
          return hint.id === id ? { ...hint, request: value } : hint;
        case "response":
          return hint.id === id ? { ...hint, response: value } : hint;
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
    });
    setEdit(null);
    startTransition(async () => await editMessage(id, value, type));
  };

  const handleSubmitReply = async (
    hintId: number,
    message: string,
    members: string,
  ) => {
    // Optimistic update
    setOptimisticHint((hint) => ({
      ...hint,
      replies: hint.replies.concat({
        id: 0,
        message,
        user: {
          displayName: session!.user!.displayName,
          id: session!.user!.id!,
        },
        time: new Date(),
      }),
    }));

    if (message !== "[Claimed]") setNewReply(null);

    startTransition(async () => {
      // TODO: is there a better option than passing a ton of arguments?
      // wondering if we should have centralized hint types, same goes for inserting/emailing normal hint responses
      // Also might be more efficient to only pass team members once instead of storing in each hint
      const replyId = await insertReply({
        hintId,
        members,
        teamId: session?.user?.id,
        teamDisplayName: hint.team.displayName,
        puzzleId: hint.puzzle.id,
        puzzleName: hint.puzzle.name,
        message,
      });

      if (replyId === null) {
        // Revert optimistic update
        setOptimisticHint((hint) => ({
          ...hint,
          replies: hint.replies.filter((reply) => reply.id !== 0),
        }));
        setNewReply(newReply); // Works since variable changes are not instant
        toast({
          title: "Failed to submit reply.",
          description:
            "Please try again. If the problem persists, contact HQ or use the feedback form.",
          variant: "destructive",
        });
      } else {
        // Update replyId
        setOptimisticHint((hint) => ({
          ...hint,
          replies: hint.replies.map((reply) =>
            reply.id === 0 ? { ...reply, id: replyId } : reply,
          ),
        }));
      }
    });
  };

  useEffect(() => {
    if (reply) {
      document.getElementById(`${reply}-reply`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    setStatusLoading(false);
  }, []);

  useEffect(() => {
    setOptimisticHint(hint);
  }, [hint]);

  return (
    <>
      {/* Header */}
      <div className="grid w-full grid-cols-1 gap-4 py-4 text-sm text-zinc-700 sm:grid-cols-2">
        <div>
          <div className="flex w-full flex-row items-center space-x-1 truncate text-ellipsis">
            <span className="font-semibold">Team:</span>
            <Link
              href={`/teams/${hint.team.id}`}
              className="text-blue-500 hover:underline"
              prefetch={false}
            >
              {hint.team.displayName} ({hint.team.id})
            </Link>
            <div className="flex items-center text-orange-500">
              <Link
                href={`/admin/graph?team=${hint.team.id}`}
                className="hover:opacity-85"
                prefetch={false}
              >
                <Waypoints className="size-4" />
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <span className="font-semibold">Puzzle:</span>
            <Link
              href={`/puzzle/${hint.puzzle.id}?interactionMode=${hint.team.interactionMode}`}
              className="text-blue-500 hover:underline"
              prefetch={false}
            >
              {hint.puzzle.name}
            </Link>
            <div className="flex items-center text-yellow-500">
              <Link
                href={`/puzzle/${hint.puzzle.id}/solution`}
                className="hover:opacity-85"
                prefetch={false}
              >
                <KeyRound className="size-4" />
              </Link>
            </div>
            <div className="flex items-center text-orange-500">
              <Link
                href={`/admin/graph?puzzle=${hint.puzzle.id}`}
                className="hover:opacity-85"
                prefetch={false}
              >
                <Waypoints className="size-4" />
              </Link>
            </div>
          </div>

          <p>
            <span className="font-semibold">Claimer: </span>
            {hint.claimer?.displayName}
          </p>

          {/* Status box */}
          <div className="flex flex-row items-center space-x-1">
            <p>
              <span className="font-semibold">Status:</span>
            </p>
            {optimisticHint.status !== "no_response" && (
              <Select
                value={optimisticHint.status}
                onValueChange={handleStatus}
              >
                <SelectTrigger className="h-5 w-36 p-1 focus:ring-0">
                  <SelectValue placeholder={hint.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="answered">Answered</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            )}
            {statusLoading && <RefreshCw className="size-4 animate-spin" />}
          </div>
        </div>
        <div>
          <p className="text-nowrap">
            <span className="font-semibold">Puzzle unlocked </span>
            <FormattedTime time={unlockTime} /> (
            <ElapsedTime date={unlockTime} /> ago)
          </p>
          <p>
            <span className="font-semibold">Hint requested </span>
            <FormattedTime time={hint.requestTime} /> (
            <ElapsedTime date={hint.requestTime} /> ago)
          </p>
          <p>
            <span className="font-semibold">Hint claimed </span>
            {hint.claimTime && (
              <>
                <FormattedTime time={hint.claimTime} /> (
                <ElapsedTime date={hint.claimTime} /> ago)
              </>
            )}
          </p>
          <p>
            <span className="font-semibold">Hint responded </span>
            {hint.responseTime && (
              <>
                <FormattedTime time={hint.responseTime} /> (
                <ElapsedTime date={hint.responseTime} /> ago)
              </>
            )}
          </p>
        </div>
      </div>

      {/* Hint table */}
      <Table className="table-fixed">
        <TableBody>
          {/* Hint request row */}
          <TableRow className="border-0 hover:bg-inherit">
            <TableCell className="break-words px-0">
              <p className="pb-0.5 pt-1 font-bold">
                {optimisticHint.team.displayName}
              </p>
              <p className="whitespace-pre-wrap">{optimisticHint.request}</p>
            </TableCell>
          </TableRow>

          {/* New hint response row */}
          {optimisticHint.response === null && (
            <TableRow className="border-0 hover:bg-inherit">
              <TableCell className="break-words px-0">
                <div className="flex items-center justify-between">
                  <p className="pb-1 font-bold">Response</p>
                </div>

                {/* Botton section with new hint response box */}
                <div className="pb-4">
                  <AutosizeTextarea
                    maxHeight={500}
                    className="resize-none focus-visible:ring-0"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    disabled={optimisticHint.claimer?.id !== session?.user?.id}
                  />
                </div>

                {!optimisticHint.claimer ? (
                  // No claim and no response
                  <div>
                    <Button
                      className="bg-emerald-700 text-white hover:bg-emerald-900"
                      onClick={handleClaim}
                    >
                      Claim
                    </Button>
                  </div>
                ) : optimisticHint.claimer.id === session?.user?.id ? (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleSubmitResponse(response)}
                      disabled={!response}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={handleUnclaim}
                      className="bg-white font-semibold text-red-600 ring-2 ring-inset ring-red-600 hover:bg-white"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div>
                    <i>Claimed by {optimisticHint.claimer.displayName}</i>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}

          {/* Hint response row */}
          {optimisticHint.response !== null && optimisticHint.claimer && (
            <TableRow className="border-0 hover:bg-inherit">
              <TableCell className="break-words px-0">
                {/* Top section for claimer ID, the reply button, and the edit button */}
                <div className="flex items-center justify-between">
                  <p className="pb-1 font-bold">
                    {optimisticHint.claimer.displayName}
                  </p>
                  <div className="flex space-x-2">
                    {/* Reply button, only show if there are no replies */}
                    {optimisticHint.response !== null &&
                      optimisticHint.replies.length === 0 && (
                        <div>
                          {newReply?.hintId !== optimisticHint.id ? (
                            <button
                              onClick={() => {
                                setEdit(null);
                                setNewReply({
                                  hintId: optimisticHint.id,
                                  message: "",
                                });
                              }}
                              className="text-blue-500 hover:underline"
                            >
                              Reply
                            </button>
                          ) : (
                            <button
                              onClick={() => setNewReply(null)}
                              className="text-blue-500 hover:underline"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      )}

                    {/* If the response was made by the current user, allow edits */}
                    {optimisticHint.response !== null &&
                      optimisticHint.claimer?.id === session?.user?.id && (
                        <div>
                          {edit?.id === optimisticHint.id &&
                          edit.type === "response" ? (
                            <div className="space-x-2">
                              <button
                                onClick={() =>
                                  handleSubmitEdit(
                                    edit.id,
                                    edit.value,
                                    "response",
                                  )
                                }
                                className="text-blue-500 hover:underline"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setNewReply(null);
                                setEdit({
                                  id: optimisticHint.id,
                                  value: optimisticHint.response ?? "",
                                  type: "response",
                                });
                              }}
                              className="text-blue-500 hover:underline"
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
                  {edit?.type === "response" &&
                  edit.id === optimisticHint.id ? (
                    // Editing the response
                    <div className="pt-2">
                      <AutosizeTextarea
                        maxHeight={500}
                        className="resize-none focus-visible:ring-0"
                        value={edit.value}
                        onChange={(e) => {
                          if (!edit) return;
                          setEdit({ ...edit, value: e.target.value });
                        }}
                      />
                    </div>
                  ) : (
                    // Displaying the response
                    <p className="whitespace-pre-wrap">
                      {optimisticHint.response}
                    </p>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}

          {/* Replies row */}
          {optimisticHint.replies.map((reply, i, row) => (
            <TableRow key={`${reply.id}`} className="border-0 hover:bg-inherit">
              <TableCell className="break-words px-0">
                {/* Top section */}
                <div className="flex items-center justify-between">
                  {/* Team name and whether this is a hidden reply */}
                  {reply.user.id === optimisticHint.team.id ? (
                    <p className="pb-1 font-bold">
                      {optimisticHint.team.displayName}
                    </p>
                  ) : (
                    <div className="flex items-center pb-1 font-bold">
                      {reply.user.displayName}
                      {reply.message === "[Claimed]" && (
                        <div className="group relative ml-1.5 font-medium">
                          <EyeOff className="h-4 cursor-help" />
                          <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 w-max -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100">
                            <div className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-transparent border-b-black" />
                            Visible to admins only
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Claim, reply, and edit buttons */}
                  <div className="flex space-x-2">
                    {i + 1 === row.length &&
                      reply.user.id === optimisticHint.team.id && (
                        <button
                          onClick={() =>
                            handleSubmitReply(
                              optimisticHint.id,
                              "[Claimed]",
                              "",
                            )
                          }
                          className="text-blue-500 hover:underline"
                        >
                          Claim
                        </button>
                      )}

                    {i + 1 === row.length &&
                      (newReply?.hintId !== optimisticHint.id ? (
                        <button
                          onClick={() => {
                            setEdit(null);
                            setNewReply({
                              hintId: optimisticHint.id,
                              message: "",
                            });
                          }}
                          className="text-blue-500 hover:underline"
                        >
                          Reply
                        </button>
                      ) : (
                        <button
                          onClick={() => setNewReply(null)}
                          className="text-blue-500 hover:underline"
                        >
                          Cancel
                        </button>
                      ))}

                    {/* If the previous hint reply was made by user, allow edits */}
                    {reply.user.id === session?.user?.id &&
                      reply.message !== "[Claimed]" && (
                        <div>
                          {edit?.type === "reply" && edit.id === reply.id ? (
                            <button
                              onClick={() =>
                                handleSubmitEdit(reply.id, edit.value, "reply")
                              }
                              className="text-blue-500 hover:underline"
                            >
                              Save
                            </button>
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
                              className="text-blue-500 hover:underline"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      )}
                  </div>
                </div>
                {/* Botton section with reply message */}
                <div>
                  {edit?.type === "reply" && edit.id === reply.id ? (
                    <div className="pt-2">
                      <AutosizeTextarea
                        maxHeight={500}
                        className="resize-none focus-visible:ring-0"
                        value={edit.value}
                        onChange={(e) => {
                          if (!edit) return;
                          setEdit({ ...edit, value: e.target.value });
                        }}
                      />
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{reply.message}</div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* New reply request row */}
          {newReply !== null && newReply.hintId === optimisticHint.id && (
            <TableRow className="border-0 hover:bg-inherit">
              <TableCell className="break-words px-0">
                <p className="pb-2 font-bold">Reply</p>
                <AutosizeTextarea
                  maxHeight={500}
                  className="resize-none focus-visible:ring-0"
                  value={newReply.message}
                  onChange={(e) => {
                    if (newReply === null) return;
                    setNewReply({
                      hintId: optimisticHint.id,
                      message: e.target.value,
                    });
                  }}
                />
                <div className="flex space-x-2 pt-3">
                  <Button
                    onClick={() =>
                      handleSubmitReply(
                        optimisticHint.id,
                        newReply.message,
                        optimisticHint.team.members,
                      )
                    }
                  >
                    Submit
                  </Button>
                  <Button variant="outline" onClick={() => setNewReply(null)}>
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
