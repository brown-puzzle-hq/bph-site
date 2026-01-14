"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { HUNT_EMAIL } from "@/config/client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

export const loginFormSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export function LoginForm() {
  const [shaking, setShaking] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    const result = await signIn("credentials", {
      id: data.id,
      password: data.password,
      redirect: false,
    });

    if (result?.code === "credentials") {
      const input = document.querySelector(
        "input[name='password']",
      ) as HTMLInputElement;
      input?.select();
      setShaking(true);
      setTimeout(() => setShaking(false), 200);
    } else if (result?.ok) {
      router.push("/");
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-64 space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl className="placeholder:text-white/40 focus-visible:ring-opacity-20">
                <Input placeholder="jcarberr" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  href={`mailto:${HUNT_EMAIL}`}
                  className="text-sm text-link hover:underline"
                  tabIndex={-1}
                >
                  Forgot?
                </Link>
              </div>
              <FormControl className="placeholder:text-white/40 focus-visible:ring-opacity-20">
                <Input
                  type="password"
                  placeholder="password"
                  className={shaking ? "animate-shake" : undefined}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Log In</Button>
        <div className="pt-4 text-sm">
          New to the hunt?{" "}
          <Link href="/register" className="text-link hover:underline">
            Register
          </Link>
        </div>
      </form>
    </Form>
  );
}

export function LogoutForm() {
  return <Button onClick={() => signOut()}>Logout</Button>;
}
