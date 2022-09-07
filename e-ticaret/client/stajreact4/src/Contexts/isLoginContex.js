import { createContext, useState } from "react";



export const isLoginContext = createContext()


export const IsLoginContextProvider = ({ children }) => {

    const[isLogin, setLogin] = useState(false)
 

    return <isLoginContext.Provider 
                value={{isLogin,setLogin}}>{children}
            </isLoginContext.Provider>

}

export default IsLoginContextProvider 