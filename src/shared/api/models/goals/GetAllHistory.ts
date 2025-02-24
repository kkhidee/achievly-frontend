import type { AllHistoryDto } from "../AllHistoryDto";
import type { BadRequest } from "../BadRequest";

export type GetAllHistory200 = AllHistoryDto;

export type GetAllHistory400 = BadRequest;

export type GetAllHistoryQueryResponse = GetAllHistory200;

export type GetAllHistoryQuery = {
  Response: GetAllHistory200;
  Errors: GetAllHistory400;
};
