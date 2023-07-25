import { IAxiosHelper } from ".";

export const axiosHelper = async <T>({
  axiosInstance,
  method,
  endpoint,
  query,
  id,
  body,
}: IAxiosHelper): Promise<T> => {
  let url = `${endpoint}`;
  if (id) {
    url = url.concat(`/${id}`);
  }
  if (query) {
    url = url.concat(`?${query}`);
  }

  const { data } = await axiosInstance({
    method,
    url,
    data: body,
  });
  return data;
};
