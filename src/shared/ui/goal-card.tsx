import { GoalDto } from "@/shared/api";
import { Badge } from "./badge";
import { PlusIcon } from "lucide-react";
import {
  getCompletedHabitsCount,
  getCompletedTasksCount,
} from "@/app/lib/utils";
import { GoalCategoryIcon } from "@/shared/ui/goal-category-icon";
import { Button } from "@/shared/ui/button";

type GoalCardProps = {
  goal: GoalDto;
  completedView?: boolean;
  onClick?: (goal: GoalDto) => void;
};

function GoalCard({ goal, completedView = false, onClick }: GoalCardProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-accent p-3 transition duration-200 hover:bg-neutral-700/50">
      <div className="flex items-start gap-3">
        <div className="flex size-8 items-center justify-center rounded-md bg-neutral-700">
          <GoalCategoryIcon category={goal?.category || "default"} size={18} />
        </div>
        <div className="flex flex-col items-start gap-y-1">
          <span className="text-sm font-medium">{goal.title}</span>
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

export { GoalCard };
