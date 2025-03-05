import { HabitEntity } from "@/shared/api";
import { REPEAT_DAYS } from "@/app/constants/habit";
import { cn, isDoneHabit } from "@/app/lib/utils";
import { Check, Trash } from "lucide-react";

type HabitCardProps = {
  habit: HabitEntity;
  isCheckedVisible?: boolean;
  onDelete?: () => void;
};

export function HabitCard({
  habit,
  isCheckedVisible,
  onDelete,
}: HabitCardProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-md border px-4 py-2">
      <div className="absolute left-0 top-0 h-full w-1 bg-orange-600" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-start text-sm font-medium md:text-base">
            {habit.title}
          </span>
          <div className="flex items-center gap-2">
            {REPEAT_DAYS.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex size-[24px] md:size-[32px] items-center justify-center rounded-full text-xs font-medium",
                  `${habit.repeatDays.includes(option.value) ? "bg-orange-600" : "border"}`,
                )}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {(isCheckedVisible || (!isCheckedVisible && isDoneHabit(habit))) && (
            <div className="flex size-[24px] items-center justify-center rounded-full bg-green-600">
              <Check size={14} strokeWidth={3} />
            </div>
          )}

          {!!onDelete && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="cursor-pointer rounded-md p-1 text-red-600 transition duration-200 ease-in-out hover:bg-red-600 hover:text-neutral-300"
            >
              <Trash size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
