import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const deleteEventPathParamsSchema = z.object({
  id: z.string(),
});

export type DeleteEventPathParamsSchema = z.infer<
  typeof deleteEventPathParamsSchema
>;

export const deleteEvent200Schema = z.unknown();

export type DeleteEvent200Schema = z.infer<typeof deleteEvent200Schema>;

export const deleteEvent400Schema = z.lazy(() => badRequestSchema);

export type DeleteEvent400Schema = z.infer<typeof deleteEvent400Schema>;

export const deleteEventMutationResponseSchema = z.lazy(
  () => deleteEvent200Schema,
);

export type DeleteEventMutationResponseSchema = z.infer<
  typeof deleteEventMutationResponseSchema
>;
