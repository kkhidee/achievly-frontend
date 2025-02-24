import { habitEntitySchema } from "./habitEntitySchema";
import { taskEntitySchema } from "./taskEntitySchema";
import { z } from "zod";

export const historyGoalDtoSchema = z.object({
  id: z.number().describe("ID цели"),
  title: z.string().describe("Заголовок"),
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
});

export type HistoryGoalDtoSchema = z.infer<typeof historyGoalDtoSchema>;
