"use client";

// Default PostHunt Page
import { useState } from "react";
import { cn } from "~/lib/utils";
import CopyButton from "./CopyButton";
import GuessTable from "./GuessTable";
import { Guess } from "./GuessTable";

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
import { Infinity } from "lucide-react";

type DefaultPostHuntPuzzlePageProps = {
  puzzleAnswer: string;
  inPersonBody: React.ReactNode;
  remoteBoxBody: React.ReactNode;
  remoteBody: React.ReactNode;
  copyText: string | null;
  partialSolutions: Record<string, string>;
  tasks: Record<string, React.ReactNode>;
  interactionMode?: string;
};

type FormProps = {
  puzzleAnswer: string;
};

export default function DefaultPostHuntPuzzlePage({
  puzzleAnswer,
  inPersonBody,
  remoteBoxBody,
  remoteBody,
  copyText,
  partialSolutions,
  tasks,
  interactionMode,
}: DefaultPostHuntPuzzlePageProps) {
  const [previousGuesses, setPreviousGuesses] = useState<Guess[]>([]);
  const [numberOfGuessesLeft, setNumberOfGuessesLeft] =
    useState<NumberOfGuesses>(20);
  const [isSolved, setIsSolved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Guess form
  const GuessForm = ({ puzzleAnswer }: FormProps) => {
    const sanitizeAnswer = (answer: any) => {
      return typeof answer === "string"
        ? answer.toUpperCase().replace(/[^A-ZÜ]/g, "")
        : "";
    };

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
      setError(null);

      const guess = data.guess;
      const isCorrect = data.guess === puzzleAnswer;

      setPreviousGuesses((prevGuesses) => [
        ...prevGuesses,
        {
          id: prevGuesses.length,
          guess,
          isCorrect,
          teamId: "anonymous",
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

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center space-x-4"
        >
          <FormField
            control={form.control}
            name="guess"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      form.setValue(
                        "guess",
                        e.target.value.toUpperCase().replace(/[^A-Z Ü]/g, ""),
                      );
                      setError(null);
                    }}
                    className="bg-secondary-bg text-secondary-accent"
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
                    {isSolved ? (
                      "This puzzle has been solved."
                    ) : numberOfGuessesLeft === "infinity" ? (
                      <span className="flex items-center space-x-[3px]">
                        <Infinity className="size-4 pt-[1px]" />
                        <span>guesses left</span>
                      </span>
                    ) : numberOfGuessesLeft ? (
                      `${numberOfGuessesLeft} ${numberOfGuessesLeft > 1 ? "guesses" : "guess"} left`
                    ) : (
                      "You have no guesses left. Please contact HQ for help."
                    )}
                  </FormDescription>
                  <FormMessage className="text-error">{error}</FormMessage>
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.watch("guess") || isSolved || !numberOfGuessesLeft}
          >
            Submit
          </Button>
        </form>
      </Form>
    );
  };

  // If there is an URL query, use that for admins and after the hunt ends
  // Otherwise, use the session interaction mode
  const actualInteractionMode = interactionMode ?? "remote";

  const puzzleBody =
    actualInteractionMode === "remote-box"
      ? remoteBoxBody
      : actualInteractionMode === "in-person"
        ? inPersonBody
        : remoteBody;

  return (
    <div className="w-full px-4">
      <div className="no-scrollbar overflow-auto">
        <div className="mx-auto flex w-fit items-start justify-center space-x-2">
          {copyText && <div className="min-w-6" />}
          <div className="w-fit">{puzzleBody}</div>
          {copyText && <CopyButton copyText={copyText} />}
        </div>
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

      <div className={cn("mx-auto mb-4 mt-6 max-w-3xl", copyText && "px-8")}>
        <GuessForm puzzleAnswer={puzzleAnswer} />
      </div>

      <div className="mx-auto max-w-3xl">
        <GuessTable
          puzzleAnswer={puzzleAnswer}
          previousGuesses={previousGuesses}
          partialSolutions={partialSolutions}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
