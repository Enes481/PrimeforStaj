import *as Yup from 'yup'


export const LoginSchema = Yup.object().shape({
    
   
    Mail:Yup.string().email().required('email is mandatory'),
    Password:Yup.string().required('password is mandatory').min(8,'Your password must be at least 8 characters.').max(20,'Your password must be max 20 characters.')
    
})