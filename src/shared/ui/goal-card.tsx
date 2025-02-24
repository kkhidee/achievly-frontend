import { GoalDto } from "@/shared/api";
import { Badge } from "./badge";
import { Calendar, PlusIcon } from "lucide-react";
import {
  formatTimestampDaysUntilDeadline,
  getCompletedHabitsCount,
  getCompletedTasksCount,
} from "@/app/lib/utils";
import { GoalCategoryIcon } from "@/shared/ui/goal-category-icon";
import { Button } from "@/shared/ui/button";

type GoalCardProps = {
  goal: GoalDto;
  completedView?: boolean;
  deadlineView?: boolean;
  onClick?: (goal: GoalDto) => void;
};

export function GoalCard({
  goal,
  completedView = false,
  deadlineView = false,
  onClick,
}: GoalCardProps) {
  return (
    <div className="flex items-center justify-between border-b border-b-neutral-800 py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="flex size-[64px] items-center justify-center rounded-md bg-neutral-700">
          <GoalCategoryIcon category={goal?.category || "default"} size={24} />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-base font-medium">{goal.title}</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Привычки{" "}
              {completedView &&
                `${getCompletedHabitsCount(goal?.habits || [])}/`}
              {goal?.habits?.length || 0}
            </Badge>
            <Badge variant="outline">
              Задачи{" "}
              {completedView && `${getCompletedTasksCount(goal?.tasks || [])}/`}
              {goal?.tasks?.length || 0}
            </Badge>
          </div>
          {!!goal?.deadlineTimestamp && deadlineView && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-xs">
                {formatTimestampDaysUntilDeadline(goal.deadlineTimestamp)}
              </span>
            </div>
          )}
        </div>
      </div>
      {onClick && (
        <Button
          size="sm"
          className="size-[32px] rounded-full"
          onClick={() => onClick(goal)}
        >
          <PlusIcon />
        </Button>
      )}
    </div>
  );
}

GoalCard.displayName = "GoalCard";
