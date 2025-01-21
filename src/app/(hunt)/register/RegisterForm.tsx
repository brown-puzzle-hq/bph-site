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
    username: z
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
    interactionMode: z.enum(interactionModeEnum.enumValues),
    numCommunity: z.string().max(30, { message: "Max 30 characters" }),
    phoneNumber: zPhone,
    roomNeeded: z.boolean().default(false),
    solvingLocation: z.string().max(255, { message: "Max 255 characters" }),
    members: z.array(
      z.object({
        id: z.number().optional(),
        name: z.string().or(z.literal("")),
        email: z.string().email().or(z.literal("")),
      }),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormProps = {};

type Member = {
  id?: number;
  name: string | undefined;
  email: string | undefined;
};

type RegisterFormValues = z.infer<typeof registerFormSchema>;

function serializeMembers(members: Member[]): string {
  return JSON.stringify(
    members
      .filter((person) => person.name || person.email)
      .map((person) => [person.name, person.email]),
  );
}

export function RegisterForm({}: RegisterFormProps) {
  const router = useRouter();
  router.prefetch("/");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      interactionMode: undefined,
      numCommunity: "",
      phoneNumber: "",
      roomNeeded: false,
      solvingLocation: "",
      members: [{ name: "", email: "" }],
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
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const result = await insertTeam({
      username: data.username,
      displayName: data.displayName,
      password: data.password,
      interactionMode: data.interactionMode,
      numCommunity: data.numCommunity,
      phoneNumber: data.phoneNumber,
      roomNeeded: data.roomNeeded,
      solvingLocation: data.solvingLocation,
      members: serializeMembers(data.members),
    });

    if (result.error) {
      toast({
        title: "Register failed",
        description: result.error,
      });
      return;
    }

    toast({
      title: "Welcome to Brown Puzzle Hunt, " + data.displayName + "!",
      description: "Your team has been registered.",
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-4 md:w-2/3 lg:w-1/3"
      >
        {/* Username field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-black">
                  Username <span className="text-red-500">*</span>
                </span>
                <FormMessage />
              </FormLabel>
              <FormControl>
                <Input placeholder="jcarberr" {...field} />
              </FormControl>
              <FormDescription>
                This is the private username your team will use when logging in.
                Please avoid special characters.
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

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-black">
                  Password <span className="text-red-500">*</span>
                </span>
                <FormMessage />
              </FormLabel>
              <FormControl>
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
                <span className="text-black">
                  Confirm password <span className="text-red-500">*</span>
                </span>
                <FormMessage />
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="mb-8">
          <FormLabel className="flex flex-row justify-between">
            <span>Team members</span>
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
                        className={`rounded-none border-0 border-b ${form.formState.errors.members?.[index] ? "border-red-300" : ""} p-0 text-black shadow-none focus-visible:ring-transparent`}
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
                className="h-10 w-10 text-gray-400 focus-visible:bg-neutral-100 focus-visible:text-neutral-900 focus-visible:ring-0"
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
            Press ENTER to add entries.
          </FormDescription>
        </div>

        {/* Interaction mode field */}
        <FormField
          control={form.control}
          name="interactionMode"
          render={({ field }) => (
            <FormItem className="mb-8 space-y-3">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-black">
                  We will be competing...{" "}
                  <span className="text-red-500">*</span>
                </span>
                <FormMessage />
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="in-person" />
                    <FormLabel className="font-normal text-black">
                      In-person
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="remote" />
                    <FormLabel className="font-normal text-black">
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
                    <span className="text-black">Brown/RISD team members</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" />
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
                  <FormLabel className="flex flex-row justify-between">
                    <span className="text-black">Solving location</span>
                    <FormMessage />
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
        )}

        <Button type="submit">Register</Button>

        <div className="my-8 text-sm">
          Already registered for the hunt?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
