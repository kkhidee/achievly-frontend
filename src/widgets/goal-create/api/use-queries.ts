import {
  getAllHistoryQueryKey,
  getGoalsQueryKey,
  GoalDtoStatusEnum,
  useCreateGoal,
} from "@/shared/api";
import { toast } from "@/shared/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useGoalCreateQueries = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createGoal, isPending: isCreatePending } = useCreateGoal(
    {
      mutation: {
        onSuccess: () => {
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
    },
  );

  return { createGoal, isCreatePending };
};
