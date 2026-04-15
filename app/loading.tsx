import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-max space-y-8 py-16">
      <Skeleton className="h-16 w-2/3" />
      <Skeleton className="h-96 w-full" />
      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
