import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  ToggleTaskCompleteMutationResponse,
  ToggleTaskCompletePathParams,
  ToggleTaskComplete400,
} from "../../models/goals/ToggleTaskComplete";
import { useMutation } from "@tanstack/react-query";
import { toggleTaskCompleteMutationResponseSchema } from "../../zod/goals/toggleTaskCompleteSchema";

export const toggleTaskCompleteMutationKey = () =>
  [{ url: "/goals/{id}/task/{taskId}" }] as const;

export type ToggleTaskCompleteMutationKey = ReturnType<
  typeof toggleTaskCompleteMutationKey
>;

/**
 * @summary Toggle task complete
 * {@link /goals/:id/task/:taskId}
 */
async function toggleTaskComplete(
  {
    taskId,
    id,
  }: {
    taskId: ToggleTaskCompletePathParams["taskId"];
    id: ToggleTaskCompletePathParams["id"];
  },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    ToggleTaskCompleteMutationResponse,
    ResponseErrorConfig<ToggleTaskComplete400>,
    unknown
  >({
    method: "PATCH",
    url: `/goals/${id}/task/${taskId}`,
    ...config,
  });
  return toggleTaskCompleteMutationResponseSchema.parse(res.data);
}

/**
 * @summary Toggle task complete
 * {@link /goals/:id/task/:taskId}
 */
export function useToggleTaskComplete(
  options: {
    mutation?: UseMutationOptions<
      ToggleTaskCompleteMutationResponse,
      ResponseErrorConfig<ToggleTaskComplete400>,
      {
        taskId: ToggleTaskCompletePathParams["taskId"];
        id: ToggleTaskCompletePathParams["id"];
      }
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? toggleTaskCompleteMutationKey();

  return useMutation<
    ToggleTaskCompleteMutationResponse,
    ResponseErrorConfig<ToggleTaskComplete400>,
    {
      taskId: ToggleTaskCompletePathParams["taskId"];
      id: ToggleTaskCompletePathParams["id"];
    }
  >({
    mutationFn: async ({ taskId, id }) => {
      return toggleTaskComplete({ taskId, id }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
