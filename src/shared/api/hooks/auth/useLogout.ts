import client from "@/shared/api/axios-client";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@/shared/api/axios-client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  LogoutMutationResponse,
  Logout401,
} from "../../models/auth/Logout";
import { useMutation } from "@tanstack/react-query";
import { logoutMutationResponseSchema } from "../../zod/auth/logoutSchema";

export const logoutMutationKey = () => [{ url: "/auth/logout" }] as const;

export type LogoutMutationKey = ReturnType<typeof logoutMutationKey>;

/**
 * @summary Logout
 * {@link /auth/logout}
 */
async function logout(config: Partial<RequestConfig> = {}) {
  const res = await client<
    LogoutMutationResponse,
    ResponseErrorConfig<Logout401>,
    unknown
  >({ method: "POST", url: `/auth/logout`, ...config });
  return logoutMutationResponseSchema.parse(res.data);
}

/**
 * @summary Logout
 * {@link /auth/logout}
 */
export function useLogout(
  options: {
    mutation?: UseMutationOptions<
      LogoutMutationResponse,
      ResponseErrorConfig<Logout401>
    >;
    client?: Partial<RequestConfig>;
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? logoutMutationKey();

  return useMutation<LogoutMutationResponse, ResponseErrorConfig<Logout401>>({
    mutationFn: async () => {
      return logout(config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
