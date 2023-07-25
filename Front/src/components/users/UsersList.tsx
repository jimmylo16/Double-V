import { useGetUsers } from "@/hooks/useGetUsers";
import React, { useEffect } from "react";
import { UserCard } from "./UserCard";
type TUsersList = {
  inputName?: string;
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
    return <div>Loading...</div>;
  }
  if (usersQuery.isError) {
    const message = (usersQuery.failureReason as any)?.response.data.message;
    return <div className="mt-4">{message}</div>;
  }
  if (data?.pages[0].total_count === 0) {
    return <div className="mt-4">There is no user with that name</div>;
  }
  return (
    <section className="mt-4 mx-3">
      <div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
        {data?.pages?.map((page) =>
          page.items.map((item) => (
            <UserCard
              name={item.login}
              urlProfile={item.avatar_url}
              key={item.id}
            />
          ))
        )}
      </div>
    </section>
  );
};
