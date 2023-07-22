import { axiosGithub } from "@/infraestructure/axiosGithub";
import { GithubUsers } from "@/interfaces/githubUsers";

import { useQuery } from "@tanstack/react-query";

export const getUser = (userName?: string) => {
  return axiosGithub<GithubUsers>({
    method: "get",
    endpoint: `/search/users`,
    query: `q=${userName}&per_page=1`,
  });
};
export const useGetUser = (userName?: string) => {
  const userQuery = useQuery(["getUser", userName], () => getUser(userName), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: !!userName,
  });

  return userQuery;
};
