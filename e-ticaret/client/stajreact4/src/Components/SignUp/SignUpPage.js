import '../../Css/SignUpPage.css'
import { SignUpSchema } from "../../validations/SignUpChema"
import React, { useState } from 'react';
import axios from 'axios'
import { useFormik } from 'formik'
import {useNavigate} from "react-router-dom"


export default function SingUpPage() {

    let navigate = useNavigate();
    const handleLoginClick = () =>{
        navigate("/LoginPage");
    }

    const { handleSubmit, handleChange, values, errors, touched } =
        useFormik({

            initialValues: {
                name: "",
                mail:"",
                lastName:"",
                password: "",
                confirmPassword: "",
              
            },
            onSubmit: (values) => {
                

               axios.post('http://localhost:64082/api/users/register',values)
               .then(result =>{
                console.log(result)
                window.alert(`${values.name} User successfully added` )

               
                })
               .catch(error=>{
                console.log(error)
                window.alert("this user already exist...")
               })
               
                    
                  
                    
             

             

            },
            validationSchema: SignUpSchema
        })

    return (


        <div>
            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <p>Please fill in this form to create an account!</p>

                    <div className="form-group">
                        <div className="input-group">

                            <input
                                type="text"
                                className="form-control"
                                name='name'
                                placeholder="First Name"
                                onChange={handleChange}
                                value={values.name}
                                
                            />
                        </div>
                    </div>
                    {errors.name && touched.name && (
                        <div >{errors.name}</div>
                    )}

                <div className="form-group">
                        <div className="input-group">

                            <input
                                type="text"
                                className="form-control"
                                name='lastName'
                                placeholder="last Name"
                                onChange={handleChange}
                                value={values.lastName}
                                
                            />
                        </div>
                    </div>
                    {errors.lastName && touched.lastName && (
                        <div >{errors.lastName}</div>
                    )}

                    

                  

                    <div className="form-group">
                        <div className="input-group">

                            <input
                                type="text"
                                className="form-control"
                                name="mail" 
                                placeholder="Email Address"
                                onChange={handleChange}
                                value={values.mail}
                               />
                        </div>
                    </div>
                    {errors.mail && touched.mail && (
                        <div >{errors.mail}</div>
                    )}

                    <div className="form-group">
                        <div className="input-group">

                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={values.password}
                                 />
                        </div>
                    </div>

                
                    {errors.password && touched.password && (
                        <div >{errors.password}</div>
                    )}

                    <div className="form-group">
                        <div className="input-group">

                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleChange} 
                                value={values.confirmPassword}
                               />
                        </div>
                    </div>

                    {errors.confirmPassword && touched.confirmPassword && (
                        <div >{errors.confirmPassword}</div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg">
                        Sign Up
                    </button>

                </form>
                <button className='btn btn-outline-dark' onClick={() => handleLoginClick()}>if you have already an acount - Login</button>
            </div>
        </div>


    );


}