import { axiosCall } from "@/infraestructure/axios";
import { GithubUsers } from "@/interfaces/githubUsers";

import { useInfiniteQuery } from "@tanstack/react-query";

export const getUsers = (userName: string, page: number = 1) => {
  return axiosCall<GithubUsers>({
    method: "get",
    endpoint: `/search/users?q=${userName}&page=${page}`,
  });
};
const LIMIT = 10;
export const useGetUsers = (userName: string, page: number = 1) => {
  const usersQuery = useInfiniteQuery(
    ["getUsers"],
    () => getUsers(userName, page),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.items.length === LIMIT ? allPages.length + 1 : undefined;
        return nextPage;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  return usersQuery;
};
