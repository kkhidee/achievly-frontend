import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type {
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type {
  GetEventsQueryResponse,
  GetEventsQueryParams,
  GetEvents400,
} from "../../models/events/GetEvents";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getEventsQueryResponseSchema } from "../../zod/events/getEventsSchema";

export const getEventsQueryKey = (params: GetEventsQueryParams) =>
  [{ url: "/events" }, ...(params ? [params] : [])] as const;

export type GetEventsQueryKey = ReturnType<typeof getEventsQueryKey>;

/**
 * @summary Get events
 * {@link /events}
 */
async function getEvents(
  { params }: { params: GetEventsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetEventsQueryResponse,
    ResponseErrorConfig<GetEvents400>,
    unknown
  >({ method: "GET", url: `/events`, params, ...config });
  return getEventsQueryResponseSchema.parse(res.data);
}

export function getEventsQueryOptions(
  { params }: { params: GetEventsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getEventsQueryKey(params);
  return queryOptions<
    GetEventsQueryResponse,
    ResponseErrorConfig<GetEvents400>,
    GetEventsQueryResponse,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getEvents({ params }, config);
    },
  });
}

/**
 * @summary Get events
 * {@link /events}
 */
export function useGetEvents<
  TData = GetEventsQueryResponse,
  TQueryData = GetEventsQueryResponse,
  TQueryKey extends QueryKey = GetEventsQueryKey,
>(
  { params }: { params: GetEventsQueryParams },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetEventsQueryResponse,
        ResponseErrorConfig<GetEvents400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getEventsQueryKey(params);

  const query = useQuery({
    ...(getEventsQueryOptions(
      { params },
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetEvents400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
