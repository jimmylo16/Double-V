import { createContext, ReactNode, useState } from "react";
import { Modal } from "./common/Modal";

export const GlobalContext = createContext({
  showError: false,
  setShowError: (show: boolean) => {},
  setSearchError: (error: string) => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [showError, setShowError] = useState(false);
  const [searchError, setSearchError] = useState("");

  return (
    <GlobalContext.Provider value={{ showError, setShowError, setSearchError }}>
      <Modal showModal={showError} setShowModal={setShowError}>
        <p className="text-red-500 text-sm">{searchError}</p>
      </Modal>
      {children}
    </GlobalContext.Provider>
  );
};
