import { UsersSearch } from "@/components/users/UsersSearch";
import Github from "@/components/svg/Github";
import { getUsers } from "@/hooks/useGetUsers";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export default function UsersPage() {
  return (
    <div className="flex flex-col items-center  min-h-screen py-4">
      <div className="flex flex-row items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold ">Search a github User!</h1>
        <Github height={24} />
      </div>
      <UsersSearch />
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts"], getUsers);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
