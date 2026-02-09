"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
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
import { X } from "lucide-react";
import Link from "next/link";
import { IN_PERSON, HUNT_NAME, INTERACTION_MODE_VALUES } from "@/config/client";
import { signIn } from "next-auth/react";
import { serializeMembers } from "~/lib/team-members";
import { focusAtEnd, cn, ensureError } from "~/lib/utils";

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
    primaryEmail: z.string().email({ message: "Invalid email address" }),
    members: z.array(
      z.object({
        name: z.string().or(z.literal("")),
        email: z.string().email().or(z.literal("")),
      }),
    ),
    interactionMode: z.enum(INTERACTION_MODE_VALUES),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
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
    if (fields.length === 0) {
      append({ name: "", email: "" });
    }
  }, [fields.length, append]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await insertTeam({
        ...data,
        members: serializeMembers(data.members),
      });

      await signIn("credentials", {
        id: data.id,
        password: data.password,
        redirect: false,
      });

      toast("Welcome to " + HUNT_NAME + ", " + data.displayName + "!", {
        description: "Your team has been registered.",
      });
      router.push("/");
    } catch (e) {
      const error = ensureError(e);
      if (error.message.startsWith("duplicate key value")) {
        form.setError("id", {
          type: "server",
          message: "Username already taken",
        });
        form.setFocus("id");
      } else {
        toast.error("Failed to register team.", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  const { errors } = useFormState({ control: form.control });
  const members = useWatch({ control: form.control, name: "members" });

  const memberRefs = useRef<
    {
      name?: HTMLInputElement | null;
      email?: HTMLInputElement | null;
    }[]
  >([]);

  const inPersonEnded = new Date() > IN_PERSON.END_TIME;
  const inPersonStarted = new Date() > IN_PERSON.START_TIME;

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
                This is the private username your team will use to log in.
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
                This will be displayed on the leaderboard.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Primary email */}
        <FormField
          control={form.control}
          name="primaryEmail"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="flex flex-row justify-between">
                <span className="text-main-header">
                  Primary Email <span className="text-error">*</span>
                </span>
                <FormMessage className="text-error" />
              </FormLabel>
              <FormControl className="text-main-text placeholder:text-white/40">
                <Input placeholder="jcarberr@brown.edu" {...field} />
              </FormControl>
              <FormDescription>
                This will be used for important hunt-related communication.
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
                You'll probably want to share this with your team. Write it
                down!
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
            <span className="mb-1.5 text-main-header">Team members</span>
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
                        ref={(el) => {
                          field.ref(el);
                          memberRefs.current[index] ??= {};
                          memberRefs.current[index].name = el;
                        }}
                        value={field.value}
                        placeholder="Name"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const idx = e.shiftKey ? index - 1 : index;
                            focusAtEnd(memberRefs.current[idx]?.email);
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
                        className={cn(
                          "rounded-none border-0 border-b p-0 text-current shadow-none focus-visible:ring-transparent",
                          errors.members?.[index] && "border-red-300",
                        )}
                        {...field}
                        ref={(el) => {
                          field.ref(el);
                          memberRefs.current[index] ??= {};
                          memberRefs.current[index].email = el;
                        }}
                        value={field.value}
                        placeholder="Email"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (e.shiftKey) {
                              focusAtEnd(memberRefs.current[index]?.name);
                            } else if (index === fields.length - 1) {
                              append({ email: "", name: "" });
                            } else {
                              focusAtEnd(memberRefs.current[index + 1]?.name);
                            }
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
                  fields.length === 1 && !members[0]?.name && !members[0]?.email
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
                      disabled={inPersonEnded}
                    />
                    <FormLabel
                      className={cn(
                        "font-normal text-main-text",
                        inPersonEnded && "opacity-50",
                      )}
                    >
                      In-person
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="remote" />
                    <FormLabel className="font-normal text-main-text">
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
