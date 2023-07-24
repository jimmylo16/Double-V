import { useGetUser } from "@/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
type TUserDetailPage = {
  userName: string;
};
export const UserDetailPage: FC<TUserDetailPage> = ({ userName }) => {
  const router = useRouter();
  const userQuery = useGetUser(userName);
  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }
  console.log(userQuery.isSuccess);
  return (
    <section className="flex flex-col items-center justify-center">
      <div
        className="flex flex-col items-center cursor-pointer py-4"
        onClick={() => router.back()}
      >
        Go back
      </div>
      {userQuery.isSuccess && (
        <div className="bg-slate-500 rounded-lg shadow-md p-4 flex lg:flex-row flex-col gap-3">
          <Image
            src={userQuery.data.items[0].avatar_url}
            alt={userQuery.data.items[0].login}
            width={200}
            height={200}
          />
          <section className="flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-center">
              {userQuery.data.items[0].login}
            </h2>
            <p className="text-sm text-center mb-2">
              Type: {userQuery.data.items[0].type}
            </p>
            <div className="flex justify-center">
              <a
                href={userQuery.data.items[0].html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:underline"
              >
                View Profile
              </a>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};
