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
  GetAllGoalsQueryResponse,
  GetAllGoalsQueryParams,
  GetAllGoals400,
} from "../../models/goals/GetAllGoals";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllGoalsQueryResponseSchema } from "../../zod/goals/getAllGoalsSchema";

export const getAllGoalsQueryKey = (params: GetAllGoalsQueryParams) =>
  [{ url: "/goals/all" }, ...(params ? [params] : [])] as const;

export type GetAllGoalsQueryKey = ReturnType<typeof getAllGoalsQueryKey>;

/**
 * @summary Get all goals
 * {@link /goals/all}
 */
async function getAllGoals(
  { params }: { params: GetAllGoalsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetAllGoalsQueryResponse,
    ResponseErrorConfig<GetAllGoals400>,
    unknown
  >({ method: "GET", url: `/goals/all`, params, ...config });
  return getAllGoalsQueryResponseSchema.parse(res.data);
}

export function getAllGoalsQueryOptions(
  { params }: { params: GetAllGoalsQueryParams },
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getAllGoalsQueryKey(params);
  return queryOptions<
    GetAllGoalsQueryResponse,
    ResponseErrorConfig<GetAllGoals400>,
    GetAllGoalsQueryResponse,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getAllGoals({ params }, config);
    },
  });
}

/**
 * @summary Get all goals
 * {@link /goals/all}
 */
export function useGetAllGoals<
  TData = GetAllGoalsQueryResponse,
  TQueryData = GetAllGoalsQueryResponse,
  TQueryKey extends QueryKey = GetAllGoalsQueryKey,
>(
  { params }: { params: GetAllGoalsQueryParams },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetAllGoalsQueryResponse,
        ResponseErrorConfig<GetAllGoals400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAllGoalsQueryKey(params);

  const query = useQuery({
    ...(getAllGoalsQueryOptions(
      { params },
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetAllGoals400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
