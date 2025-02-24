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
  GetStatisticsQueryResponse,
  GetStatisticsQueryParams,
  GetStatistics400,
} from "../../models/goals/GetStatistics";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getStatisticsQueryResponseSchema } from "../../zod/goals/getStatisticsSchema";

export const getStatisticsQueryKey = (params: GetStatisticsQueryParams) =>
  [{ url: "/goals/statistics" }, ...(params ? [params] : [])] as const;

export type GetStatisticsQueryKey = ReturnType<typeof getStatisticsQueryKey>;

/**
 * @summary Get statistics
 * {@link /goals/statistics}
 */
async function getStatistics(
  { params }: { params: GetStatisticsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetStatisticsQueryResponse,
    ResponseErrorConfig<GetStatistics400>,
    unknown
  >({
    method: "GET",
    url: `/goals/statistics`,
    params,
    ...config,
  });
  return getStatisticsQueryResponseSchema.parse(res.data);
}

export function getStatisticsQueryOptions(
  { params }: { params: GetStatisticsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getStatisticsQueryKey(params);
  return queryOptions<
    GetStatisticsQueryResponse,
    ResponseErrorConfig<GetStatistics400>,
    GetStatisticsQueryResponse,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getStatistics({ params }, config);
    },
  });
}

/**
 * @summary Get statistics
 * {@link /goals/statistics}
 */
export function useGetStatistics<
  TData = GetStatisticsQueryResponse,
  TQueryData = GetStatisticsQueryResponse,
  TQueryKey extends QueryKey = GetStatisticsQueryKey,
>(
  { params }: { params: GetStatisticsQueryParams },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetStatisticsQueryResponse,
        ResponseErrorConfig<GetStatistics400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getStatisticsQueryKey(params);

  const query = useQuery({
    ...(getStatisticsQueryOptions(
      { params },
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetStatistics400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
