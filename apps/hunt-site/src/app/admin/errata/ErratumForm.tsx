"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { insertErratum } from "./actions";
import { Erratum } from "@/db/types";
import { ensureError } from "~/lib/utils";

type FormProps = {
  puzzleList: { id: string; name: string }[];
  errataList: Erratum[];
};

const formSchema = z.object({
  puzzleId: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
});

export default function ErratumForm({ puzzleList, errataList }: FormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      puzzleId: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await insertErratum(data.puzzleId, data.description);

      const newErratum = {
        puzzleId: data.puzzleId,
        id: errataList.length,
        description: data.description,
        timestamp: new Date(),
      };
      errataList.push(newErratum);

      toast("Erratum submitted.", {
        description: "See " + data.puzzleId + ".",
        action: (
          <Button asChild className="ml-auto">
            <Link href={`/puzzle/${data.puzzleId}`} target="_blank">
              View
            </Link>
          </Button>
        ),
      });

      form.setValue("description", "");
    } catch (e) {
      const error = ensureError(e);
      toast("Failed to submit erratum.", {
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="puzzleId"
          render={({ field }) => (
            <FormItem className="mb-4 w-full max-w-96">
              <FormLabel className="flex justify-between">
                <span className="text-black">Puzzle</span>
                <FormMessage className="text-error" />
              </FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(e) => {
                    field.onChange(e);
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <div className="truncate text-ellipsis text-left">
                      <SelectValue placeholder="Select" />
                    </div>
                  </SelectTrigger>
                  {/* TODO: figure out how to limit size of select entries */}
                  <SelectContent>
                    {puzzleList?.map((puzzle) => (
                      <SelectItem key={puzzle.id} value={puzzle.id}>
                        {puzzle.name.trim() ? puzzle.name : `[${puzzle.id}]`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="py-4">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-black">Description</span>
                <FormMessage />
              </FormLabel>
              <FormControl>
                <AutosizeTextarea
                  maxHeight={500}
                  className="resize-none"
                  placeholder="No response yet"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
