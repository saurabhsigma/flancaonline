import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="container-max space-y-6 py-10">
      <Skeleton className="h-12 w-64" />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Skeleton className="h-[900px] w-full" />
        <div className="space-y-6">
          <Skeleton className="h-[520px] w-full" />
          <Skeleton className="h-[320px] w-full" />
        </div>
      </div>
    </div>
  );
}
