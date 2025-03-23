"use client";

import { useState } from "react";
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
import { handleGuess } from "../actions";
import { useTransition } from "react";

function sanitizeAnswer(answer: any) {
  return typeof answer === "string"
    ? answer.toUpperCase().replace(/[^A-ZÜ]/g, "")
    : "";
}

const formSchema = z.object({
  guess: z.preprocess(
    sanitizeAnswer,
    z
      .string()
      .min(1, { message: "Required" })
      .max(100, { message: "Max 100 characters" }),
  ),
});

type FormProps = {
  puzzleId: string;
  numberOfGuessesLeft: number;
  isSolved: boolean;
};

export default function GuessForm({
  puzzleId,
  numberOfGuessesLeft,
  isSolved,
}: FormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      guess: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      setError(null);
      const result = await handleGuess(puzzleId, data.guess);
      if (result && result.error) {
        setError(result.error);
      }
      form.reset();
    });
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
                  disabled={isSolved || !numberOfGuessesLeft || isPending}
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
                  {isSolved
                    ? "This puzzle has been solved."
                    : numberOfGuessesLeft
                      ? `${numberOfGuessesLeft} ${numberOfGuessesLeft > 1 ? "guesses" : "guess"} left`
                      : "You have no guesses left. Please contact HQ for help."}
                </FormDescription>
                <FormMessage className="text-error">{error}</FormMessage>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            !form.watch("guess") ||
            isSolved ||
            !numberOfGuessesLeft ||
            isPending
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
