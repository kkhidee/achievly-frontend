import type { BadRequest } from "../BadRequest";
import type { EventDto } from "../EventDto";

export type GetAllEventsQueryParams = {
  /**
   * @type array
   */
  period: string[];
};

export type GetAllEvents200 = EventDto[];

export type GetAllEvents400 = BadRequest;

export type GetAllEventsQueryResponse = GetAllEvents200;

export type GetAllEventsQuery = {
  Response: GetAllEvents200;
  QueryParams: GetAllEventsQueryParams;
  Errors: GetAllEvents400;
};
