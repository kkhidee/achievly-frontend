import { badRequestSchema } from "../badRequestSchema";
import { goalDtoSchema } from "../goalDtoSchema";
import { z } from "zod";

export const createGoal200Schema = z.unknown();

export type CreateGoal200Schema = z.infer<typeof createGoal200Schema>;

export const createGoal400Schema = z.lazy(() => badRequestSchema);

export type CreateGoal400Schema = z.infer<typeof createGoal400Schema>;

export const createGoalMutationRequestSchema = z.lazy(() => goalDtoSchema);

export type CreateGoalMutationRequestSchema = z.infer<
  typeof createGoalMutationRequestSchema
>;

export const createGoalMutationResponseSchema = z.lazy(
  () => createGoal200Schema,
);

export type CreateGoalMutationResponseSchema = z.infer<
  typeof createGoalMutationResponseSchema
>;
