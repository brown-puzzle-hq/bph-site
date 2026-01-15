"use client";

// Hooks
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
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
import {
  IN_PERSON,
  INTERACTION_MODE_VALUES,
  ROLE_VALUES,
} from "@/config/client";
import { deserializeMembers, serializeMembers } from "~/lib/team-members";
import { signOut } from "next-auth/react";
import { Team } from "@/db/types";
import { focusAtEnd, cn } from "~/lib/utils";

export const profileFormSchema = z
  .object({
    displayName: z
      .string()
      .min(1, { message: "Required" })
      .max(50, { message: "Max 50 characters" }),
    members: z.array(
      z.object({
        name: z.string().or(z.literal("")),
        email: z.string().email().or(z.literal("")),
      }),
    ),
    interactionMode: z.enum(INTERACTION_MODE_VALUES),
    role: z.enum(ROLE_VALUES),
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

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type TeamProperties = Pick<
  Team,
  "displayName" | "role" | "members" | "interactionMode"
>;

export default function ProfileForm({
  id,
  initialProperties,
}: {
  id: string;
  initialProperties: TeamProperties;
}) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [teamProperties, setTeamProperties] = useState(initialProperties);

  // TODO: remove when we switch to database strategy
  useEffect(() => {
    if (
      session?.user?.displayName !== initialProperties.displayName ||
      session?.user?.interactionMode !== initialProperties.interactionMode ||
      session?.user?.role !== initialProperties.role
    ) {
      update(null);
    }
  }, []);

  const defaultMembers = (memberString: string) =>
    memberString === "[]"
      ? [{ name: "", email: "" }]
      : deserializeMembers(memberString);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...teamProperties,
      members: defaultMembers(teamProperties.members),
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
    if (fields.length === 0) {
      append({ name: "", email: "" });
    }
  }, [fields.length, append]);

  const onSubmit = async (data: ProfileFormValues) => {
    const result = await updateTeam(id, {
      ...data,
      members: serializeMembers(data.members),
    });

    if (result.error !== null) {
      toast("Update failed", {
        description: result.error,
      });
      return;
    }

    setTeamProperties(result.updatedTeam);

    if (session?.user?.id === id) {
      // updateTeam drives changes, this just updates JWT
      await update(null);
    }

    form.reset({
      ...result.updatedTeam,
      members: defaultMembers(result.updatedTeam.members),
      password: "",
      confirmPassword: "",
    });
  };

  const onDelete = async () => {
    const { error } = await deleteTeam(id);
    if (error) {
      toast("Deletion failed", {
        description: error,
      });
      return;
    }

    if (session?.user?.id !== id) {
      router.push("/admin/team");
    } else {
      signOut();
    }
  };

  const { isDirty, errors } = useFormState({ control: form.control });
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
    <div>
      <h1 className="w-full truncate text-ellipsis px-4 text-center">
        Welcome, {teamProperties.displayName}!
      </h1>
      <p className="mb-6 text-center">
        {id} • {teamProperties.interactionMode}
      </p>
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
                    fields.length === 1 &&
                    !members[0]?.name &&
                    !members[0]?.email
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
                      <RadioGroupItem
                        value="remote"
                        disabled={
                          inPersonEnded ||
                          (inPersonStarted && field.value === "in-person")
                        }
                      />
                      <FormLabel
                        className={cn(
                          "font-normal text-main-text",
                          (inPersonEnded ||
                            (inPersonStarted && field.value === "in-person")) &&
                            "opacity-50",
                        )}
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
            className={cn(
              "fixed bottom-3 left-1/2 z-10 flex w-full max-w-xl -translate-x-1/2 transform px-4 transition-transform duration-300",
              isDirty ? "translate-y-0" : "translate-y-[5rem]",
            )}
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
                  <Button type="submit">Save</Button>
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
