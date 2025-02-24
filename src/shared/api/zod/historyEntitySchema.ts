import { historyGoalDtoSchema } from "./historyGoalDtoSchema";
import { z } from "zod";

export const historyEntitySchema = z.object({
  date: z.number().describe("Дата истории цели"),
  goal: z.lazy(() => historyGoalDtoSchema).describe("Цель"),
});

export type HistoryEntitySchema = z.infer<typeof historyEntitySchema>;
