import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const deleteGoalPathParamsSchema = z.object({
  id: z.string(),
});

export type DeleteGoalPathParamsSchema = z.infer<
  typeof deleteGoalPathParamsSchema
>;

export const deleteGoal200Schema = z.unknown();

export type DeleteGoal200Schema = z.infer<typeof deleteGoal200Schema>;

export const deleteGoal400Schema = z.lazy(() => badRequestSchema);

export type DeleteGoal400Schema = z.infer<typeof deleteGoal400Schema>;

export const deleteGoalMutationResponseSchema = z.lazy(
  () => deleteGoal200Schema,
);

export type DeleteGoalMutationResponseSchema = z.infer<
  typeof deleteGoalMutationResponseSchema
>;
