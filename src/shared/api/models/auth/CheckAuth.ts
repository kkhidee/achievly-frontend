import type { BadRequest } from "../BadRequest";

export type CheckAuth200 = unknown;

export type CheckAuth401 = BadRequest;

export type CheckAuthQueryResponse = CheckAuth200;

export type CheckAuthQuery = {
  Response: CheckAuth200;
  Errors: CheckAuth401;
};
