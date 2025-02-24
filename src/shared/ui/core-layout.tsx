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
  const { isLoading, isSuccess } = useCheckAuth();

  if (!isSuccess || isLoading)
    return (
      <div className="flex h-dvh justify-center ">
        <div
          className={cn(
            "relative flex size-full flex-col sm:max-w-[100vw]",
            className,
          )}
        >
          <Loader />
        </div>
      </div>
    );

  return (
    <div className="flex h-dvh justify-center ">
      <div
        className={cn(
          "relative flex size-full flex-col sm:max-w-[100vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[45vw]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
