import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const logout200Schema = z.unknown();

export type Logout200Schema = z.infer<typeof logout200Schema>;

export const logout401Schema = z.lazy(() => badRequestSchema);

export type Logout401Schema = z.infer<typeof logout401Schema>;

export const logoutMutationResponseSchema = z.lazy(() => logout200Schema);

export type LogoutMutationResponseSchema = z.infer<
  typeof logoutMutationResponseSchema
>;
