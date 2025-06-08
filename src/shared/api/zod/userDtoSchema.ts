import { eventDtoSchema } from "./eventDtoSchema";
import { goalDtoSchema } from "./goalDtoSchema";
import { z } from "zod";

export const userDtoSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  picture: z.string(),
  goals: z.array(z.lazy(() => goalDtoSchema)),
  events: z.array(z.lazy(() => eventDtoSchema)),
});

export type UserDtoSchema = z.infer<typeof userDtoSchema>;
