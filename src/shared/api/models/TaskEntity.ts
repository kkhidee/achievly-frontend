export type TaskEntity = {
  /**
   * @description ID задачи
   * @type string
   */
  id: string
  /**
   * @description Заголовок задачи
   * @type string
   */
  title: string
  /**
   * @description Статус выполнения задачи
   * @default false
   * @type boolean
   */
  done: boolean
  /**
   * @description Примечание к задаче
   * @type string
   */
  note?: string | null
  /**
   * @description Срок выполнения задачи
   * @type number
   */
  deadlineTimestamp?: number | null
  /**
   * @description Дата выполнения задачи
   * @type number
   */
  doneTimestamp?: number | null
}