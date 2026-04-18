"use client";

// Default PostHunt Page
import { useState } from "react";
import { cn } from "~/lib/utils";
import CopyButton, { type CopyData } from "./CopyButton";
import GuessTable from "./guess/GuessTable";
import { Guess } from "./guess/GuessTable";

// Form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { NumberOfGuesses } from "./DefaultPuzzlePage";
import { Infinity, SendHorizontal } from "lucide-react";
import { sanitizeAnswer } from "@/config/client";
import SeenSetter from "./SeenSetter";

type DefaultPostHuntPuzzlePageProps = {
  puzzleAnswer: string;
  inPersonBody: React.ReactNode;
  remoteBody: React.ReactNode;
  copyText: string | CopyData | null;
  partialSolutions: Record<string, string>;
  tasks: Record<string, React.ReactNode>;
  interactionMode?: string;
  puzzleIndex: number;
};

type FormProps = {
  puzzleAnswer: string;
};

export default function DefaultPostHuntPuzzlePage({
  puzzleAnswer,
  inPersonBody,
  remoteBody,
  copyText,
  partialSolutions,
  tasks,
  interactionMode,
  puzzleIndex,
}: DefaultPostHuntPuzzlePageProps) {
  const [previousGuesses, setPreviousGuesses] = useState<Guess[]>([]);
  const [numberOfGuessesLeft, setNumberOfGuessesLeft] =
    useState<NumberOfGuesses>(20);
  const [isSolved, setIsSolved] = useState(false);

  // Guess form
  const GuessForm = ({ puzzleAnswer }: FormProps) => {
    const formSchema = z.object({
      guess: z.preprocess(
        sanitizeAnswer,
        z
          .string()
          .min(1, { message: "Required" })
          .max(100, { message: "Max 100 characters" }),
      ),
    });

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: "onSubmit",
      defaultValues: {
        guess: "",
      },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      const guess = data.guess;
      const isCorrect = sanitizeAnswer(guess) === sanitizeAnswer(puzzleAnswer);

      setPreviousGuesses((prev) => [
        ...prev,
        {
          guess: isCorrect ? puzzleAnswer : guess,
          status: isCorrect
            ? "correct"
            : guess in partialSolutions
              ? "partial"
              : guess in tasks
                ? "task"
                : "incorrect",
          partialTip:
            guess in partialSolutions ? partialSolutions[guess] : undefined,
          submitTime: new Date(),
        },
      ]);

      setNumberOfGuessesLeft((prev) => {
        if (prev === "infinity") return "infinity";
        if (guess in tasks || guess in partialSolutions) return prev;
        return prev - 1;
      });

      if (isCorrect) setIsSolved(true);
      form.reset();
    };

    const description = isSolved ? (
      "This puzzle has been solved."
    ) : numberOfGuessesLeft === "infinity" ? (
      <>
        <Infinity className="mb-[1px] mr-[3px] inline-flex size-4" />
        guesses left
      </>
    ) : numberOfGuessesLeft ? (
      `${numberOfGuessesLeft} ${numberOfGuessesLeft > 1 ? "guesses" : "guess"} left`
    ) : (
      "No guesses left. Please contact HQ for help."
    );

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-4">
          <FormField
            control={form.control}
            name="guess"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();
                      field.onChange(sanitizeAnswer(e.target.value));
                    }}
                    className="bg-secondary-bg uppercase text-secondary-text"
                    disabled={isSolved || !numberOfGuessesLeft}
                    autoComplete="off"
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription
                    className={
                      isSolved
                        ? "text-opacity-50"
                        : !numberOfGuessesLeft
                          ? "font-medium text-error"
                          : ""
                    }
                  >
                    {description}
                  </FormDescription>
                  <FormMessage className="text-error" />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSolved || !numberOfGuessesLeft}
            className="bg-blue-900 px-8 py-1.5 hover:bg-blue-900/90"
          >
            <SendHorizontal className="size-4 fill-main-text" />
          </Button>
        </form>
      </Form>
    );
  };

  // If there is an URL query, use that for admins and after the hunt ends
  // Otherwise, use the session interaction mode
  const actualInteractionMode = interactionMode ?? "remote";

  const puzzleBody =
    actualInteractionMode === "in-person" ? inPersonBody : remoteBody;

  return (
    <div className="w-full px-4">
      <SeenSetter index={puzzleIndex} />
      <div className="no-scrollbar overflow-auto">
        <div className="mx-auto w-fit">{puzzleBody}</div>
      </div>

      {Object.keys(tasks).map((task) => {
        if (previousGuesses.some((guess) => guess.guess === task)) {
          return (
            <div key={task}>
              <hr className="mx-auto my-6 max-w-3xl" />
              <div className="mx-auto w-fit">{tasks[task]}</div>
            </div>
          );
        }
      })}

      <div className="mx-auto mb-4 mt-6 max-w-3xl">
        <GuessForm puzzleAnswer={puzzleAnswer} />
      </div>

      <div className="mx-auto max-w-3xl">
        <GuessTable previousGuesses={previousGuesses} />
      </div>

      {copyText && (
        <div className="fixed bottom-4 right-4 size-10">
          <CopyButton copyText={copyText} />
        </div>
      )}
    </div>
  );
}
