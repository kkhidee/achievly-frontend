import { historyGoalDtoSchema } from "./historyGoalDtoSchema";
import { z } from "zod";

export const allHistoryDtoSchema = z.object({
  history: z
    .object({})
    .catchall(z.array(z.lazy(() => historyGoalDtoSchema)))
    .describe("Полная история"),
});

export type AllHistoryDtoSchema = z.infer<typeof allHistoryDtoSchema>;
