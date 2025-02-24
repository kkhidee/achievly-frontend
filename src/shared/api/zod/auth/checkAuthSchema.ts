import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const checkAuth200Schema = z.unknown();

export type CheckAuth200Schema = z.infer<typeof checkAuth200Schema>;

export const checkAuth401Schema = z.lazy(() => badRequestSchema);

export type CheckAuth401Schema = z.infer<typeof checkAuth401Schema>;

export const checkAuthQueryResponseSchema = z.lazy(() => checkAuth200Schema);

export type CheckAuthQueryResponseSchema = z.infer<
  typeof checkAuthQueryResponseSchema
>;
