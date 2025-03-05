import type { BadRequest } from "../BadRequest";
import type { CreateEventDto } from "../CreateEventDto";

export type CreateEvents200 = unknown;

export type CreateEvents400 = BadRequest;

export type CreateEventsMutationRequest = CreateEventDto[];

export type CreateEventsMutationResponse = CreateEvents200;

export type CreateEventsMutation = {
  Response: CreateEvents200;
  Request: CreateEventsMutationRequest;
  Errors: CreateEvents400;
};
