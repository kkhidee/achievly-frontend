import { useSearchParams } from "react-router-dom";
import { Progress } from "@/shared/ui";
import { useGoalsOverviewData } from "@/widgets/goals-overview/hooks/use-data";
import { GoalsOverviewForm } from "@/widgets/goals-overview/ui/form";

export function GoalsOverview() {
  const [searchParams] = useSearchParams();

  const historyDate = searchParams.get("history-date");

  const {
    availableGoals,
    availableHabitsCount,
    availableTasksCount,
    completedTasksCount,
    completedHabitsCount,
    availableHabitsLabel,
    availableTasksLabel,
  } = useGoalsOverviewData();

  return (
    <div className="flex flex-col gap-4">
      {!historyDate && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs">
              <span className="text-neutral-300">Сегодня доступны</span>{" "}
              <span className="text-orange-600">{availableHabitsLabel},</span>{" "}
              <span className="text-sky-600">{availableTasksLabel}</span>
            </span>

            <span className="text-xs">
              {completedHabitsCount + completedTasksCount} /{" "}
              {availableHabitsCount + availableTasksCount}
            </span>
          </div>
          <Progress
            value={
              ((completedHabitsCount + completedTasksCount) /
                (availableHabitsCount + availableTasksCount)) *
              100
            }
          />
        </div>
      )}

      <div className="flex grow flex-col gap-4">
        {availableGoals.map((goal) => {
          if (!goal.habits.length && !goal.tasks.length) return null;

          return (
            <div key={goal.id} className="flex flex-col gap-4">
              <div className="flex flex-nowrap items-center gap-4">
                <span className="whitespace-nowrap text-sm font-medium text-neutral-400 transition duration-100 hover:text-white">
                  {goal.title}
                </span>
                <div className="min-h-px w-full bg-neutral-700" />
              </div>

              <div className="flex flex-col gap-4">
                <GoalsOverviewForm goal={goal} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
