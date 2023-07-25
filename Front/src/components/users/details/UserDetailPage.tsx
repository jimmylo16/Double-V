import { useGetUser } from "@/hooks";
import { useRouter } from "next/router";
import { FC } from "react";
import { UserDetailCard } from "./UserDetailCard";
import { useGetDbUsers } from "@/hooks/useDBUsers";
import { UserCard } from "../UserCard";
type TUserDetailPage = {
  userName: string;
};
export const UserDetailPage: FC<TUserDetailPage> = ({ userName }) => {
  const router = useRouter();
  const userQuery = useGetUser(userName);
  const dbUsersQuery = useGetDbUsers();
  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <div
        className="flex flex-col items-center cursor-pointer my-4 p-2 bg-blue-500 rounded-md"
        onClick={() => router.back()}
      >
        Go back
      </div>
      {userQuery.isSuccess && <UserDetailCard userData={userQuery.data} />}
      {dbUsersQuery.isSuccess &&
        dbUsersQuery.data.data.users.map((user) => {
          return (
            <UserCard
              name={user.user_name}
              urlProfile={user.avatar_url}
              key={user.user_id}
            />
          );
        })}
    </section>
  );
};
