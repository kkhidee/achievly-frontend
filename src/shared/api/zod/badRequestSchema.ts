import { z } from 'zod'

export const badRequestSchema = z.object({
  message: z.string().describe('Error message'),
  error: z.string().describe('Error type'),
  statusCode: z.number().describe('Error status code'),
})

export type BadRequestSchema = z.infer<typeof badRequestSchema>