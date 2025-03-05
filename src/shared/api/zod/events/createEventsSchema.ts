import { badRequestSchema } from "../badRequestSchema";
import { createEventDtoSchema } from "../createEventDtoSchema";
import { z } from "zod";

export const createEvents200Schema = z.unknown();

export type CreateEvents200Schema = z.infer<typeof createEvents200Schema>;

export const createEvents400Schema = z.lazy(() => badRequestSchema);

export type CreateEvents400Schema = z.infer<typeof createEvents400Schema>;

export const createEventsMutationRequestSchema = z.array(
  z.lazy(() => createEventDtoSchema),
);

export type CreateEventsMutationRequestSchema = z.infer<
  typeof createEventsMutationRequestSchema
>;

export const createEventsMutationResponseSchema = z.lazy(
  () => createEvents200Schema,
);

export type CreateEventsMutationResponseSchema = z.infer<
  typeof createEventsMutationResponseSchema
>;
