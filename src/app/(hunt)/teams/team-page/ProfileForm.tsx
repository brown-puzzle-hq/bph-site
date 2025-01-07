"use client";

import parsePhoneNumberFromString from "libphonenumber-js";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { watch } from "fs";

const zPhone = z.string().transform((arg, ctx) => {
  const phone = parsePhoneNumberFromString(arg, {
    defaultCountry: "US",
    extract: false,
  });

  if (phone && phone.isValid()) {
    return phone.number;
  }

  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Invalid phone number.",
  });
  return z.NEVER;
});

export const profileFormSchema = z
  .object({
    displayName: z
      .string()
      .min(1, { message: "Display name is required" })
      .max(50, { message: "Display name must be at most 50 characters long" })
      .or(z.literal("")),
    interactionMode: z.enum(interactionModeEnum.enumValues).optional(),
    numCommunityMembers: z.coerce.number().optional(),
    phoneNumber: zPhone,
    roomNeeded: z.boolean().default(false).optional(),
    location: z.string().optional(),
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
  numCommunityMembers: number;
  phoneNumber: string;
  roomNeeded: boolean;
  location: string;
  role: "admin" | "user";
  members: {
    id: number | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
  }[];
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// TODO: add to database schema
export function ProfileForm({
  username,
  displayName,
  interactionMode,
  role,
  members,
}: TeamInfoFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [updatedInteractionMode, setUpdatedInteractionMode] =
    useState<TeamInfoFormProps["interactionMode"]>(interactionMode);

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

  const watchMembers = form.watch("members");

  useEffect(() => {
    if (watchMembers.length === 0) {
      append({ name: "", email: "" });
    }
  }, [watchMembers]);

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-4 md:w-2/3 lg:w-1/3"
      >
        {/* Display name field */}
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
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
              <FormLabel>Interaction Mode</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(
                    value: TeamInfoFormProps["interactionMode"],
                  ) => setUpdatedInteractionMode(value)}
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

        {/* Other fields */}
        {updatedInteractionMode === "in-person" && (
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="numCommunityMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Community Team Members
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                  Number of Brown/RISD undergraduates, graduates, faculty, or alumni.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Primary method of communication, required for in-person
                    teams.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roomNeeded"
              render={({ field }) => (
                <FormItem className="mb-6 flex flex-row items-center justify-between">
                  <div>
                    <FormLabel>Room Needed</FormLabel>
                    <FormDescription>
                      Do you need a room on campus?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solving Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Where can we best find you? (e.g. Barus & Holley 123,
                    Discord, etc.)
                  </FormDescription>
                  <FormMessage>{error}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="mb-12">
          <FormLabel>Members</FormLabel>
          {fields.map((field, index) => (
            <div className="flex items-center space-x-2" key={field.id}>
              {/* Field for member name */}
              <FormField
                control={form.control}
                name={`members.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-none border-0 border-b p-0 shadow-none focus-visible:ring-transparent"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Name"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (e.shiftKey) {
                              const prevField = document.querySelector(
                                `[name="members.${index - 1}.email"]`,
                              ) as HTMLInputElement;
                              prevField?.focus();
                            } else {
                              const nextField = document.querySelector(
                                `[name="members.${index}.email"]`,
                              ) as HTMLInputElement;
                              nextField?.focus();
                            }
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
                  </FormItem>
                )}
              />

              {/* Field for member email */}
              <FormField
                control={form.control}
                name={`members.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={`rounded-none border-0 border-b p-0 shadow-none focus-visible:ring-transparent ${field.value && form.formState.errors.members?.[index] ? "text-red-500" : "text-black"}`}
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Email"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (e.shiftKey) {
                              const prevField = document.querySelector(
                                `[name="members.${index}.name"]`,
                              ) as HTMLInputElement;
                              prevField?.focus();
                            } else if (index === fields.length - 1) {
                              append({ email: "", name: "" });
                            } else {
                              const nextField = document.querySelector(
                                `[name="members.${index + 1}.name"]`,
                              ) as HTMLInputElement;
                              nextField?.focus();
                            }
                          } else if (e.key === "Backspace" && !field.value) {
                            const prevField = document.querySelector(
                              `[name="members.${index}.name"]`,
                            ) as HTMLInputElement;
                            prevField?.focus();
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* X button */}
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
          ))}
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
