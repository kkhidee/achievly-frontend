export type BadRequest = {
  /**
   * @description Error message
   * @type string
   */
  message: string
  /**
   * @description Error type
   * @type string
   */
  error: string
  /**
   * @description Error status code
   * @type number
   */
  statusCode: number
}