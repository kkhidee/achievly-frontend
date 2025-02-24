import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const deleteHabitPathParamsSchema = z.object({
  habitId: z.string(),
  goalId: z.string(),
});

export type DeleteHabitPathParamsSchema = z.infer<
  typeof deleteHabitPathParamsSchema
>;

export const deleteHabit200Schema = z.unknown();

export type DeleteHabit200Schema = z.infer<typeof deleteHabit200Schema>;

export const deleteHabit400Schema = z.lazy(() => badRequestSchema);

export type DeleteHabit400Schema = z.infer<typeof deleteHabit400Schema>;

export const deleteHabitMutationResponseSchema = z.lazy(
  () => deleteHabit200Schema,
);

export type DeleteHabitMutationResponseSchema = z.infer<
  typeof deleteHabitMutationResponseSchema
>;
