import type { BadRequest } from "../BadRequest";
import type { GoalDto } from "../GoalDto";

export type GetGoalPathParams = {
  /**
   * @type string
   */
  id: string;
};

export type GetGoal200 = GoalDto;

export type GetGoal400 = BadRequest;

export type GetGoalQueryResponse = GetGoal200;

export type GetGoalQuery = {
  Response: GetGoal200;
  PathParams: GetGoalPathParams;
  Errors: GetGoal400;
};
