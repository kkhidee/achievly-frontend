import { badRequestSchema } from "../badRequestSchema";
import { goalDtoSchema } from "../goalDtoSchema";
import { z } from "zod";

export const getGoalsQueryParamsSchema = z.object({
  status: z.string(),
});

export type GetGoalsQueryParamsSchema = z.infer<
  typeof getGoalsQueryParamsSchema
>;

export const getGoals200Schema = z.array(z.lazy(() => goalDtoSchema));

export type GetGoals200Schema = z.infer<typeof getGoals200Schema>;

export const getGoals400Schema = z.lazy(() => badRequestSchema);

export type GetGoals400Schema = z.infer<typeof getGoals400Schema>;

export const getGoalsQueryResponseSchema = z.lazy(() => getGoals200Schema);

export type GetGoalsQueryResponseSchema = z.infer<
  typeof getGoalsQueryResponseSchema
>;
