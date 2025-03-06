import { badRequestSchema } from "../badRequestSchema";
import { eventDtoSchema } from "../eventDtoSchema";
import { z } from "zod";

export const getEventsQueryParamsSchema = z.object({
  period: z.array(z.string()),
});

export type GetEventsQueryParamsSchema = z.infer<
  typeof getEventsQueryParamsSchema
>;

export const getEvents200Schema = z.array(z.lazy(() => eventDtoSchema));

export type GetEvents200Schema = z.infer<typeof getEvents200Schema>;

export const getEvents400Schema = z.lazy(() => badRequestSchema);

export type GetEvents400Schema = z.infer<typeof getEvents400Schema>;

export const getEventsQueryResponseSchema = z.lazy(() => getEvents200Schema);

export type GetEventsQueryResponseSchema = z.infer<
  typeof getEventsQueryResponseSchema
>;
