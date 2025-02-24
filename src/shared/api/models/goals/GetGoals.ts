import type { BadRequest } from "../BadRequest";
import type { GoalDto } from "../GoalDto";

export type GetGoalsQueryParams = {
  /**
   * @type string
   */
  status: string;
};

export type GetGoals200 = GoalDto[];

export type GetGoals400 = BadRequest;

export type GetGoalsQueryResponse = GetGoals200;

export type GetGoalsQuery = {
  Response: GetGoals200;
  QueryParams: GetGoalsQueryParams;
  Errors: GetGoals400;
};
