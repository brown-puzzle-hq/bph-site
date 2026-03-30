"use client";

import { useTransition } from "react";
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
import { handleGuess } from "./actions";
import { toast } from "sonner";
import { NumberOfGuesses } from "../DefaultPuzzlePage";
import { Infinity, SendHorizonal } from "lucide-react";
import { sanitizeAnswer } from "@/config/client";

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
  numberOfGuessesLeft: NumberOfGuesses;
  isSolved: boolean;
};

export default function GuessForm({
  puzzleId,
  numberOfGuessesLeft,
  isSolved,
}: FormProps) {
  // TODO: refactor form code?
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: { guess: "" },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    form.reset();
    startTransition(async () => {
      try {
        const { error } = await handleGuess(puzzleId, data.guess);
        if (error) {
          toast.error("Failed to submit guess.", {
            description: error,
          });
        }
      } catch (e) {
        toast.error("Failed to submit guess. Please try again.");
      }
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
                    field.onChange(e);
                  }}
                  onBlur={() => {
                    const cleaned = sanitizeAnswer(form.getValues("guess"));
                    form.setValue("guess", cleaned, { shouldValidate: true });
                  }}
                  className="bg-secondary-bg uppercase text-secondary-text"
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
                <FormMessage className="text-error" />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSolved || !numberOfGuessesLeft || isPending}
          className="bg-blue-900 px-8 py-1.5 hover:bg-blue-900/90"
        >
          <SendHorizonal className="size-4 fill-main-text" />
        </Button>
      </form>
    </Form>
  );
}
