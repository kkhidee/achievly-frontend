import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  UpdateEventMutationRequest,
  UpdateEventMutationResponse,
  UpdateEventPathParams,
  UpdateEvent400,
} from "../../models/events/UpdateEvent";
import { useMutation } from "@tanstack/react-query";
import { updateEventMutationResponseSchema } from "../../zod/events/updateEventSchema";

export const updateEventMutationKey = () => [{ url: "/events/{id}" }] as const;

export type UpdateEventMutationKey = ReturnType<typeof updateEventMutationKey>;

/**
 * @summary Update event
 * {@link /events/:id}
 */
async function updateEvent(
  {
    id,
    data,
  }: { id: UpdateEventPathParams["id"]; data: UpdateEventMutationRequest },
  config: Partial<RequestConfig<UpdateEventMutationRequest>> = {},
) {
  const res = await client<
    UpdateEventMutationResponse,
    ResponseErrorConfig<UpdateEvent400>,
    UpdateEventMutationRequest
  >({
    method: "PUT",
    url: `/events/${id}`,
    data,
    ...config,
  });
  return updateEventMutationResponseSchema.parse(res.data);
}

/**
 * @summary Update event
 * {@link /events/:id}
 */
export function useUpdateEvent(
  options: {
    mutation?: UseMutationOptions<
      UpdateEventMutationResponse,
      ResponseErrorConfig<UpdateEvent400>,
      { id: UpdateEventPathParams["id"]; data: UpdateEventMutationRequest }
    >;
    client?: Partial<RequestConfig<UpdateEventMutationRequest>>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? updateEventMutationKey();

  return useMutation<
    UpdateEventMutationResponse,
    ResponseErrorConfig<UpdateEvent400>,
    { id: UpdateEventPathParams["id"]; data: UpdateEventMutationRequest }
  >({
    mutationFn: async ({ id, data }) => {
      return updateEvent({ id, data }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
