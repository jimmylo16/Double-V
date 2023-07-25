import { FC } from "react";
import Image from "next/image";
import { Item } from "@/interfaces/githubUsers";
import { useRouter } from "next/router";

type TUserCard = {
  name: string;
  urlProfile: string;
};
export const UserCard: FC<TUserCard> = ({ name, urlProfile }) => {
  const router = useRouter();
  const onclick = () => {
    router.push(`/users/${name}`);
  };
  return (
    <div
      className="flex flex-col border-2  border-sky-300 rounded-md  p-2 cursor-pointer bg-slate-500 flex items-center justify-center"
      onClick={onclick}
    >
      <Image
        src={urlProfile}
        width={200}
        height={200}
        alt="Picture of the author"
        className="rounded-lg mb-4 sm:w-52 w-20 "
      />
      <span className="break-all text-center">{name}</span>
    </div>
  );
};
