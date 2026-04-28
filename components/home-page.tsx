import { ArrowRight, CheckCircle2, LayoutGrid, Palette, Sparkles, Wand2 } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { ProductShowcase } from "@/components/product-showcase";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Product = {
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
  projects: Product[];
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
                  <a href="#contact">
                    {content.heroPrimaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#products">{content.heroSecondaryCta}</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:42px_42px] opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
              <Card className="glass-panel relative overflow-hidden p-6 sm:p-8">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-16 left-8 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-white/50 bg-white/75 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Sparkles className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm text-muted-foreground">Launch Velocity</p>
                        <p className="mt-1 text-3xl font-semibold">4-8 weeks</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      For high-impact websites and validated MVP builds.
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/50 bg-secondary/70 p-6 backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
                        <LayoutGrid className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm text-muted-foreground">Trusted Workflow</p>
                        <p className="mt-1 text-2xl font-semibold">Strategy → Design → Build</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Structured delivery with clarity, polish, and speed.
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-primary/20 bg-primary/10 p-6 sm:col-span-2">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 text-primary shadow-sm">
                        <Wand2 className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-primary">Product-minded execution</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          We design for conversion, build for maintainability, and optimize for
                          long-term growth instead of one-off launches.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <AnimatedSection id="services" className="scroll-mt-24 py-20">
          <div className="container-max">
            <SectionHeading
              badge="Star Services"
              title="Digital services built for measurable momentum"
              description={content.servicesIntro}
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.services.map((service, index) => (
                <Card
                  key={service.title}
                  className="group glass-panel p-6 hover:border-primary/30"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                      0{index + 1}
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/80 text-primary">
                      {index % 2 === 0 ? <Palette className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                    </span>
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

        <AnimatedSection className="scroll-mt-24 py-20">
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
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="products" className="scroll-mt-24 py-20">
          <div className="container-max">
            <SectionHeading
              badge="Products"
              title="Software products built for the Indian market"
              description="Click any product to view the full description, use case, and product stack."
            />
            <ProductShowcase products={projects} />
          </div>
        </AnimatedSection>

        <AnimatedSection id="about" className="scroll-mt-24 py-20">
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

        <AnimatedSection id="contact" className="scroll-mt-24 py-20">
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
