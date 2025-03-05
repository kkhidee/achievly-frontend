import type { BadRequest } from "../BadRequest";

export type Logout200 = unknown;

export type Logout401 = BadRequest;

export type LogoutMutationResponse = Logout200;

export type LogoutMutation = {
  Response: Logout200;
  Errors: Logout401;
};
