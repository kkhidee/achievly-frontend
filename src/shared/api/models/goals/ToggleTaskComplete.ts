import type { BadRequest } from "../BadRequest";

export type ToggleTaskCompletePathParams = {
  /**
   * @type string
   */
  taskId: string;
  /**
   * @type string
   */
  id: string;
};

export type ToggleTaskComplete200 = unknown;

export type ToggleTaskComplete400 = BadRequest;

export type ToggleTaskCompleteMutationResponse = ToggleTaskComplete200;

export type ToggleTaskCompleteMutation = {
  Response: ToggleTaskComplete200;
  PathParams: ToggleTaskCompletePathParams;
  Errors: ToggleTaskComplete400;
};
