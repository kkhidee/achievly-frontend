import { z } from 'zod'

export const createEventDtoSchema = z.object({
  title: z.string(),
  start: z.number(),
  end: z.number(),
})

export type CreateEventDtoSchema = z.infer<typeof createEventDtoSchema>