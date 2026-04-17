import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge className="mb-4">{badge}</Badge>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        <span className="bg-gradient-to-r from-slate-950 via-sky-700 to-blue-500 bg-clip-text text-transparent dark:from-white dark:via-sky-200 dark:to-cyan-300">
          {title}
        </span>
      </h2>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}
