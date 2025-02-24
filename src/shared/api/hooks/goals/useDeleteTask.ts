import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  DeleteTaskMutationResponse,
  DeleteTaskPathParams,
  DeleteTask400,
} from "../../models/goals/DeleteTask";
import { useMutation } from "@tanstack/react-query";
import { deleteTaskMutationResponseSchema } from "../../zod/goals/deleteTaskSchema";

export const deleteTaskMutationKey = () =>
  [{ url: "/goals/{goalId}/task/{taskId}" }] as const;

export type DeleteTaskMutationKey = ReturnType<typeof deleteTaskMutationKey>;

/**
 * @summary Delete task
 * {@link /goals/:goalId/task/:taskId}
 */
async function deleteTask(
  {
    taskId,
    goalId,
  }: {
    taskId: DeleteTaskPathParams["taskId"];
    goalId: DeleteTaskPathParams["goalId"];
  },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    DeleteTaskMutationResponse,
    ResponseErrorConfig<DeleteTask400>,
    unknown
  >({
    method: "DELETE",
    url: `/goals/${goalId}/task/${taskId}`,
    ...config,
  });
  return deleteTaskMutationResponseSchema.parse(res.data);
}

/**
 * @summary Delete task
 * {@link /goals/:goalId/task/:taskId}
 */
export function useDeleteTask(
  options: {
    mutation?: UseMutationOptions<
      DeleteTaskMutationResponse,
      ResponseErrorConfig<DeleteTask400>,
      {
        taskId: DeleteTaskPathParams["taskId"];
        goalId: DeleteTaskPathParams["goalId"];
      }
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? deleteTaskMutationKey();

  return useMutation<
    DeleteTaskMutationResponse,
    ResponseErrorConfig<DeleteTask400>,
    {
      taskId: DeleteTaskPathParams["taskId"];
      goalId: DeleteTaskPathParams["goalId"];
    }
  >({
    mutationFn: async ({ taskId, goalId }) => {
      return deleteTask({ taskId, goalId }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
