import { createContext, useState } from "react";



export const productIdContext = createContext()


export const ProductIdContextProvider = ({ children }) => {

    const[productid, setProductId] = useState()

    const values = {
        productid, setProductId
    }

    return <productIdContext.Provider value={values}>
                {children}
            </productIdContext.Provider>

}

export default ProductIdContextProvider 