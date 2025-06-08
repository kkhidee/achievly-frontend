import { badRequestSchema } from "../badRequestSchema";
import { eventDtoSchema } from "../eventDtoSchema";
import { z } from "zod";

export const getAllEventsQueryParamsSchema = z.object({
  period: z.array(z.string()),
});

export type GetAllEventsQueryParamsSchema = z.infer<
  typeof getAllEventsQueryParamsSchema
>;

export const getAllEvents200Schema = z.array(z.lazy(() => eventDtoSchema));

export type GetAllEvents200Schema = z.infer<typeof getAllEvents200Schema>;

export const getAllEvents400Schema = z.lazy(() => badRequestSchema);

export type GetAllEvents400Schema = z.infer<typeof getAllEvents400Schema>;

export const getAllEventsQueryResponseSchema = z.lazy(
  () => getAllEvents200Schema,
);

export type GetAllEventsQueryResponseSchema = z.infer<
  typeof getAllEventsQueryResponseSchema
>;
