import { Skeleton } from "@/components/ui/skeleton";

export function UserCardSkeleton() {
  return (
    <div>
      <Skeleton className="w-full px-2 mt-2 py-4 h-12 rounded-md bg-slate-300" />
      <Skeleton className="w-full px-2 mt-2 py-4 h-12 rounded-md bg-slate-300" />
      <Skeleton className="w-full px-2 mt-2 py-4 h-12 rounded-md bg-slate-300" />
      <Skeleton className="w-full px-2 mt-2 py-4 h-12 rounded-md" />
    </div>
  );
}
