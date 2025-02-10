"use client";

import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect } from "react";
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
import { roleEnum, interactionModeEnum } from "~/server/db/schema";
import { X } from "lucide-react";
import { IN_PERSON } from "~/hunt.config";

const zPhone = z.string().transform((arg, ctx) => {
  if (!arg) {
    return "";
  }

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

export const profileFormSchema = z
  .object({
    displayName: z
      .string()
      .min(1, { message: "Required" })
      .max(50, { message: "Max 50 characters" }),
    members: z
      .array(
        z.object({
          id: z.number().optional(),
          name: z.string().or(z.literal("")),
          email: z.string().email().or(z.literal("")),
        }),
      )
      .refine((members) => members.some((member) => member?.email), {
        message: "At least one email required",
      }),
    interactionMode: z.enum(interactionModeEnum.enumValues),
    numCommunity: z.string().max(30, { message: "Max 30 characters" }),
    phoneNumber: zPhone,
    roomNeeded: z.boolean(),
    solvingLocation: z.string().max(255, { message: "Max 255 characters" }),
    wantsBox: z.boolean().optional(),
    role: z.enum(roleEnum.enumValues),
  })
  .refine(
    (data) =>
      !(data.interactionMode === "remote" && data.wantsBox === undefined),
    {
      message: "Required",
      path: ["wantsBox"],
    },
  )
  .refine(
    (data) =>
      !(data.interactionMode === "in-person" && data.phoneNumber === ""),
    {
      message: "Required",
      path: ["phoneNumber"],
    },
  );

type TeamInfoFormProps = {
  id: string;
  displayName: string;
  role: "admin" | "user" | "testsolver";
  memberString: string;
  interactionMode: "in-person" | "remote";
  numCommunity: string;
  phoneNumber: string;
  roomNeeded: boolean;
  solvingLocation: string;
  wantsBox: boolean | null;
};

type Member = {
  id?: number;
  name: string | undefined;
  email: string | undefined;
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function serializeMembers(members: Member[]): string {
  return JSON.stringify(
    members
      .filter((person) => person.name || person.email)
      .map((person) => [person.name, person.email]),
  );
}

function deserializeMembers(memberString: string): Member[] {
  if (!memberString) return [];
  return JSON.parse(memberString).map(([name, email]: [string, string]) => ({
    id: undefined,
    name,
    email,
  }));
}

function formatPhoneNumber(phoneNumber: string | null): string {
  if (!phoneNumber) return "";
  const parsed = parsePhoneNumberFromString(phoneNumber);
  if (parsed && parsed.country === "US") {
    return parsed.formatNational();
  } else if (parsed) {
    return parsed.formatInternational();
  }
  return phoneNumber;
}

export function ProfileForm({
  id,
  displayName,
  role,
  memberString,
  interactionMode,
  numCommunity,
  phoneNumber,
  roomNeeded,
  solvingLocation,
  wantsBox,
}: TeamInfoFormProps) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const members = deserializeMembers(memberString);

  phoneNumber = formatPhoneNumber(phoneNumber);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName,
      role,
      members,
      interactionMode,
      numCommunity,
      phoneNumber,
      roomNeeded,
      solvingLocation,
      wantsBox: wantsBox ?? undefined,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  useEffect(() => {
    if (form.getValues("members").length === 0) {
      append({ name: "", email: "" });
    }
    if (
      form.getValues("members").some((member: Member) => member?.email) &&
      form.formState.errors.members?.message === "At least one email required"
    ) {
      form.trigger("members");
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const result = await updateTeam(id, {
      displayName: data.displayName,
      role: data.role,
      members: serializeMembers(data.members),
      interactionMode: data.interactionMode,
      numCommunity: data.numCommunity,
      phoneNumber: data.phoneNumber,
      roomNeeded: data.roomNeeded,
      solvingLocation: data.solvingLocation,
      wantsBox: data.wantsBox,
    });

    if (result.error) {
      toast({
        title: "Update failed",
        description: result.error,
      });
      return;
    }

    if (data.displayName != form.formState.defaultValues?.displayName) {
      update({ displayName: data.displayName });
    }
    if (data.role != form.formState.defaultValues?.role) {
      update({ role: data.role });
    }
    if (data.interactionMode != form.formState.defaultValues?.interactionMode) {
      update({ interactionMode: data.interactionMode });
    }

    form.reset({
      ...data,
      phoneNumber: formatPhoneNumber(data.phoneNumber),
    });
    router.refresh(); // Ideally we remove this but seems like still necessary in some cases
  };

  const isDirty = () => {
    const currentValues = form.getValues();
    return Object.keys(currentValues).some((key) => {
      switch (key) {
        case "members":
          return serializeMembers(currentValues[key]) !== memberString;
        case "wantsBox":
          return (
            currentValues["interactionMode"] === "remote" &&
            currentValues[key] != wantsBox
          );
        case "phoneNumber":
          return (
            currentValues["interactionMode"] === "in-person" &&
            currentValues[key] == ""
          );
        default:
          return (
            (currentValues as ProfileFormValues)[
              key as keyof ProfileFormValues
            ] !=
            (form.formState.defaultValues as ProfileFormValues)[
              key as keyof ProfileFormValues
            ]
          );
      }
    });
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
            <FormItem className="mb-8">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-main-header">
                  Display name <span className="text-error">*</span>
                </span>
                <FormMessage className="text-error" />
              </FormLabel>
              <FormControl className="">
                <Input placeholder="Josiah Carberry" {...field} />
              </FormControl>
              <FormDescription>
                This name will be displayed on the leaderboard.
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="mb-8">
          <FormLabel className="flex flex-row justify-between">
            <span className="mb-1.5 text-main-header">
              Team members <span className="text-error">*</span>
            </span>
            {!form
              .getValues("members")
              .some((member: Member) => member?.email) && (
              <span className="text-[0.8rem] font-medium text-error">
                At least one email required
              </span>
            )}
          </FormLabel>
          {fields.map((field, index) => (
            <div className="flex items-center space-x-2" key={field.id}>
              {/* Field for member name */}
              <FormField
                control={form.control}
                name={`members.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl className="text-main-text placeholder:text-main-accent">
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
                    <FormControl className="text-main-text placeholder:text-main-accent">
                      <Input
                        className={`rounded-none border-0 border-b p-0 shadow-none focus-visible:ring-transparent ${form.formState.errors.members?.[index] ? "border-red-300" : ""} text-current shadow-none focus-visible:ring-transparent`}
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
                className="h-7 w-7 p-1 hover:bg-footer-bg hover:text-main-text focus-visible:bg-footer-bg focus-visible:ring-0"
                disabled={
                  fields.length == 1 &&
                  form.watch("members")[0]?.name === "" &&
                  form.watch("members")[0]?.email === ""
                }
                onClick={() => remove(index)}
              >
                <X />
              </Button>
            </div>
          ))}
          <FormDescription className="pt-2">
            We recommend 6-8 members. Press ENTER to add entries.
          </FormDescription>
        </div>

        {/* Interaction mode field */}
        <FormField
          control={form.control}
          name="interactionMode"
          render={({ field }) => (
            <FormItem className="mb-8 space-y-3">
              <FormLabel className="text-main-header">
                We will be competing... <span className="text-error">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem
                      value="in-person"
                      disabled={new Date() > IN_PERSON.END_TIME}
                    />
                    <FormLabel
                      className={`font-normal text-main-header opacity-${new Date() > IN_PERSON.END_TIME ? 50 : 100}`}
                    >
                      In-person
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem
                      value="remote"
                      disabled={
                        new Date() > IN_PERSON.END_TIME ||
                        (new Date() > IN_PERSON.START_TIME &&
                          field.value === "in-person")
                      }
                    />
                    <FormLabel
                      className={`font-normal text-main-header opacity-${
                        new Date() > IN_PERSON.END_TIME ||
                        (new Date() > IN_PERSON.START_TIME &&
                          field.value === "in-person")
                          ? 50
                          : 100
                      }`}
                    >
                      Remote
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Other fields */}
        {form.getValues("interactionMode") === "in-person" ? (
          <div className="mb-8 space-y-8">
            <FormField
              control={form.control}
              name="numCommunity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row justify-between">
                    <span className="text-main-header">
                      Brown/RISD team members
                    </span>
                    <FormMessage className="text-error" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      value={form.watch("numCommunity")}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of undergraduates, graduates, faculty, or alumni.
                    Must have at least one to win.
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
                    <span className="text-main-header">
                      Phone number <span className="text-error">*</span>
                    </span>
                    <FormMessage className="text-error" />
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
                <FormItem className="flex flex-row items-center justify-between">
                  <div>
                    <FormLabel className="text-main-header">
                      Room needed
                    </FormLabel>
                    <FormDescription>
                      Hunt weekend will be busy. Select this if you'll need a
                      room.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={form.watch("roomNeeded")}
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
                  <FormLabel className="flex flex-row justify-between">
                    <span className="text-main-header">Solving location</span>
                    <FormMessage className="text-error" />
                  </FormLabel>
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
        ) : (
          <div className="mb-8 space-y-8">
            <FormField
              control={form.control}
              name="wantsBox"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row justify-between">
                    <span className="text-main-header">
                      Remote box <span className="text-error">*</span>
                    </span>
                    <FormMessage />
                  </FormLabel>
                  <FormDescription>
                    Are you interested in purchasing a box of physical puzzles?
                    This is non-binding and only offered to remote teams.
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={
                        (value) =>
                          field.onChange(
                            value === "true"
                              ? true
                              : value === "false"
                                ? false
                                : undefined,
                          ) // Map string to boolean
                      }
                      value={
                        form.watch("wantsBox") === true
                          ? "true"
                          : form.watch("wantsBox") === false
                            ? "false"
                            : undefined
                      } // Map boolean to string
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="true" />
                        <FormLabel className="font-normal text-main-header">
                          Yes, I might be interested!
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="false" />
                        <FormLabel className="font-normal text-main-header">
                          No thank you.
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Role field  */}
        {session?.user?.role === "admin" && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="mb-8 space-y-2">
                <FormLabel>Team permissions</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="user" />
                      <FormLabel className="font-normal">User</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="admin" />
                      <FormLabel className="font-normal">Admin</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="testsolver" />
                      <FormLabel className="font-normal">Testsolver</FormLabel>
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
                <Button
                  type="submit"
                  disabled={
                    !!Object.keys(form.formState.errors).length ||
                    !form
                      .watch("members")
                      .some((member: Member) => member?.email) ||
                    (form.watch("interactionMode") === "remote" &&
                      form.watch("wantsBox") !== true &&
                      form.watch("wantsBox") !== false)
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          </Alert>
        </div>
      </form>
    </Form>
  );
}
