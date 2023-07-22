import { FC } from "react";
import Image from "next/image";
import { Item } from "@/interfaces/githubUsers";

type TUserCard = {
  item: Item;
};
export const UserCard: FC<TUserCard> = ({ item }) => {
  return (
    <div
      className="flex flex-col border-2  border-sky-300 rounded-md  p-2 cursor-pointer bg-slate-500"
      key={item.id}
    >
      <Image
        src={item.avatar_url}
        width={200}
        height={200}
        alt="Picture of the author"
        className="rounded-lg mb-4"
      />
      <span>{item.login}</span>
    </div>
  );
};
