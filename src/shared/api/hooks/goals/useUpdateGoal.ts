import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  UpdateGoalMutationRequest,
  UpdateGoalMutationResponse,
  UpdateGoalPathParams,
  UpdateGoal400,
} from "../../models/goals/UpdateGoal";
import { useMutation } from "@tanstack/react-query";
import { updateGoalMutationResponseSchema } from "../../zod/goals/updateGoalSchema";

export const updateGoalMutationKey = () => [{ url: "/goals/{id}" }] as const;

export type UpdateGoalMutationKey = ReturnType<typeof updateGoalMutationKey>;

/**
 * @summary Update goal
 * {@link /goals/:id}
 */
async function updateGoal(
  {
    id,
    data,
  }: { id: UpdateGoalPathParams["id"]; data: UpdateGoalMutationRequest },
  config: Partial<RequestConfig<UpdateGoalMutationRequest>> = {},
) {
  const res = await client<
    UpdateGoalMutationResponse,
    ResponseErrorConfig<UpdateGoal400>,
    UpdateGoalMutationRequest
  >({
    method: "PUT",
    url: `/goals/${id}`,
    data,
    ...config,
  });
  return updateGoalMutationResponseSchema.parse(res.data);
}

/**
 * @summary Update goal
 * {@link /goals/:id}
 */
export function useUpdateGoal(
  options: {
    mutation?: UseMutationOptions<
      UpdateGoalMutationResponse,
      ResponseErrorConfig<UpdateGoal400>,
      { id: UpdateGoalPathParams["id"]; data: UpdateGoalMutationRequest }
    >;
    client?: Partial<RequestConfig<UpdateGoalMutationRequest>>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? updateGoalMutationKey();

  return useMutation<
    UpdateGoalMutationResponse,
    ResponseErrorConfig<UpdateGoal400>,
    { id: UpdateGoalPathParams["id"]; data: UpdateGoalMutationRequest }
  >({
    mutationFn: async ({ id, data }) => {
      return updateGoal({ id, data }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
