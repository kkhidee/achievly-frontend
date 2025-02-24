import { ZOD_ERROR } from "@/app/constants/core";
import { z } from "zod";

export const habitFormSchema = z.object({
  title: z.string(ZOD_ERROR).nonempty({ message: ZOD_ERROR.required_error }),
  repeatDays: z
    .array(z.number(ZOD_ERROR), ZOD_ERROR)
    .nonempty({ message: ZOD_ERROR.required_error }),
  note: z.string(ZOD_ERROR).optional(),
});

export type HabitFormSchema = {
  title: string;
  repeatDays: number[];
  note?: string;
};
