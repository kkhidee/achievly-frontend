import type { HabitEntity } from "./HabitEntity";
import type { HistoryEntity } from "./HistoryEntity";
import type { TaskEntity } from "./TaskEntity";

export enum GoalDtoTypeEnum {
  "public" = "public",
  "private" = "private",
}

export enum GoalDtoStatusEnum {
  "ongoing" = "ongoing",
  "achieved" = "achieved",
}

export enum GoalDtoCategoryEnum {
  "education" = "education",
  "career" = "career",
  "finance" = "finance",
  "health" = "health",
  "sports" = "sports",
  "relationships" = "relationships",
  "travel" = "travel",
  "creativity" = "creativity",
  "business" = "business",
  "personalGrowth" = "personalGrowth",
  "charity" = "charity",
  "hobby" = "hobby",
  "spirituality" = "spirituality",
  "ecology" = "ecology",
  "socialActivity" = "socialActivity",
}

export type GoalDto = {
  /**
   * @description Goal ID
   * @type number
   */
  id: number;
  /**
   * @description Тип цели
   * @type string
   */
  type: GoalDtoTypeEnum;
  /**
   * @description Наименование цели
   * @type string
   */
  title: string;
  /**
   * @description Статус цели
   * @type string
   */
  status: GoalDtoStatusEnum;
  /**
   * @description Примечание к цели
   * @type string
   */
  note?: string | null;
  /**
   * @description Категория цели
   * @type string
   */
  category?: GoalDtoCategoryEnum | null;
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
  /**
   * @description История цели
   * @type array
   */
  history?: HistoryEntity[] | null;
  /**
   * @description Время завершения цели
   * @type number
   */
  achievedTimestamp?: number | null;
  /**
   * @description Время дедлайна цели
   * @type number
   */
  deadlineTimestamp?: number | null;
};
