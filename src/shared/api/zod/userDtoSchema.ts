import { z } from 'zod'

export const userDtoSchema = z.object({
  id: z.number().describe('User ID'),
  email: z.string().describe('Email пользователя'),
  username: z.string().describe('Имя пользователя'),
  picture: z.string().describe('Изображение пользователя'),
})

export type UserDtoSchema = z.infer<typeof userDtoSchema>