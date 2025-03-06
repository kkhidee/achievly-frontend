import { badRequestSchema } from "../badRequestSchema";
import { createEventDtoSchema } from "../createEventDtoSchema";
import { z } from "zod";

export const updateEventPathParamsSchema = z.object({
  id: z.string(),
});

export type UpdateEventPathParamsSchema = z.infer<
  typeof updateEventPathParamsSchema
>;

export const updateEvent200Schema = z.unknown();

export type UpdateEvent200Schema = z.infer<typeof updateEvent200Schema>;

export const updateEvent400Schema = z.lazy(() => badRequestSchema);

export type UpdateEvent400Schema = z.infer<typeof updateEvent400Schema>;

export const updateEventMutationRequestSchema = z.lazy(
  () => createEventDtoSchema,
);

export type UpdateEventMutationRequestSchema = z.infer<
  typeof updateEventMutationRequestSchema
>;

export const updateEventMutationResponseSchema = z.lazy(
  () => updateEvent200Schema,
);

export type UpdateEventMutationResponseSchema = z.infer<
  typeof updateEventMutationResponseSchema
>;
