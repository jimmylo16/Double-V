import { axiosCall } from "@/infraestructure/axios";
import { GithubUsers } from "@/interfaces/githubUsers";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const getUsers = (userName: string, page: number = 1) => {
  return axiosCall<GithubUsers>({
    method: "get",
    endpoint: `/search/users?q=${userName}&page=${page}`,
  });
};
export const useGetUsers = (userName: string) => {
  const usersQuery = useInfiniteQuery(
    ["getUsers"],
    ({ pageParam }) => getUsers(userName, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    }
  );
  const { hasNextPage, fetchNextPage } = usersQuery;
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return usersQuery;
};
