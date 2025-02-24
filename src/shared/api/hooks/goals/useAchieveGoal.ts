import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  AchieveGoalMutationResponse,
  AchieveGoalPathParams,
  AchieveGoal400,
} from "../../models/goals/AchieveGoal";
import { useMutation } from "@tanstack/react-query";
import { achieveGoalMutationResponseSchema } from "../../zod/goals/achieveGoalSchema";

export const achieveGoalMutationKey = () => [{ url: "/goals/{id}" }] as const;

export type AchieveGoalMutationKey = ReturnType<typeof achieveGoalMutationKey>;

/**
 * @summary Achieve goal
 * {@link /goals/:id}
 */
async function achieveGoal(
  { id }: { id: AchieveGoalPathParams["id"] },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    AchieveGoalMutationResponse,
    ResponseErrorConfig<AchieveGoal400>,
    unknown
  >({ method: "PATCH", url: `/goals/${id}`, ...config });
  return achieveGoalMutationResponseSchema.parse(res.data);
}

/**
 * @summary Achieve goal
 * {@link /goals/:id}
 */
export function useAchieveGoal(
  options: {
    mutation?: UseMutationOptions<
      AchieveGoalMutationResponse,
      ResponseErrorConfig<AchieveGoal400>,
      { id: AchieveGoalPathParams["id"] }
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? achieveGoalMutationKey();

  return useMutation<
    AchieveGoalMutationResponse,
    ResponseErrorConfig<AchieveGoal400>,
    { id: AchieveGoalPathParams["id"] }
  >({
    mutationFn: async ({ id }) => {
      return achieveGoal({ id }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
