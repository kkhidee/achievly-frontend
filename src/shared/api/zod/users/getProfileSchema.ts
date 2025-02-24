import { badRequestSchema } from "../badRequestSchema";
import { userDtoSchema } from "../userDtoSchema";
import { z } from "zod";

export const getProfile200Schema = z.lazy(() => userDtoSchema);

export type GetProfile200Schema = z.infer<typeof getProfile200Schema>;

export const getProfile400Schema = z.lazy(() => badRequestSchema);

export type GetProfile400Schema = z.infer<typeof getProfile400Schema>;

export const getProfileQueryResponseSchema = z.lazy(() => getProfile200Schema);

export type GetProfileQueryResponseSchema = z.infer<
  typeof getProfileQueryResponseSchema
>;
