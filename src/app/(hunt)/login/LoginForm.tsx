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
  FormMessage,
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
  const [error, setError] = useState<string | null>(null);
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
      setError(error);
    } else {
      update(session);
      if (session.data?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
      setError(null);
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
              <FormControl className="bg-secondary-bg text-secondary-accent">
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
              <FormControl className="bg-secondary-bg text-secondary-accent">
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage className="text-error">{error}</FormMessage>
            </FormItem>
          )}
        />
        <Button className="hover:bg-otherblue" type="submit">
          Log In
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
    <Button className="hover:bg-otherblue" onClick={() => logout()}>
      Logout
    </Button>
  );
}
