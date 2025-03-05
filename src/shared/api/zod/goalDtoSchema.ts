import { habitEntitySchema } from "./habitEntitySchema";
import { historyEntitySchema } from "./historyEntitySchema";
import { taskEntitySchema } from "./taskEntitySchema";
import { z } from "zod";
import {
  GoalDtoCategoryEnum,
  GoalDtoStatusEnum,
  GoalDtoTypeEnum,
} from "@/shared/api";

export const goalDtoSchema = z.object({
  id: z.number().describe("Goal ID"),
  type: z
    .enum([GoalDtoTypeEnum.private, GoalDtoTypeEnum.public])
    .describe("Тип цели"),
  title: z.string().describe("Наименование цели"),
  status: z
    .enum([GoalDtoStatusEnum.ongoing, GoalDtoStatusEnum.achieved])
    .describe("Статус цели"),
  note: z.string().describe("Примечание к цели").nullable().nullish(),
  category: z
    .enum([
      GoalDtoCategoryEnum.education,
      GoalDtoCategoryEnum.career,
      GoalDtoCategoryEnum.finance,
      GoalDtoCategoryEnum.health,
      GoalDtoCategoryEnum.sports,
      GoalDtoCategoryEnum.relationships,
      GoalDtoCategoryEnum.travel,
      GoalDtoCategoryEnum.creativity,
      GoalDtoCategoryEnum.business,
      GoalDtoCategoryEnum.personalGrowth,
      GoalDtoCategoryEnum.charity,
      GoalDtoCategoryEnum.hobby,
      GoalDtoCategoryEnum.spirituality,
      GoalDtoCategoryEnum.ecology,
      GoalDtoCategoryEnum.socialActivity,
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
  history: z
    .array(z.lazy(() => historyEntitySchema))
    .describe("История цели")
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
});

export type GoalDtoSchema = z.infer<typeof goalDtoSchema>;
