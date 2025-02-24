import type { BadRequest } from "../BadRequest";
import type { UserDto } from "../UserDto";

export type GetProfile200 = UserDto;

export type GetProfile400 = BadRequest;

export type GetProfileQueryResponse = GetProfile200;

export type GetProfileQuery = {
  Response: GetProfile200;
  Errors: GetProfile400;
};
