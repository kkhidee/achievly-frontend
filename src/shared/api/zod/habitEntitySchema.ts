import { z } from 'zod'

export const habitEntitySchema = z.object({
  id: z.string().describe('ID привычки'),
  title: z.string().describe('Заголовок привычки'),
  repeatDays: z.array(z.number()).describe('Дни повторения привычки'),
  doneDays: z.array(z.number()).describe('Дни в которые привычка была выполнена').optional(),
  note: z.string().describe('Примечание к привычке').nullable().nullish(),
})

export type HabitEntitySchema = z.infer<typeof habitEntitySchema>