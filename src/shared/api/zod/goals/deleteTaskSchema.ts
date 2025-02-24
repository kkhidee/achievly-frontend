import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const deleteTaskPathParamsSchema = z.object({
  taskId: z.string(),
  goalId: z.string(),
});

export type DeleteTaskPathParamsSchema = z.infer<
  typeof deleteTaskPathParamsSchema
>;

export const deleteTask200Schema = z.unknown();

export type DeleteTask200Schema = z.infer<typeof deleteTask200Schema>;

export const deleteTask400Schema = z.lazy(() => badRequestSchema);

export type DeleteTask400Schema = z.infer<typeof deleteTask400Schema>;

export const deleteTaskMutationResponseSchema = z.lazy(
  () => deleteTask200Schema,
);

export type DeleteTaskMutationResponseSchema = z.infer<
  typeof deleteTaskMutationResponseSchema
>;
