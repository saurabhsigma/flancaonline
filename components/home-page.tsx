import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Image from "next/image";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatTechStack } from "@/lib/utils";

type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  images: { url: string; alt: string }[];
  liveLink?: string;
};

type SiteContent = {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  servicesIntro: string;
  services: { title: string; description: string }[];
  whyChooseUsTitle: string;
  whyChooseUsItems: string[];
  aboutTitle: string;
  aboutDescription: string;
  contactTitle: string;
  contactDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
};

export function HomePage({
  content,
  projects,
}: {
  content: SiteContent;
  projects: Project[];
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="container-max grid min-h-[calc(100vh-5rem)] gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
            <div>
              <Badge className="mb-6">{content.heroBadge}</Badge>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                {content.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                {content.heroDescription}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="#contact">
                    {content.heroPrimaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#portfolio">{content.heroSecondaryCta}</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:42px_42px] opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
              <Card className="glass-panel relative overflow-hidden p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950 p-6 text-white dark:bg-slate-900">
                    <p className="text-sm text-slate-300">Launch Velocity</p>
                    <p className="mt-4 text-4xl font-semibold">4-8 weeks</p>
                    <p className="mt-2 text-sm text-slate-300">
                      For high-impact websites and validated MVP builds.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-secondary p-6">
                    <p className="text-sm text-muted-foreground">Trusted Workflow</p>
                    <p className="mt-4 text-2xl font-semibold">Strategy → Design → Build</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Structured delivery with clarity, polish, and speed.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 sm:col-span-2">
                    <p className="text-sm font-medium text-primary">
                      Product-minded execution
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      We design for conversion, build for maintainability, and optimize for
                      long-term growth instead of one-off launches.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <AnimatedSection id="services" className="py-20">
          <div className="container-max">
            <SectionHeading
              badge="Services"
              title="Digital services built for measurable momentum"
              description={content.servicesIntro}
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.services.map((service, index) => (
                <Card
                  key={service.title}
                  className="group glass-panel p-6 transition duration-300 hover:-translate-y-2 hover:border-primary/30"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-20">
          <div className="container-max grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                badge="Why Flanca"
                title={content.whyChooseUsTitle}
                description="We keep the process thoughtful, fast-moving, and grounded in business outcomes."
              />
            </div>
            <div className="space-y-4">
              {content.whyChooseUsItems.map((item) => (
                <Card key={item} className="glass-panel flex items-start gap-4 p-5">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="portfolio" className="py-20">
          <div className="container-max">
            <SectionHeading
              badge="Portfolio"
              title="Recent work that balances aesthetics, usability, and results"
              description="Featured projects from the Flanca pipeline, loaded dynamically from the CMS."
            />
            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {projects.map((project) => (
                <Card
                  key={project._id}
                  className="group overflow-hidden border-border/70 bg-card/85 transition duration-300 hover:-translate-y-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.images[0]?.url ?? "https://res.cloudinary.com/demo/image/upload/sample.jpg"}
                      alt={project.images[0]?.alt ?? project.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-semibold">{project.title}</h3>
                      {project.liveLink ? (
                        <Button asChild variant="ghost" size="icon">
                          <Link href={project.liveLink} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary">
                      {formatTechStack(project.techStack)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="about" className="py-20">
          <div className="container-max grid gap-8 lg:grid-cols-2">
            <Card className="glass-panel p-8">
              <Badge className="mb-4">About</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">{content.aboutTitle}</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {content.aboutDescription}
              </p>
            </Card>
            <Card className="overflow-hidden bg-slate-950 p-8 text-white dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-300">Flanca values</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {["Clarity", "Speed", "Craft", "Reliability"].map((value) => (
                  <div key={value}>
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Premium execution with a calm, collaborative process.
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="py-20">
          <div className="container-max grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <Card className="glass-panel p-8">
              <Badge className="mb-4">Contact</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">{content.contactTitle}</h2>
              <p className="mt-4 text-base text-muted-foreground">
                {content.contactDescription}
              </p>
              <div className="mt-8 space-y-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p>{content.contactEmail}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p>{content.contactPhone}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p>{content.contactLocation}</p>
                </div>
              </div>
            </Card>
            <Card className="glass-panel p-8">
              <ContactForm />
            </Card>
          </div>
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
