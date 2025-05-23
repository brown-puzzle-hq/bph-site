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

import { login, logout } from "./actions";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const loginFormSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export function LoginForm() {
  const { update } = useSession();
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
    const { error, session } = await login(data.id, data.password);
    if (error) {
      const input = document.querySelector(
        "input[name='password']",
      ) as HTMLInputElement;
      input?.select();
      setShaking(true);
      setTimeout(() => setShaking(false), 200);
    } else {
      update(session);
      if (session.data?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
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
                  href="mailto:brownpuzzlehq@gmail.com"
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
        <Button type="submit">
          <p className="w-full text-center">Log In</p>
        </Button>
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
  return (
    <Button
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </Button>
  );
}
