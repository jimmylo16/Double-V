import { GithubUsers } from "@/interfaces/githubUsers";
import React, { FC, useEffect } from "react";
import Image from "next/image";
import { useGetDbUsers } from "@/hooks/useDBUsers";
import { useSaveDbUsers } from "@/hooks/useSaveUsers";
import { useRouter } from "next/router";
import { useGlobalState } from "@/hooks/useGlobalState";

type TUserDetailCard = {
  userData: GithubUsers;
};
export const UserDetailCard: FC<TUserDetailCard> = ({ userData }) => {
  const saveUsersMutation = useSaveDbUsers();
  const { setErrorMsg, setShowError } = useGlobalState();
  const { avatar_url, login, type, html_url } = userData.items[0];
  const router = useRouter();
  const handleSave = () => {
    saveUsersMutation
      .mutateAsync({ avatar_url, name: login, url: html_url })
      .then((resp) => {
        //router.reload();
        if (!resp.data) {
          setShowError(true);
          setErrorMsg(
            (resp as any).errors[0].message.includes("duplicate")
              ? "You already added this user"
              : "Unknown error"
          );
        }
      })
      .catch(() => {
        setShowError(true);
        setErrorMsg("Unknown error");
      });
  };

  return (
    <>
      <div className="bg-slate-500 rounded-lg shadow-md p-4 flex lg:flex-row flex-col gap-3">
        <Image src={avatar_url} alt={login} width={200} height={200} />
        <section className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-center">{login}</h2>
          <p className="text-sm text-center mb-2">Type: {type}</p>
          <div className="flex justify-center  flex-col">
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:underline"
            >
              View Profile
            </a>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white rounded-md mt-4"
            >
              Save
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
