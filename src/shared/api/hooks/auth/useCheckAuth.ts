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
  CheckAuthQueryResponse,
  CheckAuth401,
} from "../../models/auth/CheckAuth";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { checkAuthQueryResponseSchema } from "../../zod/auth/checkAuthSchema";

export const checkAuthQueryKey = () => [{ url: "/auth/check" }] as const;

export type CheckAuthQueryKey = ReturnType<typeof checkAuthQueryKey>;

/**
 * @summary Check auth
 * {@link /auth/check}
 */
async function checkAuth(config: Partial<RequestConfig> = {}) {
  const res = await client<
    CheckAuthQueryResponse,
    ResponseErrorConfig<CheckAuth401>,
    unknown
  >({ method: "GET", url: `/auth/check`, ...config });
  return checkAuthQueryResponseSchema.parse(res.data);
}

export function checkAuthQueryOptions(config: Partial<RequestConfig> = {}) {
  const queryKey = checkAuthQueryKey();
  return queryOptions<
    CheckAuthQueryResponse,
    ResponseErrorConfig<CheckAuth401>,
    CheckAuthQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return checkAuth(config);
    },
  });
}

/**
 * @summary Check auth
 * {@link /auth/check}
 */
export function useCheckAuth<
  TData = CheckAuthQueryResponse,
  TQueryData = CheckAuthQueryResponse,
  TQueryKey extends QueryKey = CheckAuthQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        CheckAuthQueryResponse,
        ResponseErrorConfig<CheckAuth401>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? checkAuthQueryKey();

  const query = useQuery({
    ...(checkAuthQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, ResponseErrorConfig<CheckAuth401>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
