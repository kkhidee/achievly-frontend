import type { BadRequest } from "../BadRequest";
import type { GoalDto } from "../GoalDto";

export type UpdateGoalPathParams = {
  /**
   * @type string
   */
  id: string;
};

export type UpdateGoal200 = unknown;

export type UpdateGoal400 = BadRequest;

export type UpdateGoalMutationRequest = GoalDto;

export type UpdateGoalMutationResponse = UpdateGoal200;

export type UpdateGoalMutation = {
  Response: UpdateGoal200;
  Request: UpdateGoalMutationRequest;
  PathParams: UpdateGoalPathParams;
  Errors: UpdateGoal400;
};
