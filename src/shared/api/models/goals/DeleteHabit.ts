import type { BadRequest } from "../BadRequest";

export type DeleteHabitPathParams = {
  /**
   * @type string
   */
  habitId: string;
  /**
   * @type string
   */
  goalId: string;
};

export type DeleteHabit200 = unknown;

export type DeleteHabit400 = BadRequest;

export type DeleteHabitMutationResponse = DeleteHabit200;

export type DeleteHabitMutation = {
  Response: DeleteHabit200;
  PathParams: DeleteHabitPathParams;
  Errors: DeleteHabit400;
};
