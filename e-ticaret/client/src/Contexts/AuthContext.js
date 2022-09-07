import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userrole, setUserRole] = useState(false);
 

  return <AuthContext.Provider value={{userrole,setUserRole}}>{children}</AuthContext.Provider>;
};

export default AuthProvider