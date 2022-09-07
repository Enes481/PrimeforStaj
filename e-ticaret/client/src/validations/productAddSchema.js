import * as Yup from "yup"

export const ProductAddSchema = Yup.object().shape({
    productName:Yup.string().min(3,'Too short').max(100,'Too long').required('name is mendatory'),
    brandId:Yup.string(),
    colorId : Yup.string(),
    productDescription :Yup.string().min(3,'Too short').max(500,'Too long').required(),
    price:Yup.number('price must be a number').required("price is mandatory").moreThan(1,'price must be greater than 1'),
    usingStatusId:Yup.string().required('using state is mandatory'),
    categoryId:Yup.string().required('category is mandatory'),
    isOfferable:Yup.string().required('this field is required'),
    
    
})