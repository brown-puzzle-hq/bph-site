"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { insertAnswerToken } from "../actions";
import { SquareCheckBig } from "lucide-react";

function sanitizeAnswer(answer: any) {
  return typeof answer === "string"
    ? answer.toUpperCase().replace(/[^A-Z]/g, "")
    : "";
}

const formSchema = z.object({
  answer: z.preprocess(
    sanitizeAnswer,
    z
      .string()
      .min(1, { message: "Required" })
      .max(100, { message: "Max 100 characters" }),
  ),
});

type FormProps = {
  eventId: string;
};

export default function EventForm({ eventId }: FormProps) {
  const [shaking, setShaking] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      answer: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    const result = await insertAnswerToken(eventId, data.answer);
    if (result && result.error) {
      setError(result.error);
      setShaking(true);
      setTimeout(() => setShaking(false), 200);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full space-x-2"
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <input
                  {...field}
                  onChange={(e) => {
                    form.setValue(
                      "answer",
                      e.target.value.toUpperCase().replace(/[^A-Z ]/g, ""),
                    );
                    setError(null);
                  }}
                  placeholder="TOKEN"
                  autoComplete="off"
                  className={`w-full bg-inherit placeholder:text-white/40 ${error ? "text-incorrect-guess" : "text-main-text"} focus:outline-none ${shaking ? "animate-shake" : ""}`}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button
          className="rounded-sm bg-white bg-opacity-0 px-0.5 hover:bg-opacity-10 focus:outline-none focus-visible:bg-opacity-10 disabled:opacity-0"
          type="submit"
          disabled={!form.watch("answer")}
        >
          <SquareCheckBig className="h-4 w-4" />
        </button>
      </form>
    </Form>
  );
}
