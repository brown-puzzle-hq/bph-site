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
  const session = useSession();
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
    const result = await login(data.id, data.password);
    if (result.error !== null) {
      setError(result.error);
    } else {
      if (session.data?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
        // Not sure how to refresh nav without this,
        // but this seems to not be a problem for admin
        router.refresh();
      }
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
              <FormControl>
                <Input
                  className="placeholder:text-gray-300"
                  placeholder="jcarberr"
                  {...field}
                />
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
                  className="text-sm text-blue-500 hover:underline"
                  tabIndex={-1}
                >
                  Forgot?
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password"
                  className="placeholder:text-gray-300"
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage>{error}</FormMessage>
            </FormItem>
          )}
        />
        <Button className="hover:bg-otherblue" type="submit">
          Log In
        </Button>
        <div className="pt-4 text-sm">
          New to the hunt?{" "}
          <Link href="/register" className="text-secondary hover:underline">
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
