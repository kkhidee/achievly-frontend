import { z } from 'zod'

export const taskEntitySchema = z.object({
  id: z.string().describe('ID задачи'),
  title: z.string().describe('Заголовок задачи'),
  done: z.boolean().default(false).describe('Статус выполнения задачи'),
  note: z.string().describe('Примечание к задаче').nullable().nullish(),
  deadlineTimestamp: z.number().describe('Срок выполнения задачи').nullable().nullish(),
  doneTimestamp: z.number().describe('Дата выполнения задачи').nullable().nullish(),
})

export type TaskEntitySchema = z.infer<typeof taskEntitySchema>