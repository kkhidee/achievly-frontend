export type HabitEntity = {
  /**
   * @description ID привычки
   * @type string
   */
  id: string
  /**
   * @description Заголовок привычки
   * @type string
   */
  title: string
  /**
   * @description Дни повторения привычки
   * @type array
   */
  repeatDays: number[]
  /**
   * @description Дни в которые привычка была выполнена
   * @type array | undefined
   */
  doneDays?: number[]
  /**
   * @description Примечание к привычке
   * @type string
   */
  note?: string | null
}