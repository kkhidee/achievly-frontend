import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  CreateEventsMutationRequest,
  CreateEventsMutationResponse,
  CreateEvents400,
} from "../../models/events/CreateEvents";
import { useMutation } from "@tanstack/react-query";
import { createEventsMutationResponseSchema } from "../../zod/events/createEventsSchema";

export const createEventsMutationKey = () => [{ url: "/events" }] as const;

export type CreateEventsMutationKey = ReturnType<
  typeof createEventsMutationKey
>;

/**
 * @summary Create events
 * {@link /events}
 */
async function createEvents(
  { data }: { data?: CreateEventsMutationRequest },
  config: Partial<RequestConfig<CreateEventsMutationRequest>> = {},
) {
  const res = await client<
    CreateEventsMutationResponse,
    ResponseErrorConfig<CreateEvents400>,
    CreateEventsMutationRequest
  >({
    method: "POST",
    url: `/events`,
    data,
    ...config,
  });
  return createEventsMutationResponseSchema.parse(res.data);
}

/**
 * @summary Create events
 * {@link /events}
 */
export function useCreateEvents(
  options: {
    mutation?: UseMutationOptions<
      CreateEventsMutationResponse,
      ResponseErrorConfig<CreateEvents400>,
      { data?: CreateEventsMutationRequest }
    >;
    client?: Partial<RequestConfig<CreateEventsMutationRequest>>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? createEventsMutationKey();

  return useMutation<
    CreateEventsMutationResponse,
    ResponseErrorConfig<CreateEvents400>,
    { data?: CreateEventsMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return createEvents({ data }, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
