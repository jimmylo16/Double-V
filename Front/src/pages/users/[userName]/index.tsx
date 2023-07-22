import { UserDetailPage } from "@/components/users/details/userDetailPage";
import { useRouter } from "next/router";

export default function UsersPage() {
  const router = useRouter();

  return (
    <>
      {router.query && (
        <UserDetailPage userName={router.query.userName as string} />
      )}
    </>
  );
}
