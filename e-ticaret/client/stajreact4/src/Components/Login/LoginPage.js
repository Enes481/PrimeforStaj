import '../../Css/LoginPage.css'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import {LoginSchema} from '../../validations/LoginSchema'
import {useFormik} from 'formik'
import { AuthContext } from '../../Contexts/AuthContext';
import { UseUserContext } from '../../Contexts/userContext';
import jwtDecode from 'jwt-decode'
import { useContext } from 'react';
import primeforimg from '../../img/primefor.jpg'

export default function LoginPage() {

    let navigate = useNavigate();
    
   
    const {mail, setMail, password, setPassword} = UseUserContext();

    const {userrole,setUserRole} = useContext(AuthContext);
    


    const handleSignUpClick = () =>{
        navigate("/SignUpPage");
    }

    const handleForgetPasswordClick=()=>{
        navigate("/ForgetPassword");
    }

    const { handleSubmit, handleChange, values, errors, touched } =
        useFormik({

        initialValues: {
            Mail:"",
            Password: "",
        },

     
        
        onSubmit: (values) => {
            
            axios.post('http://localhost:64082/api/users/login',values).then( async function(response){
               
                console.log(response.data)
              
                if(response.data === "block"){
                    window.alert("Your account has been blocked because you entered too many wrong password....")
                }
                else if(response.data === "invalid"){
                    window.alert("You entered an invalid password or email, please try again..")
                }
                else{
                    
                    let jwtObject = await jwtDecode(response.data)
                    const UserRole = jwtObject["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                    
                    if(UserRole =="admin")
                        setUserRole(true)
                    else if(UserRole =="user")
                        setUserRole(false)

                    setMail(values.Mail)
                    setPassword(values.Password)
                    navigate('/MyAccount')
                    
                }
              
                
            })
            
          

        },
        validationSchema: LoginSchema
    })
  


    return (


        <div>
            <div className="wrapper">
                <div className="logo">
                    <img src={primeforimg}  />
                </div>
                <div className="text-center mt-4 name">
                    PRIMEFOR
                </div>
                <form className="p-3 mt-3" onSubmit={handleSubmit}>
               
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input 
                        type="text" 
                        name="Mail"
                        onChange={handleChange}
                        value={values.Mail} 
                        id="Mail" 
                        placeholder="e-mail" />
                    </div>

                    {errors.Mail && touched.Mail && (
                        <div >{errors.Mail}</div>
                    )}

                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input 
                        type="password"
                        name="Password"
                        onChange={handleChange}
                        value={values.Password} 
                        id="pwd" 
                        placeholder="Password" />
                    </div>
                    
                   
                    {errors.Password && touched.Password && (
                        <div >{errors.Password}</div>
                    )}


                    <button type='submit' className="btn mt-3">Login</button>

                </form>

                <div className="text-center fs-6">
                    <button className='btn' onClick={() => handleForgetPasswordClick()}>Forget password?</button> or 
                    <button className='btn' onClick={() => handleSignUpClick()}>Sign up</button>
                </div>

            </div>

        </div>
    );


}

