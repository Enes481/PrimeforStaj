import { createContext, useContext, useState } from "react";

const userContext = createContext()


export const UserProvider = ({ children }) => {

    const[mail, setMail] = useState()
    const[password,setPassword] = useState()
    const[user, setUser] = useState({})

    const values = {
        user, setUser,password,setPassword,mail, setMail
    }

     
 

    return <userContext.Provider value = { values}>
                {children}
            </userContext.Provider>

}


export const UseUserContext = () => useContext(userContext);