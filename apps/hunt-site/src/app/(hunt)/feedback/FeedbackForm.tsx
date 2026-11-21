"use client";
import { toast } from "sonner";
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

// TODO: calls an admin component in hunt page
// Refactor this

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import FeedbackDialog from "~/app/admin/feedback/FeedbackDialog";

import { insertFeedback } from "./actions";
import { CaseUpper, Eye, SendHorizonal } from "lucide-react";

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
    try {
      const { timestamp } = await insertFeedback(data.description);
      toast("Feedback submitted. Thank you!");
      feedbackList.push({
        id: feedbackList.length,
        teamId,
        description: data.description,
        timestamp,
      });
      setPreview(false);
      form.reset();
    } catch {
      toast.error("Failed to submit feedback. Please try again.");
    }
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
                <FormItem className={preview ? "mb-4" : undefined}>
                  <FormDescription className="font-medium">
                    Notice puzzle errata, website bugs, or anything else we
                    should be aware of? Send us feedback here.{" "}
                    <span className="italic">
                      This textbox supports Markdown.
                    </span>
                  </FormDescription>
                  <FormControl>
                    {preview ? (
                      <Card className="rounded-md bg-inherit">
                        <CardHeader className="p-4 pb-0.5">
                          <CardDescription className="text-main-header">
                            <strong>
                              <FormattedTime time={new Date()} />
                            </strong>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <article className="prose prose-custom-colors prose-feedback">
                            {useRemarkSync(field.value) || <></>}
                          </article>
                        </CardContent>
                      </Card>
                    ) : (
                      <AutosizeTextarea
                        className="border-0 bg-white/10 placeholder:text-white/80 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="No response yet"
                        {...field}
                      />
                    )}
                  </FormControl>
                </FormItem>
                <div className="mb-4 flex items-center justify-between space-x-2 rounded-md bg-[#1E2861] p-1">
                  <button
                    type="button"
                    disabled={field.value === ""}
                    onClick={() => setPreview((value) => !value)}
                    className="rounded-sm p-1 text-sm font-medium hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {preview ? (
                      <CaseUpper className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                  <button
                    type="submit"
                    disabled={field.value === ""}
                    className="rounded-sm bg-blue-900 px-6 py-1.5 hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <SendHorizonal className="size-4 fill-main-text" />
                  </button>
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
