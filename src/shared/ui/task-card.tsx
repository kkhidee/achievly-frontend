import { MouseEventHandler } from "react";
import { TaskEntity } from "@/shared/api";
import { Calendar, Check } from "lucide-react";
import { formatTimestampRuLocale } from "@/app/lib/utils";

type TaskCardProps = {
  task: TaskEntity;
  isCheckedVisible?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function TaskCard({ task, isCheckedVisible, onClick }: TaskCardProps) {
  return (
    <button onClick={onClick}>
      <div className="relative overflow-hidden rounded-md border px-4 py-2">
        <div className="absolute left-0 top-0 h-full w-1 bg-sky-600" />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-start text-base font-medium">
                {task.title}
              </span>
              {task?.deadlineTimestamp && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="text-xs">
                    {formatTimestampRuLocale(task.deadlineTimestamp)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {(isCheckedVisible || (!isCheckedVisible && task.done)) && (
            <div className="flex size-[24px] items-center justify-center rounded-full bg-green-600">
              <Check size={14} strokeWidth={3} />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
