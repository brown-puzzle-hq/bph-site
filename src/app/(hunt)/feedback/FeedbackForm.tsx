"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FeedbackDialog from "~/app/(hunt)/feedback/FeedbackDialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { feedback } from "~/server/db/schema";
import { insertFeedback } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "~/hooks/use-toast";

export const feedbackFormSchema = z.object({
  description: z.string().min(1, { message: "Feedback is required" }),
});

export default function FeedbackForm({
  feedbackList,
}: {
  feedbackList: { id: number; description: string; timestamp: Date }[];
}) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof feedbackFormSchema>) => {
    const result = await insertFeedback(data.description);
    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
      const newFeedback = {
        id: feedbackList.length,
        description: data.description,
        timestamp: new Date(),
      };
      feedbackList.push(newFeedback);
      toast({
        description: "Feedback submitted. Thank you!",
      });
      form.reset();
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please enter your thoughts on the hunt!</FormLabel>
                <FormControl>
                  <Textarea placeholder="No response yet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <FeedbackDialog feedbackList={feedbackList} />
    </>
  );
}
