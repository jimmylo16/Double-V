import { useGetUsers } from "@/hooks/useGetUsers";
import Icon from "../common/Icon";
import { Dispatch, SetStateAction, useState } from "react";

type TUsersSearch = {
  setInputName: Dispatch<SetStateAction<string | undefined>>;
  inputName: string | undefined;
};
export const UsersSearch = ({ setInputName, inputName }: TUsersSearch) => {
  const usersQuery = useGetUsers(inputName);
  const [currenSearch, setCurrenSearch] = useState("example");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrenSearch(inputName ? inputName : "example");
    usersQuery.refetch();
  };

  return (
    <form onSubmit={onSubmit}>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative w-80">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon iconName="search" className="text-gray-500" />
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search"
          required
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
      <div className="flex justify-center">
        <span>
          Current search: <span className="font-bold">{currenSearch}</span>
        </span>
      </div>
    </form>
  );
};
