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
  GetGoalQueryResponse,
  GetGoalPathParams,
  GetGoal400,
} from "../../models/goals/GetGoal";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getGoalQueryResponseSchema } from "../../zod/goals/getGoalSchema";

export const getGoalQueryKey = ({ id }: { id: GetGoalPathParams["id"] }) =>
  [{ url: "/goals/:id", params: { id: id } }] as const;

export type GetGoalQueryKey = ReturnType<typeof getGoalQueryKey>;

/**
 * @summary Get goal
 * {@link /goals/:id}
 */
async function getGoal(
  { id }: { id: GetGoalPathParams["id"] },
  config: Partial<RequestConfig> = {},
) {
  const res = await client<
    GetGoalQueryResponse,
    ResponseErrorConfig<GetGoal400>,
    unknown
  >({ method: "GET", url: `/goals/${id}`, ...config });
  return getGoalQueryResponseSchema.parse(res.data);
}

export function getGoalQueryOptions(
  { id }: { id: GetGoalPathParams["id"] },
  config: Partial<RequestConfig> = {},
) {
  const queryKey = getGoalQueryKey({ id });
  return queryOptions<
    GetGoalQueryResponse,
    ResponseErrorConfig<GetGoal400>,
    GetGoalQueryResponse,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getGoal({ id }, config);
    },
  });
}

/**
 * @summary Get goal
 * {@link /goals/:id}
 */
export function useGetGoal<
  TData = GetGoalQueryResponse,
  TQueryData = GetGoalQueryResponse,
  TQueryKey extends QueryKey = GetGoalQueryKey,
>(
  { id }: { id: GetGoalPathParams["id"] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetGoalQueryResponse,
        ResponseErrorConfig<GetGoal400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGoalQueryKey({ id });

  const query = useQuery({
    ...(getGoalQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetGoal400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
