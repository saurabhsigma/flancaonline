"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactMessageSchema } from "@/lib/validators";

type ContactFormValues = z.infer<typeof contactMessageSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send your message.");
      }

      toast.success("Message sent successfully.");
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your full name" {...form.register("name")} />
          <p className="text-xs text-red-500">{form.formState.errors.name?.message}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" {...form.register("email")} />
          <p className="text-xs text-red-500">{form.formState.errors.email?.message}</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Optional" {...form.register("company")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectType">Project type</Label>
          <Input id="projectType" placeholder="Website, App, UI/UX..." {...form.register("projectType")} />
          <p className="text-xs text-red-500">
            {form.formState.errors.projectType?.message}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Project brief</Label>
        <Textarea
          id="message"
          placeholder="Tell us about the goals, timeline, and current challenges."
          {...form.register("message")}
        />
        <p className="text-xs text-red-500">{form.formState.errors.message?.message}</p>
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        Send inquiry
      </Button>
    </form>
  );
}
