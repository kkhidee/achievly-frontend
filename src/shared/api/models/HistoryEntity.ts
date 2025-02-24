import type { HistoryGoalDto } from "./HistoryGoalDto";

export type HistoryEntity = {
  /**
   * @description Дата истории цели
   * @type number
   */
  date: number;
  /**
   * @description Цель
   */
  goal: HistoryGoalDto;
};
