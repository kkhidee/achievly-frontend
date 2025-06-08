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
  GetAllEventsQueryResponse,
  GetAllEventsQueryParams,
  GetAllEvents400,
} from "../../models/events/GetAllEvents";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllEventsQueryResponseSchema } from "../../zod/events/getAllEventsSchema";

export const getAllEventsQueryKey = (params: GetAllEventsQueryParams) =>
  [{ url: "/events/all" }, ...(params ? [params] : [])] as const;

export type GetAllEventsQueryKey = ReturnType<typeof getAllEventsQueryKey>;

/**
 * @summary Get all events
 * {@link /events/all}
 */
async function getAllEvents(
  { params }: { params: GetAllEventsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetAllEventsQueryResponse,
    ResponseErrorConfig<GetAllEvents400>,
    unknown
  >({ method: "GET", url: `/events/all`, params, ...config });
  return getAllEventsQueryResponseSchema.parse(res.data);
}

export function getAllEventsQueryOptions(
  { params }: { params: GetAllEventsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getAllEventsQueryKey(params);
  return queryOptions<
    GetAllEventsQueryResponse,
    ResponseErrorConfig<GetAllEvents400>,
    GetAllEventsQueryResponse,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getAllEvents({ params }, config);
    },
  });
}

/**
 * @summary Get all events
 * {@link /events/all}
 */
export function useGetAllEvents<
  TData = GetAllEventsQueryResponse,
  TQueryData = GetAllEventsQueryResponse,
  TQueryKey extends QueryKey = GetAllEventsQueryKey,
>(
  { params }: { params: GetAllEventsQueryParams },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetAllEventsQueryResponse,
        ResponseErrorConfig<GetAllEvents400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAllEventsQueryKey(params);

  const query = useQuery({
    ...(getAllEventsQueryOptions(
      { params },
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetAllEvents400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
