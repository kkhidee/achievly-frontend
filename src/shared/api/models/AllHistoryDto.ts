import type { HistoryGoalDto } from "./HistoryGoalDto";

export type AllHistoryDto = {
  /**
   * @description Полная история
   * @type object | undefined
   */
  history?: {
    [key: string]: HistoryGoalDto[];
  };
};
