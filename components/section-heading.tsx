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
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}
