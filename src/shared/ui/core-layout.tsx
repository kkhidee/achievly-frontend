import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export function CoreLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex h-dvh justify-center ">
      <div
        className={cn(
          "relative flex size-full flex-col sm:max-w-[50vw]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
