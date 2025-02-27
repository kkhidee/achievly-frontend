import { useMemo } from "react";
import {
  declension,
  getAvailableGoalsVolumes,
  getAvailableHabits,
  getAvailableTasks,
  getCompletedGoalsVolumes,
} from "@/app/lib/utils";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { useGoalsOverviewQueries } from "@/widgets/goals-overview/hooks/use-queries";

export const useGoalsOverviewData = () => {
  const [searchParams] = useSearchParams();

  const historyDate = searchParams.get("history-date");

  const { goals, history } = useGoalsOverviewQueries();

  const currentGoals = historyDate ? history?.history?.[historyDate] : goals;

  const availableGoals = useMemo(() => {
    return (currentGoals || []).map((goal) => ({
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
  }, [currentGoals, historyDate]);

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
