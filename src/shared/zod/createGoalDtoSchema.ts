import { z } from "zod";
import { habitEntitySchema, taskEntitySchema } from "@/shared/api";

export const createGoalDtoSchema = z.object({
  title: z.string().describe("Наименование цели"),
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
  deadlineTimestamp: z
    .number()
    .describe("Время дедлайна цели")
    .nullable()
    .nullish(),
});
