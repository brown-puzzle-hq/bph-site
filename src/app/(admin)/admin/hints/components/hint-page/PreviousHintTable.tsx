// This component differs from the original in that it doesn't contain code for hint request
"use client";
import { useState, startTransition, Fragment } from "react";
import { useSession } from "next-auth/react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { editMessage, insertFollowUp, MessageType } from "./actions";
import { Button } from "~/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

type TableProps = {
  previousHints: PreviousHints;
};

type PreviousHints = {
  id: number;
  teamId: string;
  claimer: string | null;
  request: string;
  response: string | null;
  followUps: { id: number; message: string; userId: string }[];
}[];

type Message = {
  id: number;
  value: string;
  type: MessageType;
};

type FollowUp = {
  hintId: number;
  message: string;
};

export default function PreviousHintTable({ previousHints }: TableProps) {
  const { data: session } = useSession();
  const [optimisticHints, setOptimisticHints] = useState(previousHints);
  const [followUp, setFollowUp] = useState<FollowUp | null>(null);
  const [edit, setEdit] = useState<Message | null>(null);
  const [hiddenFollowUps, setHiddenFollowUps] = useState<number[]>([]);

  const handleEdit = (id: number, value: string, type: MessageType) => {
    setEdit({ id, value, type });
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!edit) return;
    setEdit({ ...edit, value: e.target.value });
  };

  const handleSubmitEdit = async (
    id: number,
    value: string,
    type: MessageType,
  ) => {
    switch (type) {
      case "request":
        // Optimistic update
        startTransition(() => {
          setOptimisticHints((prev) =>
            prev.map((hint) =>
              hint.id === id ? { ...hint, request: value } : hint,
            ),
          );
          setEdit(null);
        });
        // Insert into database
        await editMessage(id, value, type);
        break;
      case "response":
        // Optimistic update
        startTransition(() => {
          setOptimisticHints((prev) =>
            prev.map((hint) =>
              hint.id === id ? { ...hint, response: value } : hint,
            ),
          );
          setEdit(null);
        });
        // Insert into database
        await editMessage(id, value, type);
        break;
      case "follow-up":
        // Optimistic update
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
        // Insert into database
        await editMessage(id, value, type);
        break;
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

  const handleFollowUp = (hintId: number) => {
    setHiddenFollowUps((prev) => prev.filter((prevId) => prevId !== hintId));
    setFollowUp({ hintId: hintId, message: "" });
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
    if (!followUpId) {
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
    }
  };

  const handleChangeFollowUp = (
    hintId: number,
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (followUp === null) return;
    setFollowUp({ hintId, message: e.target.value });
  };

  return (
    <Table className="table-fixed">
      <TableBody>
        {optimisticHints.map((hint) => (
          <Fragment key={`${hint.id}`}>
            {/* Previous hint request row */}
            <TableRow key={`${hint.id}-request`} className="hover:bg-inherit">
              <TableCell className="w-4 p-0"></TableCell>
              <TableCell className="break-words">
                <div className="flex justify-between pb-2">
                  <p className="inline rounded-md bg-sky-100 p-1">
                    {hint.teamId}
                  </p>
                  {/* If the hint request was made by the current user, allow edits */}
                  {hint.teamId === session?.user?.id && (
                    <div className="p-1">
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
                          onClick={() =>
                            handleEdit(hint.id, hint.request, "request")
                          }
                          className="text-link hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-1 pb-2">
                  {edit?.type === "request" && edit.id === hint.id ? (
                    <AutosizeTextarea
                      maxHeight={500}
                      className="resize-none"
                      value={edit.value}
                      onChange={handleChangeEdit}
                    />
                  ) : (
                    hint.request
                  )}
                </div>
              </TableCell>
            </TableRow>
            {/* Previous hint response row */}
            {hint.response && (
              <TableRow
                key={`${hint.id}-response`}
                className="hover:bg-inherit"
              >
                <TableCell className="relative w-20">
                  {hint.followUps.length > 0 && (
                    <div className="absolute left-0 top-3">
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
                <TableCell className="break-words">
                  <div className="flex justify-between pb-2">
                    <p className="inline rounded-md bg-orange-100 p-1">
                      {hint.claimer}
                    </p>
                    <div className="flex space-x-2 p-1">
                      {/* If the hint response was made by the current user, allow edits */}
                      {hint.teamId === session?.user?.id && (
                        <div className="p-1">
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
                              onClick={() =>
                                handleEdit(
                                  hint.id,
                                  hint.response ?? "",
                                  "response",
                                )
                              }
                              className="text-link hover:underline"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      )}
                      {followUp?.hintId !== hint.id ? (
                        <button
                          onClick={() => handleFollowUp(hint.id)}
                          className="text-link hover:underline"
                        >
                          Follow-Up
                        </button>
                      ) : (
                        <button
                          onClick={() => setFollowUp(null)}
                          className="text-link hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-1 pb-2">
                    {edit?.type === "response" && edit.id === hint.id ? (
                      <AutosizeTextarea
                        maxHeight={500}
                        className="resize-none"
                        value={edit.value}
                        onChange={handleChangeEdit}
                      />
                    ) : (
                      hint.response
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
            {/* Previous hint follow-ups row */}
            {!hiddenFollowUps.includes(hint.id) &&
              hint.followUps.map((followUp) => (
                <TableRow key={`${followUp.id}`}>
                  <TableCell className="w-20"></TableCell>
                  <TableCell className="break-words pl-10">
                    <div className="flex justify-between pb-2">
                      <p className="inline rounded-md bg-orange-100 p-1">
                        {followUp.userId}
                      </p>
                      {/* If the previous hint follow-up was made by user, allow edits */}
                      {followUp.userId === session?.user?.id && (
                        <div className="p-1">
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
                              onClick={() =>
                                handleEdit(
                                  followUp.id,
                                  followUp.message,
                                  "follow-up",
                                )
                              }
                              className="text-link hover:underline"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="p-1 pb-2">
                      {edit?.type === "follow-up" && edit.id === followUp.id ? (
                        <AutosizeTextarea
                          maxHeight={500}
                          className="resize-none"
                          value={edit.value}
                          onChange={handleChangeEdit}
                        />
                      ) : (
                        followUp.message
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            {/* New follow-up row */}
            {followUp !== null && followUp.hintId === hint.id && (
              <TableRow key={`${hint.id}-follow-up-request`}>
                <TableCell className="w-20"></TableCell>
                <TableCell className="break-words rounded-lg bg-gray-200">
                  <p className="p-1 font-bold">Follow-Up</p>
                  <p className="p-1 text-gray-800">
                    Ask for clarification in this follow-up thread. Follow-ups
                    don't count toward your total hint limit!
                  </p>
                  <div className="p-1">
                    <AutosizeTextarea
                      maxHeight={500}
                      className="resize-none"
                      value={followUp.message}
                      onChange={(event) => handleChangeFollowUp(hint.id, event)}
                    />
                  </div>
                  <div className="flex space-x-2 p-1">
                    <Button
                      onClick={() =>
                        handleSubmitFollowUp(hint.id, followUp.message)
                      }
                    >
                      Submit
                    </Button>
                    <Button variant="outline" onClick={() => setFollowUp(null)}>
                      Cancel
                    </Button>
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
