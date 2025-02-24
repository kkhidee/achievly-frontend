import type { HabitEntity } from "./HabitEntity";
import type { TaskEntity } from "./TaskEntity";

export type HistoryGoalDto = {
  /**
   * @description ID цели
   * @type number
   */
  id: number;
  /**
   * @description Заголовок
   * @type string
   */
  title: string;
  /**
   * @description Задачи
   * @type array
   */
  tasks?: TaskEntity[] | null;
  /**
   * @description Привычки
   * @type array
   */
  habits?: HabitEntity[] | null;
};
