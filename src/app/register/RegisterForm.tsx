"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "~/hooks/use-toast";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { interactionModeEnum } from "~/server/db/schema";
import { insertTeam } from "./actions";
import Link from "next/link";

export const registerFormSchema = z
  .object({
    // TODO: validate that username does not contain special characters
    // #GoodFirstIssue
    username: z
      .string()
      .min(8, { message: "Username must be at least 8 characters long" })
      .max(50, { message: "Username must be at most 50 characters long" }),
    displayName: z
      .string()
      .min(1, { message: "Display name is required" })
      .max(50, { message: "Display name must be at most 50 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password must be at most 50 characters long" }),
    confirmPassword: z.string(),
    interactionMode: z.enum(interactionModeEnum.enumValues),
    // TODO: include additional team members
    // Check if we can make this consistent with the db schema automatically
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormProps = {};

export function RegisterForm({}: RegisterFormProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Prefetch the home page
  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      interactionMode: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    const result = await insertTeam(
      data.username,
      data.displayName,
      data.password,
      data.interactionMode,
    );

    if (result.error) {
      setError(result.error);
    } else {
      toast({
        title: "Welcome to Brown Puzzle Hunt, " + data.displayName + "!",
        description: "Your team has been registered.",
      });
      router.push("/");
      setError(null);
    }
  };

  // TODO: size of the form changes when the error message is shown
  // See: LoginForm.tsx
  // #GoodFirstIssue

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jcarberr" {...field} />
              </FormControl>
              <FormDescription>
                This is the private username your team will use when logging in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Josiah Carberry" {...field} />
              </FormControl>
              <FormDescription>
                This name will be displayed publicly on the leaderboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                You'll probably share this with your team.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interactionMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>This team will be competing...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
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
        <Button type="submit">Register</Button>
        <div className="py-2 text-sm">
          Already registered for the hunt?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
