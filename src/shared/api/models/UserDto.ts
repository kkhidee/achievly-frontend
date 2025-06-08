import type { EventDto } from "./EventDto";
import type { GoalDto } from "./GoalDto";

export type UserDto = {
  /**
   * @type number
   */
  id: number;
  /**
   * @type string
   */
  email: string;
  /**
   * @type string
   */
  username: string;
  /**
   * @type string
   */
  picture: string;
  /**
   * @type array
   */
  goals: GoalDto[];
  /**
   * @type array
   */
  events: EventDto[];
};
