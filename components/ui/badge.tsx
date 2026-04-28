import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-sky-300/70 bg-white/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm shadow-sky-200/50 dark:border-sky-300/25 dark:bg-slate-950/55",
        className,
      )}
      {...props}
    />
  );
}
