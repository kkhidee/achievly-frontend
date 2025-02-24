import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  ToggleHabitCompleteMutationResponse,
  ToggleHabitCompletePathParams,
  ToggleHabitComplete400,
} from "../../models/goals/ToggleHabitComplete";
import { useMutation } from "@tanstack/react-query";
import { toggleHabitCompleteMutationResponseSchema } from "../../zod/goals/toggleHabitCompleteSchema";

export const toggleHabitCompleteMutationKey = () =>
  [{ url: "/goals/{id}/habit/{habitId}" }] as const;

export type ToggleHabitCompleteMutationKey = ReturnType<
  typeof toggleHabitCompleteMutationKey
>;

/**
 * @summary Toggle habit complete
 * {@link /goals/:id/habit/:habitId}
 */
async function toggleHabitComplete(
  {
    habitId,
    id,
  }: {
    habitId: ToggleHabitCompletePathParams["habitId"];
    id: ToggleHabitCompletePathParams["id"];
  },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    ToggleHabitCompleteMutationResponse,
    ResponseErrorConfig<ToggleHabitComplete400>,
    unknown
  >({
    method: "PATCH",
    url: `/goals/${id}/habit/${habitId}`,
    ...config,
  });
  return toggleHabitCompleteMutationResponseSchema.parse(res.data);
}

/**
 * @summary Toggle habit complete
 * {@link /goals/:id/habit/:habitId}
 */
export function useToggleHabitComplete(
  options: {
    mutation?: UseMutationOptions<
      ToggleHabitCompleteMutationResponse,
      ResponseErrorConfig<ToggleHabitComplete400>,
      {
        habitId: ToggleHabitCompletePathParams["habitId"];
        id: ToggleHabitCompletePathParams["id"];
      }
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? toggleHabitCompleteMutationKey();

  return useMutation<
    ToggleHabitCompleteMutationResponse,
    ResponseErrorConfig<ToggleHabitComplete400>,
    {
      habitId: ToggleHabitCompletePathParams["habitId"];
      id: ToggleHabitCompletePathParams["id"];
    }
  >({
    mutationFn: async ({ habitId, id }) => {
      return toggleHabitComplete({ habitId, id }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
