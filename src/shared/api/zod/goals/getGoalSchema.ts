import { badRequestSchema } from "../badRequestSchema";
import { goalDtoSchema } from "../goalDtoSchema";
import { z } from "zod";

export const getGoalPathParamsSchema = z.object({
  id: z.string(),
});

export type GetGoalPathParamsSchema = z.infer<typeof getGoalPathParamsSchema>;

export const getGoal200Schema = z.lazy(() => goalDtoSchema);

export type GetGoal200Schema = z.infer<typeof getGoal200Schema>;

export const getGoal400Schema = z.lazy(() => badRequestSchema);

export type GetGoal400Schema = z.infer<typeof getGoal400Schema>;

export const getGoalQueryResponseSchema = z.lazy(() => getGoal200Schema);

export type GetGoalQueryResponseSchema = z.infer<
  typeof getGoalQueryResponseSchema
>;
