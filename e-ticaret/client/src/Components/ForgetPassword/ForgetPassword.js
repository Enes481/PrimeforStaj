import { ForgetPasswordSchema } from "../../validations/ForgetPasswordSchema";
import axios from "axios";
import {useFormik} from 'formik'


export default function ForgetPassword(){


    const { handleSubmit, handleChange, values, errors, touched } =
    useFormik({

        initialValues: {
           
            Mail:"",
            NewPassword:"",
            ConfirmPassword: ""
          
        },
        onSubmit: (values) => {
            

           axios.post(`http://localhost:64082/api/users/forgetuserpassword/${values.Mail}/${values.NewPassword}`,)
           .then(result =>{
            console.log(result)
            window.alert(`${values.name} password successfully changed` )

           
            })
           .catch(error =>{
              
                window.alert("this user already exist....")
                
          })

         

        },
        validationSchema: ForgetPasswordSchema
    })
   
    return(
      
     
        <div>
        <div className="signup-form">
            <form onSubmit={handleSubmit}>
                <h2>Forget Password</h2>
            
              

                <div className="form-group">
                    <div className="input-group">

                        <input
                            type="text"
                            className="form-control"
                            name="Mail"
                            onChange={handleChange}
                            value={values.Mail} 
                            placeholder="available e-mail"
                           
                        />
                    </div>
                </div>
                {errors.Mail && touched.Mail && (
                        <div >{errors.Mail}</div>
                    )}
                
            

                <div className="form-group">
                    <div className="input-group">

                        <input
                            type="password"
                            className="form-control"
                            name="NewPassword"
                            onChange={handleChange}
                            value={values.NewPassword} 
                            placeholder="new password"
                           
                           />
                    </div>
                </div>

                {errors.NewPassword && touched.NewPassword && (
                        <div >{errors.NewPassword}</div>
                    )}
                
                <div className="form-group">
                    <div className="input-group">

                        <input
                            type="password"
                            className="form-control"
                            name="ConfirmPassword"
                            onChange={handleChange}
                            value={values.ConfirmPassword} 
                            placeholder="confirm password"
                           
                           />
                    </div>
                </div>

                
                {errors.ConfirmPassword && touched.ConfirmPassword && (
                        <div >{errors.ConfirmPassword}</div>
                    )}


               <button type="submit" className="button">forget password</button>

            </form>
            
        </div>
    </div>

    )
}