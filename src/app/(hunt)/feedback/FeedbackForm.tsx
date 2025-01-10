"use client";
import { toast } from "~/hooks/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { insertFeedback } from "./actions";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";

export const feedbackFormSchema = z.object({
  description: z.string().min(1, { message: "Feedback is required" }),
});

export default function FeedbackForm({
  teamId,
  showTeam,
  feedbackList,
}: {
  teamId: string;
  showTeam: boolean;
  feedbackList: {
    id: number;
    teamId: string;
    description: string;
    timestamp: Date;
  }[];
}) {
  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof feedbackFormSchema>) => {
    const result = await insertFeedback(data.description);
    if (result.error) {
      toast({
        title: "Submission failed",
        description: result.error,
        status: "error",
      });
    } else {
      const newFeedback = {
        id: feedbackList.length,
        teamId: teamId,
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
                <FormLabel className="flex text-black">
                  Please enter your thoughts on the hunt! Any puzzle errors, website bugs, and general comments will be enormously helpful for us.
                </FormLabel>
                <FormControl>
                  <AutosizeTextarea
                    className="bg-gray-50 text-black"
                    placeholder="No response yet"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="bg-gray-900 hover:bg-gray-800 my-4"
            type="submit"
            disabled={!form.watch("description")}
          >
            Submit
          </Button>
        </form>
      </Form>
      <FeedbackDialog showTeam={showTeam} feedbackList={feedbackList} />
    </>
  );
}
