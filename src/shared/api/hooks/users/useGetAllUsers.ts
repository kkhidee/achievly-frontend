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
  GetAllUsersQueryResponse,
  GetAllUsers400,
} from "../../models/users/GetAllUsers";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllUsersQueryResponseSchema } from "../../zod/users/getAllUsersSchema";

export const getAllUsersQueryKey = () => [{ url: "/users/all" }] as const;

export type GetAllUsersQueryKey = ReturnType<typeof getAllUsersQueryKey>;

/**
 * @summary Get profile
 * {@link /users/all}
 */
async function getAllUsers(config: Partial<RequestConfig> = {}) {
  const res = await client<
    GetAllUsersQueryResponse,
    ResponseErrorConfig<GetAllUsers400>,
    unknown
  >({ method: "GET", url: `/users/all`, ...config });
  return getAllUsersQueryResponseSchema.parse(res.data);
}

export function getAllUsersQueryOptions(config: Partial<RequestConfig> = {}) {
  const queryKey = getAllUsersQueryKey();
  return queryOptions<
    GetAllUsersQueryResponse,
    ResponseErrorConfig<GetAllUsers400>,
    GetAllUsersQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getAllUsers(config);
    },
  });
}

/**
 * @summary Get profile
 * {@link /users/all}
 */
export function useGetAllUsers<
  TData = GetAllUsersQueryResponse,
  TQueryData = GetAllUsersQueryResponse,
  TQueryKey extends QueryKey = GetAllUsersQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetAllUsersQueryResponse,
        ResponseErrorConfig<GetAllUsers400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAllUsersQueryKey();

  const query = useQuery({
    ...(getAllUsersQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetAllUsers400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
