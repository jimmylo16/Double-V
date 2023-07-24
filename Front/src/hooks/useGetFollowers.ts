import { axiosGithub } from "@/infraestructure/axiosGithub";
import { GithubUsers } from "@/interfaces/githubUsers";
import { sleep } from "@/utils/sleep";

import { useQuery } from "@tanstack/react-query";

export const getFollowersByUserName = async (userName?: string) => {
  console.log(userName);
  await sleep(1500);
  return axiosGithub<GithubUsers[]>({
    method: "get",
    endpoint: `/users/${userName}/following`,
  });
};
export const useGetFollowers = (data: string[]) => {
  const userFollowersQuery = useQuery(
    ["followers"],
    async () => {
      const followers = [];
      for (const login of data) {
        const response = await getFollowersByUserName(login);
        followers.push(response);
      }
      return followers;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  return userFollowersQuery;
};
