"use client";

// Hooks
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import { z } from "zod";

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
import { focusAtEnd, cn, ensureError } from "~/lib/utils";
import { AsYouType } from "libphonenumber-js";
import { formatPhoneNumber, zPhone, memberSchema } from "~/lib/team-members";

export const profileFormSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(1, { message: "Required" })
      .max(50, { message: "Max 50 characters" }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Min 8 characters" })
      .max(50, { message: "Max 50 characters" })
      .or(z.literal("")),
    confirmPassword: z.string().trim().or(z.literal("")),
    primaryEmail: z.string().email({ message: "Invalid email address" }),
    // If in-person, must have at least one team member.
    members: z.array(memberSchema),
    interactionMode: z.enum(INTERACTION_MODE_VALUES),
    numCommunity: z.string().max(30, { message: "Max 30 characters" }),
    phoneNumber: zPhone,
    roomNeeded: z.boolean(),
    solvingLocation: z.string().max(255, { message: "Max 255 characters" }),
    role: z.enum(ROLE_VALUES),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      !(data.interactionMode === "in-person" && data.phoneNumber === ""),
    {
      message: "Required",
      path: ["phoneNumber"],
    },
  )
  .refine(
    (data) =>
      data.interactionMode !== "in-person" ||
      data.members.some(
        (m) => m.firstName.trim() || m.lastName.trim() || m.email.trim(),
      ),
    {
      message: "At least one team member required",
      path: ["members"],
    },
  );

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type TeamProperties = Omit<
  Team,
  "id" | "password" | "createTime" | "finishTime"
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

  useEffect(() => {
    if (
      session?.user.id === id &&
      (session.user.displayName !== initialProperties.displayName ||
        session.user.interactionMode !== initialProperties.interactionMode ||
        session.user.role !== initialProperties.role)
    ) {
      update(null);
    }
  }, [initialProperties]);

  const defaultMembers = (memberString: string) => {
    if (memberString === "[]")
      return [{ firstName: "", lastName: "", email: "" }];
    return deserializeMembers(memberString);
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...initialProperties,
      members: defaultMembers(initialProperties.members),
      phoneNumber: formatPhoneNumber(initialProperties.phoneNumber),
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
      append({ firstName: "", lastName: "", email: "" });
    }
  }, [fields.length, append]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const { updatedTeam } = await updateTeam(id, {
        ...data,
        members: serializeMembers(data.members),
      });

      form.reset({
        ...updatedTeam,
        members: defaultMembers(updatedTeam.members),
        phoneNumber: formatPhoneNumber(updatedTeam.phoneNumber),
        password: "",
        confirmPassword: "",
      });
    } catch (e) {
      const error = ensureError(e);
      toast("Failed to update team.", {
        description: error.message,
      });
    }
  };

  const onDelete = async () => {
    try {
      await deleteTeam(id);

      if (session?.user.id !== id) {
        router.push("/admin/team");
      } else {
        signOut();
      }
    } catch (e) {
      const error = ensureError(e);
      toast("Failed to delete team.", {
        description: error.message,
      });
    }
  };

  const { isDirty, errors } = useFormState({ control: form.control });
  const interactionMode = useWatch({
    control: form.control,
    name: "interactionMode",
  });
  const members = useWatch({ control: form.control, name: "members" });

  const memberRefs = useRef<
    {
      firstName?: HTMLInputElement | null;
      lastName?: HTMLInputElement | null;
      email?: HTMLInputElement | null;
    }[]
  >([]);

  const inPersonEnded = new Date() > IN_PERSON.END_TIME;
  const inPersonStarted = new Date() > IN_PERSON.START_TIME;

  return (
    <div>
      <h1 className="w-full truncate text-ellipsis px-4 text-center">
        Welcome, {initialProperties.displayName}!
      </h1>
      <p className="mb-6 text-center">
        {id} • {initialProperties.interactionMode}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
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
                    Team display name <span className="text-error">*</span>
                  </span>
                  <FormMessage className="text-error" />
                </FormLabel>
                <FormControl className="placeholder:text-white/40">
                  <Input
                    className="focus-visible:ring-transparent"
                    placeholder="Josiah Carberry"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will be displayed on the leaderboard.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Primary email field */}
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
                <FormControl className="placeholder:text-white/40">
                  <Input
                    autoComplete="one-time-code"
                    className="focus-visible:ring-transparent"
                    placeholder="jcarberr@brown.edu"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This email will be used for important hunt-related
                  communication.
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

          {/* Other fields */}
          {interactionMode === "in-person" && (
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
                        className="focus-visible:ring-transparent"
                        type="number"
                        min="0"
                        {...field}
                      />
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
                    <FormControl>
                      <Input
                        {...field}
                        className="focus-visible:ring-transparent"
                        value={field.value}
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
                        className="focus-visible:ring-offset-0 data-[state=checked]:bg-white/50 data-[state=unchecked]:bg-black/50"
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
                    <FormControl>
                      <Input
                        {...field}
                        className="focus-visible:ring-transparent"
                      />
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

          {/* Team members field */}
          <div className="mb-8">
            <FormLabel className="flex flex-row justify-between">
              <span className="mb-1 text-main-header">
                Team members
                {interactionMode === "in-person" && (
                  <span className="text-error"> *</span>
                )}
              </span>
              <span className="text-[0.8rem] font-medium text-error">
                {errors.members?.root?.message || errors.members?.message}
              </span>
            </FormLabel>
            {fields.map((field, index) => (
              <div className="flex items-center space-x-2" key={field.id}>
                {/* First name */}
                <FormField
                  control={form.control}
                  name={`members.${index}.firstName`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl className="text-main-text placeholder:text-white/40">
                        <Input
                          className={cn(
                            "rounded-none border-0 border-b p-0 shadow-none focus-visible:ring-transparent",
                            errors.members?.[index]?.firstName &&
                              "border-red-300",
                          )}
                          {...field}
                          ref={(el) => {
                            field.ref(el);
                            memberRefs.current[index] ??= {};
                            memberRefs.current[index].firstName = el;
                          }}
                          value={field.value}
                          placeholder="First name"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const idx = e.shiftKey ? index - 1 : index;
                              focusAtEnd(memberRefs.current[idx]?.lastName);
                            } else if (
                              e.key === "Backspace" &&
                              !(
                                field.value ||
                                memberRefs.current[index]?.lastName?.value ||
                                memberRefs.current[index]?.email?.value
                              )
                            ) {
                              e.preventDefault();
                              remove(index);
                              focusAtEnd(memberRefs.current[index - 1]?.email);
                            }
                          }}
                          autoComplete="one-time-code"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Last name */}
                <FormField
                  control={form.control}
                  name={`members.${index}.lastName`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl className="text-main-text placeholder:text-white/40">
                        <Input
                          className={cn(
                            "rounded-none border-0 border-b p-0 shadow-none focus-visible:ring-transparent",
                            errors.members?.[index]?.lastName &&
                              "border-red-300",
                          )}
                          {...field}
                          ref={(el) => {
                            field.ref(el);
                            memberRefs.current[index] ??= {};
                            memberRefs.current[index].lastName = el;
                          }}
                          value={field.value}
                          placeholder="Last name"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (e.shiftKey) {
                                focusAtEnd(
                                  memberRefs.current[index]?.firstName,
                                );
                              } else {
                                focusAtEnd(memberRefs.current[index]?.email);
                              }
                            } else if (e.key === "Backspace" && !field.value) {
                              e.preventDefault();
                              focusAtEnd(memberRefs.current[index]?.firstName);
                            }
                          }}
                          autoComplete="one-time-code"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Member email */}
                <FormField
                  control={form.control}
                  name={`members.${index}.email`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl className="text-main-text placeholder:text-white/40">
                        <Input
                          className={cn(
                            "rounded-none border-0 border-b p-0 text-current shadow-none focus-visible:ring-transparent",
                            errors.members?.[index]?.email && "border-red-300",
                          )}
                          {...field}
                          ref={(el) => {
                            field.ref(el);
                            memberRefs.current[index] ??= {};
                            memberRefs.current[index].email = el;
                          }}
                          value={field.value}
                          placeholder="Email"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (e.shiftKey) {
                                focusAtEnd(memberRefs.current[index]?.lastName);
                              } else if (index === fields.length - 1) {
                                append({
                                  firstName: "",
                                  lastName: "",
                                  email: "",
                                });
                              } else {
                                focusAtEnd(
                                  memberRefs.current[index + 1]?.firstName,
                                );
                              }
                            } else if (e.key === "Backspace" && !field.value) {
                              e.preventDefault();
                              focusAtEnd(memberRefs.current[index]?.lastName);
                            }
                          }}
                          autoComplete="one-time-code"
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
                  className="h-7 w-7 p-1 hover:bg-black/20 focus-visible:bg-black/20 focus-visible:ring-transparent"
                  disabled={
                    fields.length === 1 &&
                    !members[0]?.firstName &&
                    !members[0]?.lastName &&
                    !members[0]?.email
                  }
                  onClick={() => remove(index)}
                >
                  <X className="text-main-text" />
                </Button>
              </div>
            ))}
            <FormDescription className="pt-2">
              In-person teams: please list all team members, which will be
              checked against valid government-issued ID for security reasons.
              Names will only be visible to BPH staff and your team and will not
              be used for other purposes. The roster may be updated on the team
              profile page up to 24 hours before kickoff. For questions or
              concerns, please email us at{" "}
              <u>brownpuzzleHQ [at] gmail [dot] com</u>.
            </FormDescription>
          </div>

          {/* Team permissions */}
          {session?.user.role === "admin" && (
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
                          <FormLabel className="font-normal">{label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {/* Password fields */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="flex flex-row justify-between">
                  <span className="text-main-header">New password</span>
                  <FormMessage className="text-error" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="focus-visible:ring-transparent"
                  />
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
              <FormItem className="mb-8">
                <FormLabel className="flex flex-row justify-between">
                  <span className="text-main-header">Confirm password</span>
                  <FormMessage className="text-error" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="focus-visible:ring-transparent"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />

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
