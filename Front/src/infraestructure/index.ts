import { AxiosInstance } from "axios";

export const AXIOS_METHODS = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
  patch: "patch",
} as const;
export type AxiosMethods = (typeof AXIOS_METHODS)[keyof typeof AXIOS_METHODS];
export type IAxiosCall = {
  method: AxiosMethods;
  endpoint: string;
  query?: string;
  id?: string;
  body?: any;
};
export type IAxiosHelper = {
  axiosInstance: AxiosInstance;
} & IAxiosCall;
