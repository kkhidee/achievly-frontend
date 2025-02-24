import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  CreateGoalMutationRequest,
  CreateGoalMutationResponse,
  CreateGoal400,
} from "../../models/goals/CreateGoal";
import { useMutation } from "@tanstack/react-query";
import { createGoalMutationResponseSchema } from "../../zod/goals/createGoalSchema";

export const createGoalMutationKey = () => [{ url: "/goals" }] as const;

export type CreateGoalMutationKey = ReturnType<typeof createGoalMutationKey>;

/**
 * @summary Create goal
 * {@link /goals}
 */
async function createGoal(
  { data }: { data: CreateGoalMutationRequest },
  config: Partial<RequestConfig<CreateGoalMutationRequest>> = {},
) {
  const res = await client<
    CreateGoalMutationResponse,
    ResponseErrorConfig<CreateGoal400>,
    CreateGoalMutationRequest
  >({
    method: "POST",
    url: `/goals`,
    data,
    ...config,
  });
  return createGoalMutationResponseSchema.parse(res.data);
}

/**
 * @summary Create goal
 * {@link /goals}
 */
export function useCreateGoal(
  options: {
    mutation?: UseMutationOptions<
      CreateGoalMutationResponse,
      ResponseErrorConfig<CreateGoal400>,
      { data: CreateGoalMutationRequest }
    >;
    client?: Partial<RequestConfig<CreateGoalMutationRequest>>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? createGoalMutationKey();

  return useMutation<
    CreateGoalMutationResponse,
    ResponseErrorConfig<CreateGoal400>,
    { data: CreateGoalMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return createGoal({ data }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
