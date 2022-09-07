import * as Yup from "yup"

export const UsedStateAddSchema = Yup.object().shape({
  
    usedStatus:Yup.string().required('please do not enter empty value .')
    
    
})