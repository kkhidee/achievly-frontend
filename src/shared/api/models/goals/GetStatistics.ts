import type { BadRequest } from "../BadRequest";
import type { StatisticsDto } from "../StatisticsDto";

export type GetStatisticsQueryParams = {
  /**
   * @type array
   */
  period: string[];
};

export type GetStatistics200 = StatisticsDto;

export type GetStatistics400 = BadRequest;

export type GetStatisticsQueryResponse = GetStatistics200;

export type GetStatisticsQuery = {
  Response: GetStatistics200;
  QueryParams: GetStatisticsQueryParams;
  Errors: GetStatistics400;
};
