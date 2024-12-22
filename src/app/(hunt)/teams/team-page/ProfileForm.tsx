"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateTeam } from "../actions";
import { updateMembers } from "../actions";
import { roleEnum, interactionModeEnum } from "~/server/db/schema";
import { X } from "lucide-react";

export const profileFormSchema = z
  .object({
    displayName: z
      .string()
      .min(1, { message: "Display name is required" })
      .max(50, { message: "Display name must be at most 50 characters long" })
      .or(z.literal("")),
    interactionMode: z.enum(interactionModeEnum.enumValues).optional(),
    role: z.enum(roleEnum.enumValues).optional(),
    members: z
      .array(
        z.object({
          id: z.number().optional(),
          name: z.string().nullable(),
          email: z
            .string()
            .email({ message: "Please enter a valid email." })
            .nullable(),
        }),
      )
      .optional(),
  })
  .refine(
    (input) => {
      // Allow role and interaction mode to be undefined
      if (input.role !== undefined || input.interactionMode !== undefined)
        return true;
      if (input.displayName.length > 0) return false;
    },
    {
      message: "At least one field is required",
      path: ["displayName"],
    },
  );

type TeamInfoFormProps = {
  username: string;
  displayName: string;
  interactionMode: "in-person" | "remote";
  role: "admin" | "user";
  members: {
    id: number | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
  }[];
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({
  username,
  displayName,
  interactionMode,
  role,
  members,
}: TeamInfoFormProps) {
  console.log(username);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName,
      interactionMode,
      role,
      members,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const teamResult = await updateTeam(username, {
      displayName: data.displayName,
      interactionMode: data.interactionMode,
      role: data.role,
    });

    const memberResult = await updateMembers(username, members);

    if (teamResult.error) {
      setError(teamResult.error);
      return;
    }

    if (memberResult.error) {
      setError(memberResult.error);
      return;
    }

    toast({
      title: "Update successful",
      description: "Your team info has successfully been updated.",
    });
    setError(null);
    // router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Display name field */}
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Josiah Carberry" {...field} />
              </FormControl>
              <FormDescription>
                This name will be displayed on the leaderboard.
              </FormDescription>
              <FormMessage>{error}</FormMessage>
            </FormItem>
          )}
        />

        {/* Interaction mode field */}
        <FormField
          control={form.control}
          name="interactionMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>This team will be competing...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="in-person" />
                    </FormControl>
                    <FormLabel className="font-normal">In-person</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="remote" />
                    </FormControl>
                    <FormLabel className="font-normal">Remote</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="pb-4">
            <FormLabel>Members</FormLabel>
          </div>

          {fields.map((field, index) => (
            <div className="flex items-center space-x-2" key={field.id}>
              {/* Field for member name */}
              <FormField
                control={form.control}
                name={`members.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>Name</FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        // placeholder="Josiah Carberry"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            append({ email: "", name: "" });
                          } else if (e.key === "Backspace" && !field.value) {
                            remove(index);
                            // Move focus back to the previous field
                            setTimeout(() => {
                              const prevField = document.querySelector(
                                `[name="members.${index - 1}.email"]`,
                              ) as HTMLInputElement;
                              prevField?.focus();
                            }, 0);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field for member email */}
              <FormField
                control={form.control}
                name={`members.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>Email</FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        // placeholder="jcarr@brown.edu"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            append({ email: "", name: "" });
                          } else if (e.key === "Backspace" && !field.value) {
                            remove(index);
                            // Move focus back to the previous field
                            setTimeout(() => {
                              const prevField = document.querySelector(
                                `[name="members.${index - 1}.email"]`,
                              ) as HTMLInputElement;
                              prevField?.focus();
                            }, 0);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* X button */}
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 text-gray-400"
                  onClick={() => remove(index)}
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}

          {/* Button to add members */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ name: "", email: "" })}
          >
            Add Member
          </Button>
        </div>

        {/* Role field */}
        {/* {session?.user?.role === "admin" && ( */}
        {/*   <FormField */}
        {/*     control={form.control} */}
        {/*     name="role" */}
        {/*     render={({ field }) => ( */}
        {/*       <FormItem className="space-y-3"> */}
        {/*         <FormLabel>This user should be a...</FormLabel> */}
        {/*         <FormControl> */}
        {/*           <RadioGroup */}
        {/*             onValueChange={field.onChange} */}
        {/*             defaultValue={field.value} */}
        {/*             className="flex flex-col space-y-1" */}
        {/*           > */}
        {/*             <FormItem className="flex items-center space-x-3 space-y-0"> */}
        {/*               <FormControl> */}
        {/*                 <RadioGroupItem value="user" /> */}
        {/*               </FormControl> */}
        {/*               <FormLabel className="font-normal"> */}
        {/*                 Regular user */}
        {/*               </FormLabel> */}
        {/*             </FormItem> */}
        {/*             <FormItem className="flex items-center space-x-3 space-y-0"> */}
        {/*               <FormControl> */}
        {/*                 <RadioGroupItem value="admin" /> */}
        {/*               </FormControl> */}
        {/*               <FormLabel className="font-normal">Admin</FormLabel> */}
        {/*             </FormItem> */}
        {/*           </RadioGroup> */}
        {/*         </FormControl> */}
        {/*         <FormMessage /> */}
        {/*       </FormItem> */}
        {/*     )} */}
        {/*   /> */}
        {/* )} */}

        <Button className="bg-slate-900 hover:bg-gray-800" type="submit">
          Update team info
        </Button>
      </form>
    </Form>
  );
}
