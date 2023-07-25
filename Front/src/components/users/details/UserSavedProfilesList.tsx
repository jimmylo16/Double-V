import { SavedUsers } from "@/interfaces/githubUsers";
import { QueryObserverSuccessResult } from "@tanstack/react-query";
import React from "react";
import { UserCard } from "../UserCard";

type TUserSavedProfilesList = {
  dbUsersQuery: QueryObserverSuccessResult<SavedUsers, unknown>;
};
export const UserSavedProfilesList = ({
  dbUsersQuery,
}: TUserSavedProfilesList) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-center mb-4">Saved Profiles</h2>
      <p className="text-center mb-4">
        Here you can find all the profiles that you have saved
      </p>

      <div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
        {dbUsersQuery.data.data.users.map((user) => {
          return (
            <UserCard
              name={user.user_name}
              urlProfile={user.avatar_url}
              key={user.user_id}
            />
          );
        })}
      </div>
    </section>
  );
};
