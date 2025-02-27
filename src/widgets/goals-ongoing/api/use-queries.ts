import {
  getAllHistoryQueryKey,
  getGoalQueryKey,
  getGoalsQueryKey,
  getPublicGoalsQueryKey,
  GoalDtoCategoryEnum,
  GoalDtoStatusEnum,
  useAchieveGoal,
  useDeleteGoal,
  useGetGoals,
  useUpdateGoal,
} from "@/shared/api";
import { toast } from "@/shared/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useGoalsOngoingQueries = () => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const { data: goals, isLoading: isGoalsLoading } = useGetGoals({
    params: { status: GoalDtoStatusEnum.ongoing },
  });

  const goalId = searchParams.get("goal-id");

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
                status: GoalDtoStatusEnum.ongoing,
              }),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getAllHistoryQueryKey(),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getPublicGoalsQueryKey({
                category: GoalDtoCategoryEnum.education,
              }),
            })
            .then();
        },
      },
    },
  );

  const { mutateAsync: achieveGoal, isPending: isAchievePending } =
    useAchieveGoal({
      mutation: {
        onSuccess: () => {
          toast({ title: "Цель завершена" });

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
                status: GoalDtoStatusEnum.ongoing,
              }),
            })
            .then();

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
    });

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
                status: GoalDtoStatusEnum.ongoing,
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
    achieveGoal,
    isAchievePending,
    deleteGoal,
    isDeletePending,
  };
};
