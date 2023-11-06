import dotGreen from "~/assets/images/dotGreen.svg";
import dotOrange from "~/assets/images/dotOrange.svg";

export const DATE = "yyyy/MM/dd";
export const DATE_VI_FORMAT = "dd/MM/yyyy";
export const DATE_SIMPLE = "MM/dd";

export const LOGIN_SUCCESS = "Login Success!";
export const REGISTER_SUCCESS = "Register Success!";
export const CREATE_POST_SUCCESS = "Create posts Success!";

export const SUCCESS = "Success!";
export const KEY_MESSAGE = "message";
export const TITLE_ASC = "TITLE_ASC";
export const NAME_ASC = "NAME_ASC";

export const COMMON_PARAMS = {
  page: 1,
  limit: 10,
  sort: NAME_ASC,
};

export const PARAMS_GET_ALL = {
  page: 1,
  limit: 999,
  sort: TITLE_ASC,
};

export const PARAMS_GET_ALL_NAME = {
  page: 1,
  limit: 999,
  sort: NAME_ASC,
};

export const PARAMS_FILTER = {
  page: 1,
  limit: 999,
};

export enum UserStatus {
  "ACTIVE" = "Active",
  "INACTIVE" = "Inactive",
}

export enum AllStatus {
  "ACTIVE" = "ACTIVE",
  "INACTIVE" = "INACTIVE",
}

export enum Anonymous {
  "Anonymous" = "Anonymous",
  "Public" = "Public",
}

export enum UserRole {
  Admin = "ADMIN",
  Member = "MEMBER",
}

export const userIcon = {
  [-1]: "",
  [UserStatus.ACTIVE]: dotGreen,
  [UserStatus.INACTIVE]: dotOrange,
};

export interface Status {
  value: "ACTIVE" | "INACTIVE";
}

export const MAX_LENGTH = 255;
