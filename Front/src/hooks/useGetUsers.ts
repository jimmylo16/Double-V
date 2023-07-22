import { axiosCall } from "@/infraestructure/axios";

import { useQuery } from "@tanstack/react-query";

export const getUsers = () => {
  return axiosCall({ method: "get", endpoint: "/search/users?q=YOUR_NAME" });
};
export const useGetUsers = () => {
  const usersQuery = useQuery({ queryKey: ["getUsers"], queryFn: getUsers });
  return usersQuery;
};
