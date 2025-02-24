import { z } from "zod";
import { ZOD_ERROR } from "@/app/constants/core";
import { GoalDtoTypeEnum } from "@/shared/api";

export const goalHeaderFormSchema = z.object({
  title: z.string(ZOD_ERROR),
  type: z.enum([GoalDtoTypeEnum.private, GoalDtoTypeEnum.public]),
  category: z
    .enum(
      [
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
      ],
      ZOD_ERROR,
    )
    .optional(),
  deadlineTimestamp: z.number(ZOD_ERROR).optional(),
});
