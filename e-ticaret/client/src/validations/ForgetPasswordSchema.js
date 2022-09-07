import *as Yup from 'yup'


export const ForgetPasswordSchema = Yup.object().shape({
    
  
    Mail:Yup.string().email().required('email is mandatory'),
    NewPassword:Yup.string().min(8,'min 8 character').max(16,'max 16 character').required('password is mandatory'),
    ConfirmPassword: Yup.string()
    .required('confirm password is mandatory')
    .oneOf([Yup.ref('NewPassword')], 'passwords does not match'),
})