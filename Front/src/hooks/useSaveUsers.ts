import { axiosDb } from "@/infraestructure/axiosDb";
import { SavedUsers } from "@/interfaces/githubUsers";
import { useMutation } from "@tanstack/react-query";

type TsaveUsers = {
  name: string;
  url: string;
  avatar_url: string;
};
export const saveUsers = async ({ name, url, avatar_url }: TsaveUsers) => {
  return axiosDb<SavedUsers>({
    method: "post",
    endpoint: "/",
    body: JSON.stringify({
      query: `
      mutation{
        createUser(createUserInput:{
          user_name: "${name}"
          user_url: "${url}"
          avatar_url: "${avatar_url}"
        }){
          user_name
          user_url
          date_added
        }
      }     
    `,
    }),
  });
};

export const useSaveDbUsers = () => {
  const saveUsersMutation = useMutation({
    mutationFn: (userData: TsaveUsers) => saveUsers(userData),
  });
  return saveUsersMutation;
};
