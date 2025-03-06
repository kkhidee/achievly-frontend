import {
  getAllHistoryQueryKey,
  getGoalQueryKey,
  getGoalsQueryKey,
  GoalDtoStatusEnum,
  useDeleteGoal,
  useGetGoals,
  useUpdateGoal,
} from "@/shared/api";
import { toast } from "@/shared/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useGoalsAchievedQueries = () => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const goalId = searchParams.get("goal-id");

  const { data: goals, isLoading: isGoalsLoading } = useGetGoals({
    params: { status: GoalDtoStatusEnum.achieved },
  });

  const { mutateAsync: updateGoal, isPending: isUpdatePending } = useUpdateGoal(
    {
      mutation: {
        onSuccess: () => {
          toast({ title: "Данные цели обновлены" });
          if (goalId) {
            queryClient
              .invalidateQueries({
                queryKey: getGoalQueryKey({ id: goalId }),
              })
              .then();
          }

          queryClient
            .invalidateQueries({
              queryKey: getGoalsQueryKey({
                status: GoalDtoStatusEnum.achieved,
              }),
            })
            .then();
        },
      },
    },
  );

  const { mutateAsync: deleteGoal, isPending: isDeletePending } = useDeleteGoal(
    {
      mutation: {
        onSuccess: () => {
          toast({ title: "Цель удалена" });
          if (goalId) {
            queryClient
              .invalidateQueries({
                queryKey: getGoalQueryKey({ id: goalId }),
              })
              .then();
          }

          queryClient
            .invalidateQueries({
              queryKey: getGoalsQueryKey({
                status: GoalDtoStatusEnum.achieved,
              }),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getAllHistoryQueryKey(),
            })
            .then();
        },
      },
    },
  );

  return {
    goals,
    isGoalsLoading,
    updateGoal,
    isUpdatePending,
    deleteGoal,
    isDeletePending,
  };
};
