import { badRequestSchema } from "../badRequestSchema";
import { goalDtoSchema } from "../goalDtoSchema";
import { z } from "zod";

export const updateGoalPathParamsSchema = z.object({
  id: z.string(),
});

export type UpdateGoalPathParamsSchema = z.infer<
  typeof updateGoalPathParamsSchema
>;

export const updateGoal200Schema = z.unknown();

export type UpdateGoal200Schema = z.infer<typeof updateGoal200Schema>;

export const updateGoal400Schema = z.lazy(() => badRequestSchema);

export type UpdateGoal400Schema = z.infer<typeof updateGoal400Schema>;

export const updateGoalMutationRequestSchema = z.lazy(() => goalDtoSchema);

export type UpdateGoalMutationRequestSchema = z.infer<
  typeof updateGoalMutationRequestSchema
>;

export const updateGoalMutationResponseSchema = z.lazy(
  () => updateGoal200Schema,
);

export type UpdateGoalMutationResponseSchema = z.infer<
  typeof updateGoalMutationResponseSchema
>;
