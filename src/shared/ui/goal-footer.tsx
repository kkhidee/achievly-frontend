import { ReactNode } from "react";

function GoalFooter({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 flex w-full bg-background px-4 py-6 sm:max-w-[50vw]">
      {children}
    </div>
  );
}

GoalFooter.displayName = "GoalFooter";

export { GoalFooter };
