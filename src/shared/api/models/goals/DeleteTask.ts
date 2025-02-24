import type { BadRequest } from "../BadRequest";

export type DeleteTaskPathParams = {
  /**
   * @type string
   */
  taskId: string;
  /**
   * @type string
   */
  goalId: string;
};

export type DeleteTask200 = unknown;

export type DeleteTask400 = BadRequest;

export type DeleteTaskMutationResponse = DeleteTask200;

export type DeleteTaskMutation = {
  Response: DeleteTask200;
  PathParams: DeleteTaskPathParams;
  Errors: DeleteTask400;
};
