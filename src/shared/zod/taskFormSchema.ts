import { ZOD_ERROR } from "@/app/constants/core";
import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string(ZOD_ERROR).nonempty({ message: ZOD_ERROR.required_error }),
  note: z.string(ZOD_ERROR).optional(),
  deadlineTimestamp: z.number(ZOD_ERROR).optional().nullable(),
});

export type TaskFormSchema = {
  title: string;
  note?: string;
  deadlineTimestamp?: number | null;
};
