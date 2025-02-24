import { useMemo } from "react";
import {
  declension,
  getAvailableGoalsVolumes,
  getAvailableHabits,
  getAvailableTasks,
  getCompletedGoalsVolumes,
} from "@/app/lib/utils";
import { GoalDto, HistoryGoalDto } from "@/shared/api";
import dayjs from "dayjs";

export const useGoalBoardData = ({
  goals,
  historyDate,
}: {
  goals: (GoalDto | HistoryGoalDto)[] | undefined;
  historyDate: string | null;
}) => {
  const availableGoals = useMemo(() => {
    return (goals || []).map((goal) => ({
      id: goal.id,
      title: goal.title,
      habits:
        getAvailableHabits(
          goal?.habits || [],
          historyDate ? dayjs(Number(historyDate)).day() : dayjs().day(),
        ) || [],
      tasks:
        getAvailableTasks(
          goal?.tasks || [],
          historyDate ? Number(historyDate) : undefined,
        ) || [],
    }));
  }, [goals, historyDate]);

  const { availableHabitsCount, availableTasksCount } =
    getAvailableGoalsVolumes(availableGoals || []);

  const { completedHabitsCount, completedTasksCount } =
    getCompletedGoalsVolumes(
      availableGoals || [],
      historyDate ? Number(historyDate) : undefined,
    );

  const availableHabitsLabel = useMemo(
    () =>
      `${availableHabitsCount} ${declension(availableHabitsCount, [
        "привычка",
        "привычки",
        "привычек",
      ])}`,
    [availableHabitsCount],
  );

  const availableTasksLabel = useMemo(
    () =>
      `${availableTasksCount} ${declension(availableTasksCount, ["задача", "задачи", "задач"])}`,
    [availableTasksCount],
  );

  return {
    availableGoals,
    availableHabitsCount,
    availableTasksCount,
    completedTasksCount,
    completedHabitsCount,
    availableHabitsLabel,
    availableTasksLabel,
  };
};
