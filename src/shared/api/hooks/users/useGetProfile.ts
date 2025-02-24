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
  GetProfileQueryResponse,
  GetProfile400,
} from "../../models/users/GetProfile";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getProfileQueryResponseSchema } from "../../zod/users/getProfileSchema";

export const getProfileQueryKey = () => [{ url: "/users/profile" }] as const;

export type GetProfileQueryKey = ReturnType<typeof getProfileQueryKey>;

/**
 * @summary Get profile
 * {@link /users/profile}
 */
async function getProfile(config: Partial<RequestConfig> = {}) {
  const res = await client<
    GetProfileQueryResponse,
    ResponseErrorConfig<GetProfile400>,
    unknown
  >({ method: "GET", url: `/users/profile`, ...config });
  return getProfileQueryResponseSchema.parse(res.data);
}

export function getProfileQueryOptions(config: Partial<RequestConfig> = {}) {
  const queryKey = getProfileQueryKey();
  return queryOptions<
    GetProfileQueryResponse,
    ResponseErrorConfig<GetProfile400>,
    GetProfileQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getProfile(config);
    },
  });
}

/**
 * @summary Get profile
 * {@link /users/profile}
 */
export function useGetProfile<
  TData = GetProfileQueryResponse,
  TQueryData = GetProfileQueryResponse,
  TQueryKey extends QueryKey = GetProfileQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetProfileQueryResponse,
        ResponseErrorConfig<GetProfile400>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getProfileQueryKey();

  const query = useQuery({
    ...(getProfileQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetProfile400>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
