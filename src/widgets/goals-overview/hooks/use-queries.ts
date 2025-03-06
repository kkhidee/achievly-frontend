import { GoalDtoStatusEnum, useGetAllHistory, useGetGoals } from "@/shared/api";

export const useGoalsOverviewQueries = () => {
  const { data: goals, isLoading: isGoalsLoading } = useGetGoals({
    params: { status: GoalDtoStatusEnum.ongoing },
  });

  const { data: history } = useGetAllHistory();

  return { goals, history, isGoalsLoading };
};
