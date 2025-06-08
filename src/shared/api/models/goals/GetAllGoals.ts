import type { BadRequest } from "../BadRequest";
import type { GoalEntity } from "../GoalEntity";

export type GetAllGoalsQueryParams = {
  /**
   * @type string
   */
  status: string;
};

export type GetAllGoals200 = GoalEntity[];

export type GetAllGoals400 = BadRequest;

export type GetAllGoalsQueryResponse = GetAllGoals200;

export type GetAllGoalsQuery = {
  Response: GetAllGoals200;
  QueryParams: GetAllGoalsQueryParams;
  Errors: GetAllGoals400;
};
