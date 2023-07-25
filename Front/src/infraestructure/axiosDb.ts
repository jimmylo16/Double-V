import axios from "axios";
import { IAxiosCall } from ".";
import { axiosHelper } from "./axiosHelper";

const axiosDbInstance = axios.create({
  baseURL: "http://localhost:3001/graphql/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosDb = async <T>({
  method,
  endpoint,
  query,
  id,
  body,
}: IAxiosCall): Promise<T> => {
  return axiosHelper<T>({
    axiosInstance: axiosDbInstance,
    endpoint,
    query,
    id,
    method,
    body,
  });
};

export default axiosDbInstance;
