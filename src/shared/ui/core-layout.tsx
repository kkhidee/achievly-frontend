import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";
import { useCheckAuth } from "@/shared/api";
import { Loader } from "@/shared/ui/loader";

export function CoreLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isLoading } = useCheckAuth();

  return (
    <div className="flex h-dvh justify-center ">
      <div
        className={cn(
          "relative flex size-full flex-col sm:max-w-[50vw]",
          className,
        )}
      >
        {isLoading ? <Loader /> : children}
      </div>
    </div>
  );
}
