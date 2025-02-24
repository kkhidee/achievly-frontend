import type { BadRequest } from "../BadRequest";
import type { GoalDto } from "../GoalDto";

export type CreateGoal200 = unknown;

export type CreateGoal400 = BadRequest;

export type CreateGoalMutationRequest = GoalDto;

export type CreateGoalMutationResponse = CreateGoal200;

export type CreateGoalMutation = {
  Response: CreateGoal200;
  Request: CreateGoalMutationRequest;
  Errors: CreateGoal400;
};
