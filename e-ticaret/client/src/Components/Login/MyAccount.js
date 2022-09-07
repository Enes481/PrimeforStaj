import { useContext, useEffect } from "react";
import { isLoginContext } from "../../Contexts/isLoginContex";
import { UseUserContext } from "../../Contexts/userContext";
import axios from "axios";
import Header from "../SideBar/Header.js"



export default function MyAccount() {

    const url = "http://localhost:64082/api/users/getUserDetails"
    const urlById = "http://localhost:64082/api/users/getUserDetailsById"

    const {isLogin,setLogin} = useContext(isLoginContext);
    const {mail, user, setUser} = UseUserContext();
    

    function notifySuccess () {
     
       setLogin(true)
      
       //console.log(isLogin)
      
    }
    
    
    function fetchUserData(){

        if(localStorage.getItem("userId")){
            axios.post(urlById,localStorage.getItem("userId"), {
                headers: {
                  "content-type": "application/json",
                },
              })
            .then(response =>{
                setUser(response.data); 
                localStorage.setItem("userId",response.data.userID);
            })   
        }else {
            axios.post(url,mail, {
                headers: {
                  "content-type": "application/json",
                },
              })
            .then(response =>{
                setUser(response.data); 
                localStorage.setItem("userID",response.data.userID);
            })
             
        }

    }

    useEffect(() => {

        notifySuccess()
        fetchUserData()
      
    },[])


    return (

       
        <div>
           
           <Header/>
            <br/>
             <h1 ><u>My Information</u></h1>
             <br/>
             <br/>
            <div>
                 
                {<h5> Welcome {user.name+" "+user.lastName}</h5>}
                <br/>
                {<h5> Name : {user.name}</h5>}
                {<h5> LastName : {user.lastName}</h5>}
                {<h5> Mail : {user.mail}</h5>}
                {<h5> Role : {user.role}</h5>}
            </div> 



            
        </div>
    )

}



