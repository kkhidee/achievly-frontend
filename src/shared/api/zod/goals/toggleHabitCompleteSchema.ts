import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const toggleHabitCompletePathParamsSchema = z.object({
  habitId: z.string(),
  id: z.string(),
});

export type ToggleHabitCompletePathParamsSchema = z.infer<
  typeof toggleHabitCompletePathParamsSchema
>;

export const toggleHabitComplete200Schema = z.unknown();

export type ToggleHabitComplete200Schema = z.infer<
  typeof toggleHabitComplete200Schema
>;

export const toggleHabitComplete400Schema = z.lazy(() => badRequestSchema);

export type ToggleHabitComplete400Schema = z.infer<
  typeof toggleHabitComplete400Schema
>;

export const toggleHabitCompleteMutationResponseSchema = z.lazy(
  () => toggleHabitComplete200Schema,
);

export type ToggleHabitCompleteMutationResponseSchema = z.infer<
  typeof toggleHabitCompleteMutationResponseSchema
>;
