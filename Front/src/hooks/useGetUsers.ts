import { axiosCall } from "@/infraestructure/axios";
import { GithubUsers } from "@/interfaces/githubUsers";

import { useInfiniteQuery } from "@tanstack/react-query";

const PERPAGE = 10;
export const getUsers = (userName: string, page: number = 1) => {
  return axiosCall<GithubUsers>({
    method: "get",
    endpoint: `/search/users?q=${userName}&page=${page}&per_page=${PERPAGE}`,
  });
};
export const useGetUsers = (userName: string) => {
  const usersQuery = useInfiniteQuery(
    ["getUsers"],
    ({ pageParam }) => getUsers(userName, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const total = lastPage.total_count;
        return total > allPages.length * PERPAGE ? allPages.length + 1 : null;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    }
  );

  return usersQuery;
};
