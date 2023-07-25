import axios from "axios";
import { IAxiosCall } from ".";
import { axiosHelper } from "./axiosHelper";

const axiosGithubInstance = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosGithub = async <T>({
  method,
  endpoint,
  query,
  id,
  body,
}: IAxiosCall): Promise<T> => {
  return axiosHelper<T>({
    axiosInstance: axiosGithubInstance,
    endpoint,
    query,
    id,
    method,
    body,
  });
};

export default axiosGithubInstance;
