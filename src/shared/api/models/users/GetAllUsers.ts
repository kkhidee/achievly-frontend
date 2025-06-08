import type { BadRequest } from "../BadRequest";
import type { UserDto } from "../UserDto";

export type GetAllUsers200 = UserDto[];

export type GetAllUsers400 = BadRequest;

export type GetAllUsersQueryResponse = GetAllUsers200;

export type GetAllUsersQuery = {
  Response: GetAllUsers200;
  Errors: GetAllUsers400;
};
