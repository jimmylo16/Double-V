import { useGetUser } from "@/hooks";
import { useRouter } from "next/router";
import { FC } from "react";
type TUserDetailPage = {
  userName: string;
};
export const UserDetailPage: FC<TUserDetailPage> = ({ userName }) => {
  const router = useRouter();
  const userQuery = useGetUser(userName);
  console.log(userQuery);
  return (
    <div>
      <>
        <div
          className="flex flex-col items-center  py-4"
          onClick={() => router.back()}
        >
          Go back
        </div>
        <span>{router.query.test}</span>
      </>
    </div>
  );
};
