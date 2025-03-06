import type { BadRequest } from "../BadRequest";
import type { EventDto } from "../EventDto";

export type GetEventsQueryParams = {
  /**
   * @type array
   */
  period: string[];
};

export type GetEvents200 = EventDto[];

export type GetEvents400 = BadRequest;

export type GetEventsQueryResponse = GetEvents200;

export type GetEventsQuery = {
  Response: GetEvents200;
  QueryParams: GetEventsQueryParams;
  Errors: GetEvents400;
};
