import type { BadRequest } from "../BadRequest";

export type AchieveGoalPathParams = {
  /**
   * @type string
   */
  id: string;
};

export type AchieveGoal200 = unknown;

export type AchieveGoal400 = BadRequest;

export type AchieveGoalMutationResponse = AchieveGoal200;

export type AchieveGoalMutation = {
  Response: AchieveGoal200;
  PathParams: AchieveGoalPathParams;
  Errors: AchieveGoal400;
};
