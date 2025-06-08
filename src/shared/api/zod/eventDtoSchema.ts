import { z } from 'zod'

export const eventDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  start: z.number(),
  end: z.number(),
})

export type EventDtoSchema = z.infer<typeof eventDtoSchema>