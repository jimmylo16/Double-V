import { axiosGithub } from "@/infraestructure/axiosGithub";
import { GithubUsers } from "@/interfaces/githubUsers";

import { useInfiniteQuery } from "@tanstack/react-query";

const PERPAGE = 10;
export const getUsers = (userName: string, page: number = 1) => {
  return axiosGithub<GithubUsers>({
    method: "get",
    endpoint: `/search/users`,
    query: `q=${userName}&page=${page}&per_page=${PERPAGE}`,
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
