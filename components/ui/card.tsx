import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-border/70 bg-card/75 shadow-soft backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
