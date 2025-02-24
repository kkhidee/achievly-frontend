import { MouseEventHandler } from "react";
import { HabitEntity } from "@/shared/api";
import { REPEAT_DAYS } from "@/app/constants/habit";
import { cn, isDoneHabit } from "@/app/lib/utils";
import { Check } from "lucide-react";

type HabitCardProps = {
  habit: HabitEntity;
  isCheckedVisible?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function HabitCard({
  habit,
  isCheckedVisible,
  onClick,
}: HabitCardProps) {
  return (
    <button onClick={onClick}>
      <div className="relative overflow-hidden rounded-md border px-4 py-2">
        <div className="absolute left-0 top-0 h-full w-1 bg-orange-600" />
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-start text-base font-medium">
              {habit.title}
            </span>
            <div className="flex items-center gap-2">
              {REPEAT_DAYS.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex size-[32px] items-center justify-center rounded-full text-xs font-medium",
                    `${habit.repeatDays.includes(option.value) ? "bg-orange-600" : "border"}`,
                  )}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>

          {(isCheckedVisible || (!isCheckedVisible && isDoneHabit(habit))) && (
            <div className="flex size-[24px] items-center justify-center rounded-full bg-green-600">
              <Check size={14} strokeWidth={3} />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
