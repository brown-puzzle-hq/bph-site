"use client";
import { useForm } from "react-hook-form";
import { toast } from "~/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { errata } from "@/db/schema";
import { insertErratum } from "./actions";

type FormProps = {
  puzzleList: { id: string; name: string }[];
  errataList: (typeof errata.$inferSelect)[];
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
    const result = await insertErratum(data.puzzleId, data.description);
    if (result.error) {
      toast({
        title: "Submission failed",
        description: result.error,
      });
    } else {
      const newErrata = {
        puzzleId: data.puzzleId,
        id: errataList.length,
        description: data.description,
        timestamp: new Date(),
      };
      errataList.push(newErrata);
      toast({
        description: "Erratum submitted for " + data.puzzleId + ".",
        action: (
          <Button
            onClick={() => (window.location.href = `/puzzle/${data.puzzleId}`)}
          >
            View
          </Button>
        ),
      });
      form.setValue("description", "");
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
