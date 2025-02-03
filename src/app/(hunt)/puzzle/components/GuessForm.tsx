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

import { insertGuess } from "../actions";

function sanitizeAnswer(answer: any) {
  return typeof answer === "string"
    ? answer.toUpperCase().replace(/[^A-Z]/g, "")
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
};

export default function GuessForm({
  puzzleId,
  numberOfGuessesLeft,
}: FormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      guess: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    const result = await insertGuess(puzzleId, data.guess);
    if (result && result.error) {
      setError(result.error);
    }
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
            <FormItem className="w-2/3">
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    form.setValue(
                      "guess",
                      e.target.value.toUpperCase().replace(/[^A-Z ]/g, ""),
                    );
                    setError(null);
                  }}
                  className="bg-secondary-bg text-secondary-accent"
                />
              </FormControl>
              <FormDescription className="flex justify-between">
                {numberOfGuessesLeft}{" "}
                {numberOfGuessesLeft === 1 ? "guess" : "guesses"} left
              </FormDescription>
              <FormMessage className="text-error">{error}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          className="hover:bg-otherblue"
          type="submit"
          disabled={!form.watch("guess")}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
