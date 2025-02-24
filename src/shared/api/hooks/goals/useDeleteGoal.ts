import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  DeleteGoalMutationResponse,
  DeleteGoalPathParams,
  DeleteGoal400,
} from "../../models/goals/DeleteGoal";
import { useMutation } from "@tanstack/react-query";
import { deleteGoalMutationResponseSchema } from "../../zod/goals/deleteGoalSchema";

export const deleteGoalMutationKey = () => [{ url: "/goals/{id}" }] as const;

export type DeleteGoalMutationKey = ReturnType<typeof deleteGoalMutationKey>;

/**
 * @summary Delete goal
 * {@link /goals/:id}
 */
async function deleteGoal(
  { id }: { id: DeleteGoalPathParams["id"] },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    DeleteGoalMutationResponse,
    ResponseErrorConfig<DeleteGoal400>,
    unknown
  >({ method: "DELETE", url: `/goals/${id}`, ...config });
  return deleteGoalMutationResponseSchema.parse(res.data);
}

/**
 * @summary Delete goal
 * {@link /goals/:id}
 */
export function useDeleteGoal(
  options: {
    mutation?: UseMutationOptions<
      DeleteGoalMutationResponse,
      ResponseErrorConfig<DeleteGoal400>,
      { id: DeleteGoalPathParams["id"] }
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? deleteGoalMutationKey();

  return useMutation<
    DeleteGoalMutationResponse,
    ResponseErrorConfig<DeleteGoal400>,
    { id: DeleteGoalPathParams["id"] }
  >({
    mutationFn: async ({ id }) => {
      return deleteGoal({ id }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
