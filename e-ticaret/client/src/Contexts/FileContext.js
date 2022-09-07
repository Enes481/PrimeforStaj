import { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [baseImage, setBaseImage] = useState("");
  const values = {
    baseImage,
    setBaseImage,
  };

  return <FileContext.Provider value={values}>{children}</FileContext.Provider>;
};

export const useFileContext = () => useContext(FileContext);