import { badRequestSchema } from "../badRequestSchema";
import { goalDtoSchema } from "../goalDtoSchema";
import { z } from "zod";

export const getPublicGoalsQueryParamsSchema = z
  .object({
    category: z.string().optional(),
    search: z.string().optional(),
  })
  .optional();

export type GetPublicGoalsQueryParamsSchema = z.infer<
  typeof getPublicGoalsQueryParamsSchema
>;

export const getPublicGoals200Schema = z.array(z.lazy(() => goalDtoSchema));

export type GetPublicGoals200Schema = z.infer<typeof getPublicGoals200Schema>;

export const getPublicGoals400Schema = z.lazy(() => badRequestSchema);

export type GetPublicGoals400Schema = z.infer<typeof getPublicGoals400Schema>;

export const getPublicGoalsQueryResponseSchema = z.lazy(
  () => getPublicGoals200Schema,
);

export type GetPublicGoalsQueryResponseSchema = z.infer<
  typeof getPublicGoalsQueryResponseSchema
>;
