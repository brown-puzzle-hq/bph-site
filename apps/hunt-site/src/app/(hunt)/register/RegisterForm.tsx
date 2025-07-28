"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
import { IN_PERSON, HUNT_NAME } from "~/hunt.config";
import { useSession } from "next-auth/react";

export type Member = {
  id?: number;
  name: string | undefined;
  email: string | undefined;
};

export function serializeMembers(members: Member[]): string {
  return JSON.stringify(
    members
      .filter((person) => person.name || person.email)
      .map((person) => [person.name, person.email]),
  );
}

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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormProps = {};
type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm({}: RegisterFormProps) {
  const { update } = useSession();
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      id: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      members: [{ name: "", email: "" }],
      interactionMode: undefined,
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
    const { error, session } = await insertTeam({
      id: data.id,
      displayName: data.displayName,
      password: data.password,
      members: serializeMembers(data.members),
      interactionMode: data.interactionMode,
    });

    if (error) {
      toast.error("Register failed", {
        description: error,
      });
    } else {
      update(session);
      toast("Welcome to " + HUNT_NAME + ", " + data.displayName + "!", {
        description: "Your team has been registered.",
      });
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormControl className="text-main-text placeholder:text-white/40">
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
              <FormControl className="text-main-text placeholder:text-white/40">
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
                    <FormControl className="text-main-text placeholder:text-white/40">
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
                    <FormControl className="text-main-text placeholder:text-white/40">
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
                className="h-7 w-7 p-1 hover:bg-black/20 focus-visible:bg-black/20 focus-visible:ring-0"
                disabled={
                  fields.length == 1 &&
                  form.watch("members")[0]?.name === "" &&
                  form.watch("members")[0]?.email === ""
                }
                onClick={() => remove(index)}
              >
                <X className="text-main-text" />
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

        <Button type="submit">Register</Button>

        <div className="my-8 text-sm">
          Already registered for the hunt?{" "}
          <Link
            href="/login"
            className="text-link hover:underline"
            prefetch={false}
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
