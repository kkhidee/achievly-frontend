import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  DeleteHabitMutationResponse,
  DeleteHabitPathParams,
  DeleteHabit400,
} from "../../models/goals/DeleteHabit";
import { useMutation } from "@tanstack/react-query";
import { deleteHabitMutationResponseSchema } from "../../zod/goals/deleteHabitSchema";

export const deleteHabitMutationKey = () =>
  [{ url: "/goals/{goalId}/habit/{habitId}" }] as const;

export type DeleteHabitMutationKey = ReturnType<typeof deleteHabitMutationKey>;

/**
 * @summary Delete habit
 * {@link /goals/:goalId/habit/:habitId}
 */
async function deleteHabit(
  {
    habitId,
    goalId,
  }: {
    habitId: DeleteHabitPathParams["habitId"];
    goalId: DeleteHabitPathParams["goalId"];
  },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    DeleteHabitMutationResponse,
    ResponseErrorConfig<DeleteHabit400>,
    unknown
  >({
    method: "DELETE",
    url: `/goals/${goalId}/habit/${habitId}`,
    ...config,
  });
  return deleteHabitMutationResponseSchema.parse(res.data);
}

/**
 * @summary Delete habit
 * {@link /goals/:goalId/habit/:habitId}
 */
export function useDeleteHabit(
  options: {
    mutation?: UseMutationOptions<
      DeleteHabitMutationResponse,
      ResponseErrorConfig<DeleteHabit400>,
      {
        habitId: DeleteHabitPathParams["habitId"];
        goalId: DeleteHabitPathParams["goalId"];
      }
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? deleteHabitMutationKey();

  return useMutation<
    DeleteHabitMutationResponse,
    ResponseErrorConfig<DeleteHabit400>,
    {
      habitId: DeleteHabitPathParams["habitId"];
      goalId: DeleteHabitPathParams["goalId"];
    }
  >({
    mutationFn: async ({ habitId, goalId }) => {
      return deleteHabit({ habitId, goalId }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
