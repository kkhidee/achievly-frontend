import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  DeleteEventMutationResponse,
  DeleteEventPathParams,
  DeleteEvent400,
} from "../../models/events/DeleteEvent";
import { useMutation } from "@tanstack/react-query";
import { deleteEventMutationResponseSchema } from "../../zod/events/deleteEventSchema";

export const deleteEventMutationKey = () => [{ url: "/events/{id}" }] as const;

export type DeleteEventMutationKey = ReturnType<typeof deleteEventMutationKey>;

/**
 * @summary Delete event
 * {@link /events/:id}
 */
async function deleteEvent(
  { id }: { id: DeleteEventPathParams["id"] },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    DeleteEventMutationResponse,
    ResponseErrorConfig<DeleteEvent400>,
    unknown
  >({ method: "DELETE", url: `/events/${id}`, ...config });
  return deleteEventMutationResponseSchema.parse(res.data);
}

/**
 * @summary Delete event
 * {@link /events/:id}
 */
export function useDeleteEvent(
  options: {
    mutation?: UseMutationOptions<
      DeleteEventMutationResponse,
      ResponseErrorConfig<DeleteEvent400>,
      { id: DeleteEventPathParams["id"] }
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? deleteEventMutationKey();

  return useMutation<
    DeleteEventMutationResponse,
    ResponseErrorConfig<DeleteEvent400>,
    { id: DeleteEventPathParams["id"] }
  >({
    mutationFn: async ({ id }) => {
      return deleteEvent({ id }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
