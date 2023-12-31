import { UsersSearch } from "@/components/users/UsersSearch";
import Github from "@/components/svg/Github";
import { UsersList } from "@/components/users/UsersList";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [inputName, setInputName] = useState<string>("");

  return (
    <div className="flex flex-col items-center  min-h-screen py-4">
      <div className="flex flex-row items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold ">Search a github User!</h1>
        <Github height={24} />
      </div>
      <UsersSearch setInputName={setInputName} inputName={inputName} />
      <UsersList inputName={inputName} />
    </div>
  );
}
