import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const toggleTaskCompletePathParamsSchema = z.object({
  taskId: z.string(),
  id: z.string(),
});

export type ToggleTaskCompletePathParamsSchema = z.infer<
  typeof toggleTaskCompletePathParamsSchema
>;

export const toggleTaskComplete200Schema = z.unknown();

export type ToggleTaskComplete200Schema = z.infer<
  typeof toggleTaskComplete200Schema
>;

export const toggleTaskComplete400Schema = z.lazy(() => badRequestSchema);

export type ToggleTaskComplete400Schema = z.infer<
  typeof toggleTaskComplete400Schema
>;

export const toggleTaskCompleteMutationResponseSchema = z.lazy(
  () => toggleTaskComplete200Schema,
);

export type ToggleTaskCompleteMutationResponseSchema = z.infer<
  typeof toggleTaskCompleteMutationResponseSchema
>;
