import type { BadRequest } from "../BadRequest";

export type DeleteGoalPathParams = {
  /**
   * @type string
   */
  id: string;
};

export type DeleteGoal200 = unknown;

export type DeleteGoal400 = BadRequest;

export type DeleteGoalMutationResponse = DeleteGoal200;

export type DeleteGoalMutation = {
  Response: DeleteGoal200;
  PathParams: DeleteGoalPathParams;
  Errors: DeleteGoal400;
};
