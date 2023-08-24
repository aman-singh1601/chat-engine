import { Skeleton } from "@/components/ui/skeleton";

export function MessageSkeleton() {
  return (
    <div className="flex flex-col">
      <div>
        <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200 mb-4">
          <Skeleton className="h-2 w-14 bg-slate-400 " />
        </Skeleton>
        <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200   mb-4">
          <Skeleton className="h-4 w-24 bg-slate-400 " />
        </Skeleton>
        <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200   mb-4">
          <Skeleton className="h-4 w-24 bg-slate-400 " />
        </Skeleton>
        <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200   mb-4">
          <Skeleton className="h-4 w-24 bg-slate-400 " />
        </Skeleton>
      </div>
      {/* user */}
      <div className="ml-[88%]">
        <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200   mb-4">
          <Skeleton className="h-4 w-24 bg-slate-400 " />
        </Skeleton>
        <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200   mb-4">
          <Skeleton className="h-4 w-24 bg-slate-400 " />
        </Skeleton>
        <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200  mb-4">
          <Skeleton className="h-4 w-24 bg-slate-400 " />
        </Skeleton>
      </div>

      {/* not user */}
      <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200 mb-4">
        <Skeleton className="h-2 w-14 bg-slate-400 " />
      </Skeleton>
      <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200   mb-4">
        <Skeleton className="h-4 w-24 bg-slate-400 " />
      </Skeleton>
      <Skeleton className="w-fit h-fit font-medium rounded-3xl my-1 p-2 px-3 bg-slate-200   mb-4">
        <Skeleton className="h-4 w-24 bg-slate-400 " />
      </Skeleton>
    </div>
  );
}
