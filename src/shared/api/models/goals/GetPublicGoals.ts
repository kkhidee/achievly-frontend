import type { BadRequest } from "../BadRequest";
import type { GoalDto } from "../GoalDto";

export type GetPublicGoalsQueryParams = {
  /**
   * @type string | undefined
   */
  category?: string;
  /**
   * @type string | undefined
   */
  search?: string;
};

export type GetPublicGoals200 = GoalDto[];

export type GetPublicGoals400 = BadRequest;

export type GetPublicGoalsQueryResponse = GetPublicGoals200;

export type GetPublicGoalsQuery = {
  Response: GetPublicGoals200;
  QueryParams: GetPublicGoalsQueryParams;
  Errors: GetPublicGoals400;
};
