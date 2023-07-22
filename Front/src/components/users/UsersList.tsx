import { useGetUsers } from "@/hooks/useGetUsers";
import React, { useEffect } from "react";
import { UserCard } from "./UserCard";
type TUsersList = {
  inputName: string;
};
export const UsersList = ({ inputName }: TUsersList) => {
  const usersQuery = useGetUsers(inputName);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usersQuery;
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);
  if (usersQuery.isLoading) {
    return <div>Cargando...</div>;
  }
  if (data?.pages[0].total_count === 0) {
    return <div className="mt-4">There is no userWith that name</div>;
  }
  return (
    <section className="mt-4 mx-3">
      <div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
        {data?.pages?.map((page) =>
          page.items.map((item) => <UserCard item={item} key={item.id} />)
        )}
      </div>
    </section>
  );
};
