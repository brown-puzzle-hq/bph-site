"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { insertHint } from "../actions";
import { HUNT_END_TIME } from "~/hunt.config";

const formSchema = z.object({
  hintRequest: z.string().min(1, {
    message: "Request must contain at least one character",
  }),
});

type FormProps = {
  puzzleId: string;
  hintsRemaining: number;
  unansweredHint: { puzzleId: string; puzzleName: string } | null;
  isSolved: boolean;
};

export default function HintForm({
  puzzleId,
  hintsRemaining,
  unansweredHint,
  isSolved,
}: FormProps) {
  const currDate = new Date();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hintRequest: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await insertHint(puzzleId, data.hintRequest);
    form.reset();
    router.refresh();
  };

  function getFormDescription() {
    if (currDate > HUNT_END_TIME) {
      return <>The hunt has ended and live hinting has been closed.</>;
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
              className="text-blue-500 hover:underline"
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="hintRequest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hint Request</FormLabel>
              <FormDescription className="text-secondary">
                Please provide as much detail as possible to help us understand
                where you're at and where you're stuck! Specific clues, steps,
                and hypotheses are all helpful. If you're working with any
                spreadsheets, diagrams, or external resources, you can include
                links.
              </FormDescription>
              <FormControl>
                <AutosizeTextarea
                  maxHeight={500}
                  className="resize-none"
                  disabled={
                    isSolved ||
                    !!unansweredHint ||
                    hintsRemaining < 1 ||
                    currDate > HUNT_END_TIME
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>{getFormDescription()}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            isSolved ||
            !!unansweredHint ||
            hintsRemaining < 1 ||
            currDate > HUNT_END_TIME
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
