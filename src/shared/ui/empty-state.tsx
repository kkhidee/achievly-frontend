import { Info } from "lucide-react";

type EmptyStateProps = {
  text: string;
  condition: boolean;
};

export function EmptyState({ text, condition }: EmptyStateProps) {
  if (!condition) {
    return null;
  }

  return (
    <div className="flex h-full items-center justify-center px-4">
      <span className="flex items-center gap-4 text-center text-base font-medium text-neutral-300 sm:text-lg">
        <Info className="text-yellow-600" />
        {text}
      </span>
    </div>
  );
}
