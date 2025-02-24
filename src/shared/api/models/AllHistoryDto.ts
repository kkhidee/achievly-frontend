import type { HistoryGoalDto } from "./HistoryGoalDto";

export type AllHistoryDto = {
  /**
   * @description Полная история
   * @type object
   */
  history: {
    [key: string]: HistoryGoalDto[];
  };
};
