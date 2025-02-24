export type StatisticsDto = {
  /**
   * @description Статистика
   * @type array
   */
  statistics: {
    /**
     * @type number | undefined
     */
    timestamp?: number
    /**
     * @type number | undefined
     */
    goalsCompleted?: number
    /**
     * @type number | undefined
     */
    habitsCompleted?: number
    /**
     * @type number | undefined
     */
    tasksCompleted?: number
  }[]
}