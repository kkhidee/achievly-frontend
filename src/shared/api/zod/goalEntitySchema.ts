import { habitEntitySchema } from "./habitEntitySchema";
import { historyEntitySchema } from "./historyEntitySchema";
import { taskEntitySchema } from "./taskEntitySchema";
import { z } from "zod";
import {
  GoalEntityCategoryEnum,
  GoalEntityStatusEnum,
  GoalEntityTypeEnum,
} from "../models/GoalEntity";

export const goalEntitySchema = z.object({
  id: z.number().describe("Goal ID"),
  type: z
    .enum([GoalEntityTypeEnum.public, GoalEntityTypeEnum.private])
    .describe("Тип цели"),
  title: z.string().describe("Наименование цели"),
  status: z
    .enum([GoalEntityStatusEnum.ongoing, GoalEntityStatusEnum.achieved])
    .describe("Статус цели"),
  note: z.string().describe("Примечание к цели").nullable().nullish(),
  category: z
    .enum([
      GoalEntityCategoryEnum.education,
      GoalEntityCategoryEnum.career,
      GoalEntityCategoryEnum.finance,
      GoalEntityCategoryEnum.health,
      GoalEntityCategoryEnum.sports,
      GoalEntityCategoryEnum.relationships,
      GoalEntityCategoryEnum.travel,
      GoalEntityCategoryEnum.creativity,
      GoalEntityCategoryEnum.business,
      GoalEntityCategoryEnum.personalGrowth,
      GoalEntityCategoryEnum.charity,
      GoalEntityCategoryEnum.hobby,
      GoalEntityCategoryEnum.spirituality,
      GoalEntityCategoryEnum.ecology,
      GoalEntityCategoryEnum.socialActivity,
    ])
    .describe("Категория цели")
    .nullable()
    .nullish(),
  tasks: z
    .array(z.lazy(() => taskEntitySchema))
    .describe("Задачи")
    .nullable()
    .nullish(),
  habits: z
    .array(z.lazy(() => habitEntitySchema))
    .describe("Привычки")
    .nullable()
    .nullish(),
  achievedTimestamp: z
    .number()
    .describe("Время завершения цели")
    .nullable()
    .nullish(),
  deadlineTimestamp: z
    .number()
    .describe("Время дедлайна цели")
    .nullable()
    .nullish(),
  history: z
    .array(z.lazy(() => historyEntitySchema))
    .describe("История цели")
    .nullable()
    .nullish(),
});

export type GoalEntitySchema = z.infer<typeof goalEntitySchema>;
