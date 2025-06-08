import { badRequestSchema } from "../badRequestSchema";
import { goalEntitySchema } from "../goalEntitySchema";
import { z } from "zod";

export const getAllGoalsQueryParamsSchema = z.object({
  status: z.string(),
});

export type GetAllGoalsQueryParamsSchema = z.infer<
  typeof getAllGoalsQueryParamsSchema
>;

export const getAllGoals200Schema = z.array(z.lazy(() => goalEntitySchema));

export type GetAllGoals200Schema = z.infer<typeof getAllGoals200Schema>;

export const getAllGoals400Schema = z.lazy(() => badRequestSchema);

export type GetAllGoals400Schema = z.infer<typeof getAllGoals400Schema>;

export const getAllGoalsQueryResponseSchema = z.lazy(
  () => getAllGoals200Schema,
);

export type GetAllGoalsQueryResponseSchema = z.infer<
  typeof getAllGoalsQueryResponseSchema
>;
