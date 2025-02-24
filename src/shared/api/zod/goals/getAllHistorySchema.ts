import { allHistoryDtoSchema } from "../allHistoryDtoSchema";
import { badRequestSchema } from "../badRequestSchema";
import { z } from "zod";

export const getAllHistory200Schema = z.lazy(() => allHistoryDtoSchema);

export type GetAllHistory200Schema = z.infer<typeof getAllHistory200Schema>;

export const getAllHistory400Schema = z.lazy(() => badRequestSchema);

export type GetAllHistory400Schema = z.infer<typeof getAllHistory400Schema>;

export const getAllHistoryQueryResponseSchema = z.lazy(
  () => getAllHistory200Schema,
);

export type GetAllHistoryQueryResponseSchema = z.infer<
  typeof getAllHistoryQueryResponseSchema
>;
