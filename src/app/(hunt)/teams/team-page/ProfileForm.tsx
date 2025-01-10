"use client";

import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { set, z } from "zod";
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
import { roleEnum, interactionModeEnum } from "~/server/db/schema";
import { X } from "lucide-react";

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
    message: "Invalid number",
  });
  return z.NEVER;
});

export const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Max 50 characters" }),
  interactionMode: z.enum(interactionModeEnum.enumValues),
  numCommunity: z.string().nullish().or(z.literal("")),
  phoneNumber: zPhone,
  roomNeeded: z.boolean().nullish().or(z.literal(false)),
  solvingLocation: z.string().nullish().or(z.literal("")),
  role: z.enum(roleEnum.enumValues),
  members: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().or(z.literal("")),
        email: z.string().email().or(z.literal("")),
      }),
    )
    .refine(
      (members) => members.some((member) => member?.name || member?.email),
      {
        message: "At least one member required",
      },
    ),
});

type TeamInfoFormProps = {
  variant: "edit" | "register";
  username: string;
  displayName: string;
  role: "admin" | "user";
  interactionMode: "in-person" | "remote";
  numCommunity: string;
  phoneNumber: string;
  roomNeeded: boolean;
  solvingLocation: string;
  memberString: string;
};

type member = {
  id?: number;
  name: string | null | undefined;
  email: string | null | undefined;
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function serializeMembers(members: member[]): string {
  const rows = members
    .filter((person) => person.name || person.email)
    .map((person) => `${person.name}\t${person.email}`);
  return rows.join("\n");
}

function deserializeMembers(memberString: string): member[] {
  if (!memberString) return [{ name: "", email: "" }];
  const rows = memberString.split("\n");
  return rows.map((row) => {
    const [name, email] = row.split("\t");
    return { id: undefined, name, email };
  });
}

function formatPhoneNumber(phoneNumber: string): string {
  const parsed = parsePhoneNumberFromString(phoneNumber);
  if (parsed && parsed.country === "US") {
    return parsed.formatNational();
  } else if (parsed) {
    return parsed.formatInternational();
  }
  return phoneNumber;
}

export function ProfileForm({
  variant = "edit",
  username,
  displayName,
  role,
  interactionMode,
  numCommunity,
  phoneNumber,
  roomNeeded,
  solvingLocation,
  memberString,
}: TeamInfoFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const members = deserializeMembers(memberString);
  const [error, setError] = useState<string | null>(null);
  const [memberError, setMemberError] = useState<string | null>(null);

  const [updatedInteractionMode, setUpdatedInteractionMode] =
    useState(interactionMode);

  phoneNumber = formatPhoneNumber(phoneNumber);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName,
      role,
      interactionMode,
      numCommunity,
      phoneNumber,
      roomNeeded,
      solvingLocation,
      members,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  const watchFields = form.watch();

  useEffect(() => {
    if (watchFields.members.length === 0) {
      append({ name: "", email: "" });
    }
    if (
      !watchFields.members.some(
        (member: member) => member?.name || member?.email,
      )
    ) {
      setMemberError("At least one member required");
    } else {
      setMemberError(null);
    }
  }, [watchFields]);

  const onSubmit = async (data: ProfileFormValues) => {
    const teamResult = await updateTeam(username, {
      displayName: data.displayName,
      role: data.role,
      interactionMode: data.interactionMode,
      numCommunity: data.numCommunity,
      phoneNumber: data.phoneNumber,
      roomNeeded: data.roomNeeded,
      solvingLocation: data.solvingLocation,
      members: serializeMembers(data.members),
    });

    if (teamResult.error) {
      setError(teamResult.error);
      return;
    }

    // Save changes button animation might be sufficient
    // toast({
    //   title: "Update successful",
    //   description: "Your team info has successfully been updated.",
    // });

    setError(null);
    data.phoneNumber = formatPhoneNumber(data.phoneNumber);
    form.reset(data);
    router.refresh();
  };

  const isDirty = () => {
    const currentValues = form.getValues();
    return Object.keys(currentValues).some((key) =>
      key === "members"
        ? serializeMembers(currentValues[key]) !== memberString
        : currentValues[key] != form.formState.defaultValues[key],
    );
  };

  console.log(form.formState.errors.members);

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
            <FormItem className="mb-8">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-black">
                  Display name <span className="text-red-500">*</span>
                </span>
                <FormMessage />
              </FormLabel>
              <FormControl>
                <Input placeholder="Josiah Carberry" {...field} />
              </FormControl>
              <FormDescription>
                This name will be displayed on the leaderboard.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Interaction mode field */}
        <FormField
          control={form.control}
          name="interactionMode"
          render={({ field }) => (
            <FormItem className="mb-8 space-y-3">
              <FormLabel>
                We will be competing... <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(
                    value: TeamInfoFormProps["interactionMode"],
                  ) => {
                    setUpdatedInteractionMode(value);
                    field.onChange(value);
                  }}
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
            </FormItem>
          )}
        />

        {/* Other fields */}
        {updatedInteractionMode === "in-person" && (
          <div className="mb-8 space-y-8">
            <FormField
              control={form.control}
              name="numCommunity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brown/RISD team members</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormDescription>
                    Number of undergraduates, graduates, faculty, or alumni.
                    Winning requires at least one.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row justify-between">
                    <span className="text-black">Phone number</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const formattedNumber = new AsYouType("US").input(
                          e.target.value,
                        );
                        field.onChange(formattedNumber);
                      }}
                    />
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
                <FormItem className="mb-8 flex flex-row items-center justify-between">
                  <div>
                    <FormLabel>Room needed</FormLabel>
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
              name="solvingLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solving location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Where can we best find you? (e.g. Barus & Holley 123,
                    Discord, etc.)
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="mb-8">
          <FormLabel className="flex flex-row justify-between">
            <span>
              Team members <span className="text-red-500">*</span>
            </span>
            <span className="text-[0.8rem] font-medium text-red-500">
              {memberError}
            </span>
          </FormLabel>
          {fields.map((field, index) => (
            <div className="flex items-center space-x-2" key={field.id}>
              {/* Field for member name */}
              <FormField
                control={form.control}
                name={`members.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-1/2">
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
                  <FormItem className="w-1/2">
                    <FormControl>
                      <Input
                        className={`rounded-none border-0 border-b p-0 shadow-none focus-visible:ring-transparent ${form.formState.errors.members?.[index] ? "text-red-500" : "text-black"}`}
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
          <FormDescription className="pt-3">
            Press ENTER to add entries.
          </FormDescription>
        </div>

        {/* Role field  */}
        {session?.user?.role === "admin" && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="mb-12 space-y-3">
                <FormLabel>Team permissions</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="user" />
                      </FormControl>
                      <FormLabel className="font-normal">User</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="admin" />
                      </FormControl>
                      <FormLabel className="font-normal">Admin</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <div
          className={`fixed bottom-3 left-1/2 z-10 flex w-full min-w-[450px] -translate-x-1/2 transform transition-transform duration-300 md:w-2/3 lg:w-1/3 ${
            isDirty() ? "translate-y-0" : "translate-y-[5rem]"
          }`}
        >
          <Alert className="w-full bg-slate-100 p-2 shadow-lg">
            <div className="flex items-center justify-between">
              <AlertDescription className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Careful — you have unsaved changes!</span>
              </AlertDescription>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => form.reset()}>
                  Reset
                </Button>
                <Button type="submit" disabled={!!Object.keys(form.formState.errors).length || memberError}>Save</Button>
              </div>
            </div>
          </Alert>
        </div>

        {/* TODO: just temporary, remove this later */}
        <div>
          <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        </div>
      </form>
    </Form>
  );
}
