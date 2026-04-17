"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema, siteContentSchema } from "@/lib/validators";

type ProjectValues = z.infer<typeof projectSchema>;
type SiteContentValues = z.infer<typeof siteContentSchema>;

type AdminDashboardProps = {
  content: SiteContentValues;
  projects: Array<
    ProjectValues & {
      _id: string;
    }
  >;
  messages: Array<{
    _id: string;
    name: string;
    email: string;
    company?: string;
    projectType: string;
    message: string;
    createdAt: string;
  }>;
};

const emptyProject: ProjectValues = {
  title: "",
  description: "",
  techStack: [""],
  images: [],
  liveLink: undefined,
  featured: false,
};

export function AdminDashboard({
  content,
  projects: initialProjects,
  messages,
}: AdminDashboardProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectSubmitting, setProjectSubmitting] = useState(false);
  const [contentSubmitting, setContentSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const contentForm = useForm<SiteContentValues>({
    resolver: zodResolver(siteContentSchema),
    defaultValues: content,
  });

  const projectForm = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: emptyProject,
  });

  const serviceFields = useFieldArray({
    control: contentForm.control,
    name: "services",
  });

  const imageFields = useFieldArray({
    control: projectForm.control,
    name: "images",
  });

  const isEditing = useMemo(() => Boolean(editingProjectId), [editingProjectId]);
  const techStackValues = projectForm.watch("techStack");
  const whyChooseUsValues = contentForm.watch("whyChooseUsItems");

  function loadProjectForEdit(projectId: string) {
    const project = projects.find((item) => item._id === projectId);
    if (!project) {
      toast.error("Project not found.");
      return;
    }

    setEditingProjectId(projectId);
    projectForm.reset(project);
  }

  function resetProjectForm() {
    setEditingProjectId(null);
    projectForm.reset(emptyProject);
  }

  async function handleContentSubmit(values: SiteContentValues) {
    setContentSubmitting(true);

    try {
      const response = await fetch("/api/admin/site-content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Failed to update content.");
      }

      toast.success("Site content updated.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update content.");
    } finally {
      setContentSubmitting(false);
    }
  }

  async function handleProjectSubmit(values: ProjectValues) {
    setProjectSubmitting(true);

    try {
      const endpoint = editingProjectId
        ? `/api/admin/projects/${editingProjectId}`
        : "/api/admin/projects";
      const method = editingProjectId ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as {
        message?: string;
        project?: ProjectValues & { _id: string };
      };

      if (!response.ok || !payload.project) {
        throw new Error(payload.message || "Failed to save project.");
      }

      setProjects((current) => {
        if (!editingProjectId) {
          return [payload.project!, ...current];
        }

        return current.map((project) =>
          project._id === editingProjectId ? payload.project! : project,
        );
      });

      toast.success(editingProjectId ? "Project updated." : "Project created.");
      resetProjectForm();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save project.");
    } finally {
      setProjectSubmitting(false);
    }
  }

  async function handleDeleteProject(projectId: string) {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Failed to delete project.");
      }

      setProjects((current) => current.filter((item) => item._id !== projectId));
      if (editingProjectId === projectId) {
        resetProjectForm();
      }
      toast.success("Project deleted.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete project.");
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as {
        message?: string;
        image?: { url: string; publicId: string; alt: string };
      };

      if (!response.ok || !payload.image) {
        throw new Error(payload.message || "Upload failed.");
      }

      imageFields.append(payload.image);
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="container-max space-y-10 py-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-primary">Admin Dashboard</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Control center</h1>
          <p className="mt-3 text-muted-foreground">
            Update site messaging, manage the product catalogue, and review inbound leads.
          </p>
        </div>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/admin" })}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass-panel p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Editable Site Content</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage homepage copy without touching code.
            </p>
          </div>
          <form className="space-y-5" onSubmit={contentForm.handleSubmit(handleContentSubmit)}>
            <div className="space-y-2">
              <Label>Hero Badge</Label>
              <Input {...contentForm.register("heroBadge")} />
            </div>
            <div className="space-y-2">
              <Label>Hero Title</Label>
              <Input {...contentForm.register("heroTitle")} />
            </div>
            <div className="space-y-2">
              <Label>Hero Description</Label>
              <Textarea {...contentForm.register("heroDescription")} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Primary CTA</Label>
                <Input {...contentForm.register("heroPrimaryCta")} />
              </div>
              <div className="space-y-2">
                <Label>Secondary CTA</Label>
                <Input {...contentForm.register("heroSecondaryCta")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Services Intro</Label>
              <Textarea {...contentForm.register("servicesIntro")} />
            </div>
            <div className="space-y-4">
              <Label>Services</Label>
              {serviceFields.fields.map((field, index) => (
                <div key={field.id} className="grid gap-4 rounded-2xl border border-border p-4">
                  <Input
                    placeholder="Service title"
                    {...contentForm.register(`services.${index}.title`)}
                  />
                  <Textarea
                    placeholder="Service description"
                    {...contentForm.register(`services.${index}.description`)}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label>Why Choose Us Title</Label>
              <Input {...contentForm.register("whyChooseUsTitle")} />
            </div>
            <div className="space-y-4">
              <Label>Why Choose Us Items</Label>
              {whyChooseUsValues.map((_, index) => (
                <div key={`why-${index}`} className="flex gap-3">
                  <Input {...contentForm.register(`whyChooseUsItems.${index}`)} />
                  {whyChooseUsValues.length > 3 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        contentForm.setValue(
                          "whyChooseUsItems",
                          whyChooseUsValues.filter((_, itemIndex) => itemIndex !== index),
                          { shouldDirty: true },
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  contentForm.setValue("whyChooseUsItems", [...whyChooseUsValues, ""], {
                    shouldDirty: true,
                  })
                }
              >
                <Plus className="h-4 w-4" />
                Add item
              </Button>
            </div>
            <div className="space-y-2">
              <Label>About Title</Label>
              <Input {...contentForm.register("aboutTitle")} />
            </div>
            <div className="space-y-2">
              <Label>About Description</Label>
              <Textarea {...contentForm.register("aboutDescription")} />
            </div>
            <div className="space-y-2">
              <Label>Contact Title</Label>
              <Input {...contentForm.register("contactTitle")} />
            </div>
            <div className="space-y-2">
              <Label>Contact Description</Label>
              <Textarea {...contentForm.register("contactDescription")} />
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input {...contentForm.register("contactEmail")} />
              </div>
              <div className="space-y-2">
                <Label>Contact Phone</Label>
                <Input {...contentForm.register("contactPhone")} />
              </div>
              <div className="space-y-2">
                <Label>Contact Location</Label>
                <Input {...contentForm.register("contactLocation")} />
              </div>
            </div>
            <Button type="submit" disabled={contentSubmitting}>
              {contentSubmitting ? "Saving..." : "Save Content"}
            </Button>
          </form>
        </Card>

        <div className="space-y-8">
          <Card className="glass-panel p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  {isEditing ? "Edit Product" : "Add Product"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Showcase new products with Cloudinary-hosted visuals.
                </p>
              </div>
              {isEditing ? (
                <Button variant="ghost" onClick={resetProjectForm}>
                  Create new
                </Button>
              ) : null}
            </div>
            <form className="space-y-5" onSubmit={projectForm.handleSubmit(handleProjectSubmit)}>
              <div className="space-y-2">
                <Label>Product Title</Label>
                <Input {...projectForm.register("title")} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea {...projectForm.register("description")} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Tech Stack</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      projectForm.setValue("techStack", [...techStackValues, ""], {
                        shouldDirty: true,
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                    Add stack item
                  </Button>
                </div>
                {techStackValues.map((_, index) => (
                  <div key={`stack-${index}`} className="flex gap-3">
                    <Input {...projectForm.register(`techStack.${index}`)} />
                    {techStackValues.length > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          projectForm.setValue(
                            "techStack",
                            techStackValues.filter((_, itemIndex) => itemIndex !== index),
                            { shouldDirty: true },
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Images</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="max-w-[220px]"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {imageFields.fields.map((image, index) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-2xl border border-border"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <p className="truncate text-xs text-muted-foreground">{image.alt}</p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => imageFields.remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Live Link</Label>
                <Input placeholder="https://example.com" {...projectForm.register("liveLink")} />
              </div>
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" {...projectForm.register("featured")} />
                Mark as featured
              </label>
              <Button type="submit" disabled={projectSubmitting || uploading}>
                {projectSubmitting ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
              </Button>
            </form>
          </Card>

          <Card className="glass-panel p-6">
            <h2 className="text-2xl font-semibold">Products</h2>
            <div className="mt-6 space-y-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="flex flex-col gap-4 rounded-2xl border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.techStack.join(" • ")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => loadProjectForEdit(project._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-panel p-6">
            <h2 className="text-2xl font-semibold">Recent Inquiries</h2>
            <div className="mt-6 space-y-4">
              {messages.length ? (
                messages.map((message) => (
                  <div key={message._id} className="rounded-2xl border border-border p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                      <p className="rounded-full bg-secondary px-3 py-1 text-xs">
                        {message.projectType}
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{message.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No inquiries yet.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
