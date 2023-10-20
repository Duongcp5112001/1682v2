export interface IParam {
  take?: number,
  page?: number,
  limit?: number,
  sort?: string
}

export type UserInfoState = {
  "firstName": string;
  "phoneNumber"?: string;
  "lastName"?: string;
  "givenName"?: string;
  "avatar"?: string,
  "email"?: string;
  "role"?: string;
  "address"?: string;
  "dob"?: any;
  "gender"?: string;
  "_id": string
}