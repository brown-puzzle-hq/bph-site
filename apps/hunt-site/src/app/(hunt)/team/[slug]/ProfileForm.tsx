"use client";

// Hooks
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// UI components
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, X } from "lucide-react";

// Other
import { deleteTeam, updateTeam } from "../actions";
import { roleEnum, interactionModeEnum } from "~/server/db/schema";
import { IN_PERSON } from "@/config/client";
import {
  Member,
  deserializeMembers,
  serializeMembers,
} from "~/lib/team-members";
import { signOut } from "next-auth/react";

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
    role: z.enum(roleEnum.enumValues),
    password: z
      .string()
      .min(8, { message: "Min 8 characters" })
      .max(50, { message: "Max 50 characters" })
      .or(z.literal("")),
    confirmPassword: z.string().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type TeamInfoFormProps = {
  id: string;
  displayName: string;
  role: "admin" | "user" | "testsolver";
  memberString: string;
  interactionMode: "in-person" | "remote";
};
type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({
  id,
  displayName,
  role,
  memberString,
  interactionMode,
}: TeamInfoFormProps) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const members = deserializeMembers(memberString);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName,
      role,
      members,
      interactionMode,
      password: "",
      confirmPassword: "",
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
      password: data.password,
    });

    if (result.error) {
      toast("Update failed", {
        description: result.error,
      });
      return;
    }

    if (session?.user?.id === id) {
      // updateTeam drives changes, this pulls from the database
      const session = await update(null);
      // Check for external updates
      if (session?.user) {
        data.displayName = session.user.displayName;
        data.interactionMode = session.user
          .interactionMode as typeof data.interactionMode;
        data.role = session.user.role as typeof data.role;
      }
    }

    form.reset({
      ...data,
      password: "",
      confirmPassword: "",
    });
    document.activeElement instanceof HTMLElement &&
      document.activeElement.blur();
  };

  const onDelete = async () => {
    const { error } = await deleteTeam(id);
    if (error) {
      toast("Deletion failed", {
        description: error,
      });
    } else {
      if (session?.user?.id !== id && session?.user?.role === "admin") {
        router.push("/admin/team");
      } else {
        signOut();
      }
    }
  };

  const isDirty = () => {
    const currentValues = form.getValues();
    return Object.keys(currentValues).some((key) => {
      switch (key) {
        case "members":
          return serializeMembers(currentValues[key]) !== memberString;
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
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
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
                <FormControl className="placeholder:text-white/40">
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
                          className={`rounded-none border-0 border-b p-0 shadow-none focus-visible:ring-transparent ${form.formState.errors.members?.[index] ? "border-red-300" : ""} text-current shadow-none focus-visible:ring-transparent`}
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
                        className={`font-normal text-main-text opacity-${new Date() > IN_PERSON.END_TIME ? 50 : 100}`}
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
                        className={`font-normal text-main-text opacity-${
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

          {/* Team permissions */}
          <div className="mb-8 space-y-8">
            {session?.user?.role === "admin" && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="mb-8 space-y-3">
                    <FormLabel className="text-main-header">
                      Team permissions
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {[
                          { value: "user", label: "User" },
                          { value: "admin", label: "Admin" },
                          { value: "testsolver", label: "Testsolver" },
                        ].map(({ value, label }) => (
                          <FormItem
                            key={value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <RadioGroupItem value={value} />
                            <FormLabel className="font-normal">
                              {label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {/* Password fields */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-row justify-between">
                      <span className="text-main-header">New password</span>
                      <FormMessage className="text-error" />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Leave blank to keep the current password.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-row justify-between">
                      <span className="text-main-header">Confirm password</span>
                      <FormMessage className="text-error" />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div
            className={`fixed bottom-3 left-1/2 z-10 flex w-full max-w-xl -translate-x-1/2 transform px-4 transition-transform duration-300 ${
              isDirty() ? "translate-y-0" : "translate-y-[5rem]"
            }`}
          >
            <Alert className="w-full border-0 bg-slate-700/50 p-2 shadow-lg backdrop-blur-md backdrop-filter">
              <div className="flex items-center justify-between">
                <AlertDescription className="flex items-center space-x-2 text-main-text">
                  <AlertCircle className="h-4 w-4" />
                  <span className="hidden sm:block">
                    Careful — you have unsaved changes!
                  </span>
                  <span className="sm:hidden">Unsaved changes!</span>
                </AlertDescription>
                <div className="flex space-x-4">
                  <button
                    className="text-main-text hover:underline"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </button>
                  <Button
                    type="submit"
                    disabled={
                      !!Object.keys(form.formState.errors).length ||
                      !form
                        .watch("members")
                        .some((member: Member) => member?.email) ||
                      form.watch("password") !== form.watch("confirmPassword")
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
