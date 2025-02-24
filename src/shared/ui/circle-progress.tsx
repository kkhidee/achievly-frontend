import { ReactNode } from "react";

export function CircleProgress({
  children,
  progress,
}: {
  children: ReactNode;
  progress: number;
}) {
  return (
    <div className="relative size-[32px]">
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200 dark:text-neutral-700"
          strokeWidth="2"
        ></circle>

        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-green-600 dark:text-green-500"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
          strokeLinecap="round"
        ></circle>
      </svg>

      <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
