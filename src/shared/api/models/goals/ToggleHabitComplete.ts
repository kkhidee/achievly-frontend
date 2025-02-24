import type { BadRequest } from "../BadRequest";

export type ToggleHabitCompletePathParams = {
  /**
   * @type string
   */
  habitId: string;
  /**
   * @type string
   */
  id: string;
};

export type ToggleHabitComplete200 = unknown;

export type ToggleHabitComplete400 = BadRequest;

export type ToggleHabitCompleteMutationResponse = ToggleHabitComplete200;

export type ToggleHabitCompleteMutation = {
  Response: ToggleHabitComplete200;
  PathParams: ToggleHabitCompletePathParams;
  Errors: ToggleHabitComplete400;
};
