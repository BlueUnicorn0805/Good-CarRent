import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-border animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
