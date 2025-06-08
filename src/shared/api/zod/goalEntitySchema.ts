import { habitEntitySchema } from "./habitEntitySchema";
import { historyEntitySchema } from "./historyEntitySchema";
import { taskEntitySchema } from "./taskEntitySchema";
import { z } from "zod";

export const goalEntitySchema = z.object({
  id: z.number().describe("Goal ID"),
  type: z.enum(["public", "private"]).describe("Тип цели"),
  title: z.string().describe("Наименование цели"),
  status: z.enum(["ongoing", "achieved"]).describe("Статус цели"),
  note: z.string().describe("Примечание к цели").nullable().nullish(),
  category: z
    .enum([
      "education",
      "career",
      "finance",
      "health",
      "sports",
      "relationships",
      "travel",
      "creativity",
      "business",
      "personalGrowth",
      "charity",
      "hobby",
      "spirituality",
      "ecology",
      "socialActivity",
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
