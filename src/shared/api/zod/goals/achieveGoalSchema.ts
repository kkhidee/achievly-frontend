import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const achieveGoalPathParamsSchema = z.object({
  id: z.string(),
});

export type AchieveGoalPathParamsSchema = z.infer<
  typeof achieveGoalPathParamsSchema
>;

export const achieveGoal200Schema = z.unknown();

export type AchieveGoal200Schema = z.infer<typeof achieveGoal200Schema>;

export const achieveGoal400Schema = z.lazy(() => badRequestSchema);

export type AchieveGoal400Schema = z.infer<typeof achieveGoal400Schema>;

export const achieveGoalMutationResponseSchema = z.lazy(
  () => achieveGoal200Schema,
);

export type AchieveGoalMutationResponseSchema = z.infer<
  typeof achieveGoalMutationResponseSchema
>;
