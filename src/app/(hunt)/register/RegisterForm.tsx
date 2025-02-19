"use client";

import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { insertTeam } from "./actions";
import { interactionModeEnum } from "~/server/db/schema";
import { X } from "lucide-react";
import Link from "next/link";
import { IN_PERSON } from "~/hunt.config";
import { serializeMembers, Member } from "~/lib/utils";

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

export const registerFormSchema = z
  .object({
    id: z
      .string()
      .min(5, { message: "Min 5 characters" })
      .max(50, { message: "Max 50 characters" })
      .regex(/^\w+$/, {
        message: "No special characters",
      }),
    displayName: z
      .string()
      .min(1, { message: "Required" })
      .max(50, { message: "Max 50 characters" }),
    password: z
      .string()
      .min(8, { message: "Min 8 characters" })
      .max(50, { message: "Max 50 characters" }),
    confirmPassword: z.string(),
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
    roomNeeded: z.boolean().default(false),
    solvingLocation: z.string().max(255, { message: "Max 255 characters" }),
    wantsBox: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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

type RegisterFormProps = {};
type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm({}: RegisterFormProps) {
  const router = useRouter();
  router.prefetch("/");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      id: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      members: [{ name: "", email: "" }],
      interactionMode: undefined,
      numCommunity: "",
      phoneNumber: "",
      roomNeeded: false,
      solvingLocation: "",
      wantsBox: undefined,
    },
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
      form.formState.errors.members?.root?.message ===
        "At least one email required"
    ) {
      form.trigger("members");
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const result = await insertTeam({
      id: data.id,
      displayName: data.displayName,
      password: data.password,
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
        title: "Register failed",
        description: result.error,
      });
      return;
    }

    toast({
      title: "Welcome to Brown Puzzlehunt, " + data.displayName + "!",
      description: "Your team has been registered.",
    });
    router.push("/");
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-4 sm:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        {/* Id/username field */}
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-main-header">
                  Username <span className="text-error">*</span>
                </span>
                <FormMessage className="text-error" />
              </FormLabel>
              <FormControl className="text-main-text placeholder:text-main-accent">
                <Input placeholder="jcarberr" autoComplete="on" {...field} />
              </FormControl>
              <FormDescription>
                This is the private username your team will use when logging in.
                Please <u>avoid</u> spaces or special characters.
              </FormDescription>
            </FormItem>
          )}
        />

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
              <FormControl className="text-main-text placeholder:text-main-accent">
                <Input placeholder="Josiah Carberry" {...field} />
              </FormControl>
              <FormDescription>
                This name will be displayed on the leaderboard.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-main-header">
                  Password <span className="text-error">*</span>
                </span>
                <FormMessage className="text-error" />
              </FormLabel>
              <FormControl className="text-main-text">
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                You'll probably share this with your team. Write it down!
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Confirm password field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-main-header">
                  Confirm password <span className="text-error">*</span>
                </span>
                <FormMessage className="text-error" />
              </FormLabel>
              <FormControl className="text-main-text">
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="mb-8">
          <FormLabel className="flex flex-row justify-between">
            <span className="mb-1.5 text-main-header">
              Team members <span className="text-error">*</span>
            </span>
            <span className="text-[0.8rem] font-medium text-error">
              {form.formState.errors.members?.root?.message}
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
                    <FormControl className="text-main-text placeholder:text-main-accent">
                      <Input
                        className="rounded-none border-0 border-b p-0 shadow-none focus-visible:ring-transparent"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Name"
                        autoComplete="off"
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
                        className={`rounded-none border-0 border-b p-0 shadow-none focus-visible:ring-transparent ${form.formState.errors.members?.[index] ? "border-red-300" : ""} text-current shadow-none`}
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Email"
                        autoComplete="off"
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
                <X className="text-white" />
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
              <FormLabel className="flex flex-row justify-between">
                <span className="text-main-header">
                  We will be competing... <span className="text-error">*</span>
                </span>
                <FormMessage className="text-error" />
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
                    <RadioGroupItem value="remote" />
                    <FormLabel className="font-normal text-main-header">
                      Remote
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Other fields */}
        {form.watch("interactionMode") === "in-person" && (
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
                  <FormControl className="text-main-text">
                    <Input {...field} type="number" min="0" />
                  </FormControl>
                  <FormDescription>
                    Number of current undergraduate or graduate students on
                    campus. Must have at least one to win.
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
                  <FormControl className="text-main-text">
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
                <FormItem className="flex flex-row items-center justify-between space-x-1">
                  <div>
                    <FormLabel>Room needed</FormLabel>
                    <FormDescription>
                      Hunt weekend will be busy. Select this if you'll need a
                      room.
                    </FormDescription>
                  </div>
                  <FormControl className="text-main-text">
                    <Switch
                      className="focus-visible:ring-offset-0 data-[state=checked]:bg-violet-400 data-[state=unchecked]:bg-violet-950"
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
                  <FormLabel className="flex flex-row justify-between">
                    <span className="text-main-header">Solving location</span>
                    <FormMessage className="text-error" />
                  </FormLabel>
                  <FormControl className="text-main-text">
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
        {form.watch("interactionMode") === "remote" && (
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
                    <FormMessage className="text-error" />
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
                        field.value === undefined
                          ? undefined
                          : field.value === true
                            ? "true"
                            : "false"
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

        <Button type="submit">Register</Button>

        <div className="my-8 text-sm">
          Already registered for the hunt?{" "}
          <Link href="/login" className="text-link hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
