import { GoalDtoStatusEnum, useGetAllHistory, useGetGoals } from "@/shared/api";
import { HabitCard, HabitViewDrawer, Loader, TaskCard } from "@/shared/ui";
import { TaskViewDrawer } from "@/shared/ui/task-drawer";
import { Progress } from "@/shared/ui/progress";
import { GoalCalendar } from "@/features/goal-calendar";
import { useGoalBoardData } from "@/entities/goal-board/hooks/use-data";
import { useGoalBoardHandlers } from "@/entities/goal-board/hooks/use-handlers";
import { useSearchParams } from "react-router-dom";
import { isDoneHabit } from "@/app/lib/utils";
import { EmptyState } from "@/shared/ui/empty-state";

export function GoalBoard() {
  const [searchParams] = useSearchParams();

  const historyDate = searchParams.get("history-date");

  const { data: goals, isLoading } = useGetGoals({
    params: { status: GoalDtoStatusEnum.ongoing },
  });

  const { data: history } = useGetAllHistory();

  const {
    availableGoals,
    availableHabitsCount,
    availableTasksCount,
    completedTasksCount,
    completedHabitsCount,
    availableHabitsLabel,
    availableTasksLabel,
  } = useGoalBoardData({
    goals: historyDate ? history?.history?.[historyDate] : goals,
    historyDate,
  });

  const {
    openHabitDrawer,
    habitDrawerData,
    openTaskDrawer,
    taskDrawerData,
    currentGoalId,
    onHabitDrawerOpen,
    onHabitDrawerClose,
    onTaskDrawerOpen,
    onTaskDrawerClose,
  } = useGoalBoardHandlers();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <GoalCalendar />
      {!historyDate && (
        <div className="flex flex-col gap-3 px-4">
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
        <EmptyState
          text={
            historyDate
              ? "В этот день не было задач и привычек"
              : "Нет доступных задач и привычек"
          }
          condition={
            !availableGoals?.length ||
            availableGoals?.every(
              (el) => !el?.habits?.length && !el?.tasks?.length,
            )
          }
        />

        {availableGoals.map((goal) => {
          if (!goal.habits.length && !goal.tasks.length) return null;

          return (
            <div key={goal.id} className="flex flex-col gap-4 px-4">
              <div className="flex flex-nowrap items-center gap-4">
                <span className="whitespace-nowrap text-sm font-medium text-neutral-400">
                  {goal.title}
                </span>
                <div className="min-h-px w-full bg-neutral-700" />
              </div>

              {goal.habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  isCheckedVisible={
                    historyDate
                      ? isDoneHabit(habit, Number(historyDate))
                      : false
                  }
                  onClick={() => onHabitDrawerOpen(goal.id, habit)}
                />
              ))}

              {goal.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  isCheckedVisible={task.done}
                  task={task}
                  onClick={() => onTaskDrawerOpen(goal.id, task)}
                />
              ))}
            </div>
          );
        })}

        <HabitViewDrawer
          readOnly={!!historyDate}
          goalId={currentGoalId}
          habit={habitDrawerData}
          open={openHabitDrawer}
          timestamp={historyDate ? Number(historyDate) : undefined}
          onDrawerClose={onHabitDrawerClose}
        />
        <TaskViewDrawer
          readOnly={!!historyDate}
          goalId={currentGoalId}
          task={taskDrawerData}
          open={openTaskDrawer}
          onDrawerClose={onTaskDrawerClose}
        />
      </div>
    </div>
  );
}
