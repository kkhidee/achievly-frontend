import { badRequestSchema } from "../badRequestSchema";
import { userDtoSchema } from "../userDtoSchema";
import { z } from "zod";

export const getAllUsers200Schema = z.array(z.lazy(() => userDtoSchema));

export type GetAllUsers200Schema = z.infer<typeof getAllUsers200Schema>;

export const getAllUsers400Schema = z.lazy(() => badRequestSchema);

export type GetAllUsers400Schema = z.infer<typeof getAllUsers400Schema>;

export const getAllUsersQueryResponseSchema = z.lazy(
  () => getAllUsers200Schema,
);

export type GetAllUsersQueryResponseSchema = z.infer<
  typeof getAllUsersQueryResponseSchema
>;
