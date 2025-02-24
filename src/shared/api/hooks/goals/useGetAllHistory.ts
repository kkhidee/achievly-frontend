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
  GetAllHistoryQueryResponse,
  GetAllHistory400,
} from "../../models/goals/GetAllHistory";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllHistoryQueryResponseSchema } from "../../zod/goals/getAllHistorySchema";

export const getAllHistoryQueryKey = () => [{ url: "/goals/history" }] as const;

export type GetAllHistoryQueryKey = ReturnType<typeof getAllHistoryQueryKey>;

/**
 * @summary Get all history
 * {@link /goals/history}
 */
async function getAllHistory(config: Partial<RequestConfig> = {}) {
  const res = await client<
    GetAllHistoryQueryResponse,
    ResponseErrorConfig<GetAllHistory400>,
    unknown
  >({ method: "GET", url: `/goals/history`, ...config });
  return getAllHistoryQueryResponseSchema.parse(res.data);
}

export function getAllHistoryQueryOptions(config: Partial<RequestConfig> = {}) {
  const queryKey = getAllHistoryQueryKey();
  return queryOptions<
    GetAllHistoryQueryResponse,
    ResponseErrorConfig<GetAllHistory400>,
    GetAllHistoryQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getAllHistory(config);
    },
  });
}

/**
 * @summary Get all history
 * {@link /goals/history}
 */
export function useGetAllHistory<
  TData = GetAllHistoryQueryResponse,
  TQueryData = GetAllHistoryQueryResponse,
  TQueryKey extends QueryKey = GetAllHistoryQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetAllHistoryQueryResponse,
        ResponseErrorConfig<GetAllHistory400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAllHistoryQueryKey();

  const query = useQuery({
    ...(getAllHistoryQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetAllHistory400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
