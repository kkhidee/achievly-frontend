import { z } from 'zod'

export const statisticsDtoSchema = z.object({
  statistics: z
    .array(
      z.object({
        timestamp: z.number().optional(),
        goalsCompleted: z.number().optional(),
        habitsCompleted: z.number().optional(),
        tasksCompleted: z.number().optional(),
      }),
    )
    .describe('Статистика'),
})

export type StatisticsDtoSchema = z.infer<typeof statisticsDtoSchema>