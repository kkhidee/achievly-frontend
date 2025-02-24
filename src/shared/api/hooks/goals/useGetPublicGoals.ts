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
  GetPublicGoalsQueryResponse,
  GetPublicGoalsQueryParams,
  GetPublicGoals400,
} from "../../models/goals/GetPublicGoals";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getPublicGoalsQueryResponseSchema } from "../../zod/goals/getPublicGoalsSchema";

export const getPublicGoalsQueryKey = (params?: GetPublicGoalsQueryParams) =>
  [{ url: "/goals/public" }, ...(params ? [params] : [])] as const;

export type GetPublicGoalsQueryKey = ReturnType<typeof getPublicGoalsQueryKey>;

/**
 * @summary Get public goals
 * {@link /goals/public}
 */
async function getPublicGoals(
  { params }: { params?: GetPublicGoalsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetPublicGoalsQueryResponse,
    ResponseErrorConfig<GetPublicGoals400>,
    unknown
  >({
    method: "GET",
    url: `/goals/public`,
    params,
    ...config,
  });
  return getPublicGoalsQueryResponseSchema.parse(res.data);
}

export function getPublicGoalsQueryOptions(
  { params }: { params?: GetPublicGoalsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getPublicGoalsQueryKey(params);
  return queryOptions<
    GetPublicGoalsQueryResponse,
    ResponseErrorConfig<GetPublicGoals400>,
    GetPublicGoalsQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getPublicGoals({ params }, config);
    },
  });
}

/**
 * @summary Get public goals
 * {@link /goals/public}
 */
export function useGetPublicGoals<
  TData = GetPublicGoalsQueryResponse,
  TQueryData = GetPublicGoalsQueryResponse,
  TQueryKey extends QueryKey = GetPublicGoalsQueryKey,
>(
  { params }: { params?: GetPublicGoalsQueryParams },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetPublicGoalsQueryResponse,
        ResponseErrorConfig<GetPublicGoals400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getPublicGoalsQueryKey(params);

  const query = useQuery({
    ...(getPublicGoalsQueryOptions(
      { params },
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetPublicGoals400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
