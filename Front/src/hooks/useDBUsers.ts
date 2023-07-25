import { axiosDb } from "@/infraestructure/axiosDb";
import { SavedUsers } from "@/interfaces/githubUsers";
import { useQuery } from "@tanstack/react-query";

export const getDBUsers = async () => {
  return axiosDb<SavedUsers>({
    method: "post",
    endpoint: "/",
    body: JSON.stringify({
      query: `
      query{
        users(take: 25){
          user_id
          user_name
          user_url
          date_added
          avatar_url
        }
      }        
    `,
    }),
  });
};

export const useGetDbUsers = () => {
  const dbUsersQuery = useQuery(["dbUsers"], () => getDBUsers(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
  return dbUsersQuery;
};
