"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "admin",
      password: "admin123",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      toast.error("Invalid username or password.");
      return;
    }

    toast.success("Welcome back.");
    router.refresh();
  }

  return (
    <Card className="glass-panel mx-auto max-w-md p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">Admin Access</p>
        <h1 className="mt-2 text-3xl font-semibold">Manage Flanca</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to update projects, site content, and inquiries.
        </p>
      </div>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" {...form.register("username")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...form.register("password")} />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Card>
  );
}
