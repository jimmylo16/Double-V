import { GithubUsers } from "@/interfaces/githubUsers";
import React, { FC } from "react";
import Image from "next/image";

type TUserDetailCard = {
  userData: GithubUsers;
};
export const UserDetailCard: FC<TUserDetailCard> = ({ userData }) => {
  return (
    <>
      <div className="bg-slate-500 rounded-lg shadow-md p-4 flex lg:flex-row flex-col gap-3">
        <Image
          src={userData.items[0].avatar_url}
          alt={userData.items[0].login}
          width={200}
          height={200}
        />
        <section className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-center">
            {userData.items[0].login}
          </h2>
          <p className="text-sm text-center mb-2">
            Type: {userData.items[0].type}
          </p>
          <div className="flex justify-center">
            <a
              href={userData.items[0].html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:underline"
            >
              View Profile
            </a>
          </div>
        </section>
      </div>
    </>
  );
};