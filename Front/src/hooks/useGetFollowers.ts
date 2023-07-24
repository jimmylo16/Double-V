import { axiosGithub } from "@/infraestructure/axiosGithub";
import { GithubUsers } from "@/interfaces/githubUsers";
import { sleep } from "@/utils/sleep";

import { useQuery } from "@tanstack/react-query";

export const getFollowersByUserName = async (userName?: string) => {
  await sleep(500);
  return axiosGithub<GithubUsers[]>({
    method: "get",
    endpoint: `/users/${userName}/following`,
  });
};
export const useGetFollowers = (data: string[]) => {
  const userFollowersQuery = useQuery(
    ["followers", data],
    async () => {
      const followers = [];
      for (const login of data) {
        const response = await getFollowersByUserName(login);
        followers.push(response);
      }
      return followers.map((item, index) => ({
        numberOfFollowers: item.length,
        user: data[index],
      }));
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  return userFollowersQuery;
};
