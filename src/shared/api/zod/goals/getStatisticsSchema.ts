import { badRequestSchema } from "../badRequestSchema";
import { statisticsDtoSchema } from "../statisticsDtoSchema";
import { z } from "zod";

export const getStatisticsQueryParamsSchema = z.object({
  period: z.array(z.string()),
});

export type GetStatisticsQueryParamsSchema = z.infer<
  typeof getStatisticsQueryParamsSchema
>;

export const getStatistics200Schema = z.lazy(() => statisticsDtoSchema);

export type GetStatistics200Schema = z.infer<typeof getStatistics200Schema>;

export const getStatistics400Schema = z.lazy(() => badRequestSchema);

export type GetStatistics400Schema = z.infer<typeof getStatistics400Schema>;

export const getStatisticsQueryResponseSchema = z.lazy(
  () => getStatistics200Schema,
);

export type GetStatisticsQueryResponseSchema = z.infer<
  typeof getStatisticsQueryResponseSchema
>;
