import { getUsers } from "@/hooks/useGetUsers";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export default function Page() {
  return <h1>Hello, Next.js!</h1>;
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
