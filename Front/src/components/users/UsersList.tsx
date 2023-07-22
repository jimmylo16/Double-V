import { useGetUsers } from "@/hooks/useGetUsers";
import React from "react";
import { UserCard } from "./UserCard";
type TUsersList = {
  inputName: string;
};
export const UsersList = ({ inputName }: TUsersList) => {
  const usersQuery = useGetUsers(inputName);

  if (usersQuery.isLoading) {
    return <div>Cargando...</div>;
  }
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usersQuery;
  return (
    <section className="mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.pages?.map((page) =>
          page.items.map((item) => <UserCard item={item} key={item.id} />)
        )}
      </div>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Cargar más...
        </button>
      )}
    </section>
  );
};
