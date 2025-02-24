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
  GetGoalsQueryResponse,
  GetGoalsQueryParams,
  GetGoals400,
} from "../../models/goals/GetGoals";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getGoalsQueryResponseSchema } from "../../zod/goals/getGoalsSchema";

export const getGoalsQueryKey = (params: GetGoalsQueryParams) =>
  [{ url: "/goals" }, ...(params ? [params] : [])] as const;

export type GetGoalsQueryKey = ReturnType<typeof getGoalsQueryKey>;

/**
 * @summary Get goals
 * {@link /goals}
 */
async function getGoals(
  { params }: { params: GetGoalsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetGoalsQueryResponse,
    ResponseErrorConfig<GetGoals400>,
    unknown
  >({ method: "GET", url: `/goals`, params, ...config });
  return getGoalsQueryResponseSchema.parse(res.data);
}

export function getGoalsQueryOptions(
  { params }: { params: GetGoalsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getGoalsQueryKey(params);
  return queryOptions<
    GetGoalsQueryResponse,
    ResponseErrorConfig<GetGoals400>,
    GetGoalsQueryResponse,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getGoals({ params }, config);
    },
  });
}

/**
 * @summary Get goals
 * {@link /goals}
 */
export function useGetGoals<
  TData = GetGoalsQueryResponse,
  TQueryData = GetGoalsQueryResponse,
  TQueryKey extends QueryKey = GetGoalsQueryKey,
>(
  { params }: { params: GetGoalsQueryParams },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetGoalsQueryResponse,
        ResponseErrorConfig<GetGoals400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGoalsQueryKey(params);

  const query = useQuery({
    ...(getGoalsQueryOptions(
      { params },
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetGoals400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
