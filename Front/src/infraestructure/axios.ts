import axios from "axios";

export const AXIOS_METHODS = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
  patch: "patch",
} as const;

const axiosInstance = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export type AxiosMethods = (typeof AXIOS_METHODS)[keyof typeof AXIOS_METHODS];

type IAxiosCall = {
  method: AxiosMethods;
  endpoint: string;
  id?: string;
  body?: any;
};

export const axiosCall = async <T>({
  method,
  endpoint,
  id,
  body,
}: IAxiosCall): Promise<T> => {
  let url = `${endpoint}`;
  if (id) {
    url = url.concat(`/${id}`);
  }

  const { data } = await axiosInstance({
    method,
    url,
    data: body,
  });
  return data;
};
export default axiosInstance;
