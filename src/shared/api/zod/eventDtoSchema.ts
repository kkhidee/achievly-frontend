import { z } from "zod";

export const eventDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  start: z.string(),
  end: z.string(),
});

export type EventDtoSchema = z.infer<typeof eventDtoSchema>;
