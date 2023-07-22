import axios from "axios";
import { IAxiosCall } from ".";

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
  let url = `${endpoint}`;
  if (id) {
    url = url.concat(`/${id}`);
  }
  if (query) {
    url = url.concat(`?${query}`);
  }

  const { data } = await axiosGithubInstance({
    method,
    url,
    data: body,
  });
  return data;
};
export default axiosGithubInstance;
