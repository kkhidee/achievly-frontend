import type { BadRequest } from "../BadRequest";

export type DeleteEventPathParams = {
  /**
   * @type string
   */
  id: string;
};

export type DeleteEvent200 = unknown;

export type DeleteEvent400 = BadRequest;

export type DeleteEventMutationResponse = DeleteEvent200;

export type DeleteEventMutation = {
  Response: DeleteEvent200;
  PathParams: DeleteEventPathParams;
  Errors: DeleteEvent400;
};
