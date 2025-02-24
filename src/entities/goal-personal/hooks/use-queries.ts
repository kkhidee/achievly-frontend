import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  getAllHistoryQueryKey,
  getGoalQueryKey,
  getGoalsQueryKey,
  GoalDtoStatusEnum,
  useAchieveGoal,
  useCreateGoal,
  useDeleteGoal,
  useGetGoal,
  useUpdateGoal,
} from "@/shared/api";
import { toast } from "@/shared/hooks/use-toast";

export const useGoalPersonalQueries = () => {
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data: goal, isLoading: isGoalLoading } = useGetGoal(
    { id: id as string },
    { query: { enabled: !!id } },
  );

  const { mutate: createGoal, isPending: isCreatePending } = useCreateGoal({
    mutation: {
      onSuccess: () => {
        navigate(-1);
        toast({ title: "Цель создана" });
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
  });

  const { mutateAsync: updateGoal, isPending: isUpdatePending } = useUpdateGoal(
    {
      mutation: {
        onSuccess: () => {
          toast({ title: "Данные цели обновлены" });
          if (id) {
            queryClient
              .invalidateQueries({
                queryKey: getGoalQueryKey({ id }),
              })
              .then();

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
          }
        },
      },
    },
  );

  const { mutate: achieveGoal, isPending: isAchievePending } = useAchieveGoal({
    mutation: {
      onSuccess: () => {
        toast({ title: "Цель завершена" });
        if (id) {
          queryClient
            .invalidateQueries({
              queryKey: getGoalQueryKey({ id }),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getGoalsQueryKey({ status: GoalDtoStatusEnum.ongoing }),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getGoalsQueryKey({
                status: GoalDtoStatusEnum.achieved,
              }),
            })
            .then();
        }
      },
    },
  });

  const { mutate: deleteGoal, isPending: isDeletePending } = useDeleteGoal({
    mutation: {
      onSuccess: () => {
        navigate(-1);
        toast({ title: "Цель удалена" });
        if (id) {
          queryClient
            .invalidateQueries({
              queryKey: getGoalQueryKey({ id }),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getGoalsQueryKey({ status: GoalDtoStatusEnum.ongoing }),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getGoalsQueryKey({
                status: GoalDtoStatusEnum.achieved,
              }),
            })
            .then();
        }
      },
    },
  });

  return {
    goal,
    createGoal,
    updateGoal,
    achieveGoal,
    deleteGoal,
    isGoalLoading,
    isCreatePending,
    isUpdatePending,
    isAchievePending,
    isDeletePending,
  };
};
