"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import EventForm from "./EventForm";
import { Calendar, PencilLine } from "lucide-react";
import { AvailableEvent } from "@/puzzle/page";

export default function EventTable({
  availableEvents,
  inputBox,
}: {
  availableEvents: AvailableEvent[];
  inputBox: boolean;
}) {
  return (
    // TODO: On mobile ideally we combine into one column, might have to use grid instead of table though
    <div className="w-full">
      <Table className="mx-auto table-fixed overflow-hidden rounded-md md:table-auto">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-secondary-text">Event</TableHead>
            <TableHead className="text-secondary-text">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availableEvents
            // If both puzzles have null times, sort alphabetically
            // Otherwise, prioritize the puzzle with null time
            // If neither puzzles have null times, sort by earliest unlock
            .map((event) => (
              <TableRow key={event.id} className="hover:bg-inherit">
                <TableCell className="md:min-w-60">
                  {event.name.trim() ? event.name : "\u200b"}
                  {inputBox && (
                    <div className="flex items-center space-x-2">
                      <PencilLine className="h-4 w-4 min-w-4" />
                      {event.answer !== null ? (
                        <span
                          className={
                            event.spent
                              ? "text-correct-guess line-through"
                              : "text-correct-guess"
                          }
                        >
                          {event.answer}
                        </span>
                      ) : (
                        <EventForm eventId={event.id} />
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="my-1 flex items-center text-sm sm:space-x-1">
                      <Calendar className="hidden size-4 sm:block" />{" "}
                      <p className="font-semibold">Time: {event.startTime}</p>
                    </div>
                    <p>{event.description}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
