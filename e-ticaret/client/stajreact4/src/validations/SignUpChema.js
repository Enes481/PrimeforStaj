import *as Yup from 'yup'


export const SignUpSchema = Yup.object().shape({
    
    name:Yup.string().min(3,'Too short name').max(20,'Too long').required('name is mandatory'),
    lastName:Yup.string().min(3,'Too short last name').max(20,'Too long last name').required(),
    mail:Yup.string().email().required('email is mandatory'),
    password:Yup.string().min(8,'min 8 character').max(16,'max 16 character').required('password is mandatory'),
    confirmPassword: Yup.string()
    .required('confirm password is mandatory')
    .oneOf([Yup.ref('password')], 'passwords does not match'),
})