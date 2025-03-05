import type { BadRequest } from "../BadRequest";
import type { CreateEventDto } from "../CreateEventDto";

export type UpdateEventPathParams = {
  /**
   * @type string
   */
  id: string;
};

export type UpdateEvent200 = unknown;

export type UpdateEvent400 = BadRequest;

export type UpdateEventMutationRequest = CreateEventDto;

export type UpdateEventMutationResponse = UpdateEvent200;

export type UpdateEventMutation = {
  Response: UpdateEvent200;
  Request: UpdateEventMutationRequest;
  PathParams: UpdateEventPathParams;
  Errors: UpdateEvent400;
};
