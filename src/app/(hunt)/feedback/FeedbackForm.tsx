"use client";
import { toast } from "~/hooks/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRemarkSync } from "react-remark";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { FormattedTime } from "~/lib/time";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import FeedbackDialog from "~/app/(admin)/admin/feedback/FeedbackDialog";
import { insertFeedback } from "./actions";

export const feedbackFormSchema = z.object({
  description: z.string().min(1, { message: "Required" }),
});

export default function FeedbackForm({
  teamId,
  feedbackList,
}: {
  teamId: string;
  feedbackList: {
    id: number;
    teamId: string;
    description: string;
    timestamp: Date;
  }[];
}) {
  const [preview, setPreview] = useState(false);

  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof feedbackFormSchema>) => {
    const timestamp = new Date();
    const result = await insertFeedback(data.description, timestamp);
    if (result.error) {
      toast({
        title: "Submission failed",
        description: result.error,
      });
    } else {
      const newFeedback = {
        id: feedbackList.length,
        teamId: teamId,
        description: data.description,
        timestamp,
      };
      feedbackList.push(newFeedback);
      toast({
        description: "Feedback submitted. Thank you!",
      });
      form.reset();
    }
    setPreview(false);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <>
                <FormItem className="mb-4">
                  <FormDescription className="text-main-text">
                    Any puzzle errors, website bugs, or general comments will be
                    enormously helpful for us. This textbox supports Markdown.
                  </FormDescription>
                  <FormControl>
                    {preview ? (
                      <Card className="bg-inherit">
                        <CardHeader className="p-4 pb-0.5">
                          <CardDescription className="text-main-header">
                            <strong>
                              <FormattedTime time={new Date()} />
                            </strong>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <article className="prose prose-custom">
                            {useRemarkSync(field.value) || <></>}
                          </article>
                        </CardContent>
                      </Card>
                    ) : (
                      <AutosizeTextarea
                        className="bg-inherit text-main-text focus-visible:ring-offset-0"
                        placeholder="No response yet"
                        {...field}
                      />
                    )}
                  </FormControl>
                </FormItem>
                <div className="mb-4 flex space-x-2">
                  <Button type="submit" disabled={field.value === ""}>
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setPreview((value) => !value)}
                    disabled={field.value === ""}
                  >
                    {preview ? "Edit" : "Preview"}
                  </Button>
                </div>
              </>
            )}
          />
        </form>
      </Form>
      <div>
        <FeedbackDialog teamSide={true} feedbackList={feedbackList} />
      </div>
    </div>
  );
}
