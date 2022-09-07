import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../Css/Space.css'
import {useFormik} from 'formik'
import {useNavigate} from "react-router-dom"


export default function UpdateColor() {

  const { id } = useParams()
 
  const url = `http://localhost:64082/api/usingstatus/getbyid/${id}`
  const urlUpdateUsingState = `http://localhost:64082/api/usingstatus/update`


  const [usedStatus, setUsingState] = useState("");
  let navigate = useNavigate();

  useEffect(() => {

    axios.get(url)
      .then(response => {
        setUsingState(response.data.usedStatus)
       
      })
      .catch(error => {
        console.log(error)
      })
    
  }, []);

  const handleSubmitForm = (e) => {
    
    const data = {
        usingStatusId : id,
        usedStatus : usedStatus,
      
    }
    console.log(data);

    axios.post(urlUpdateUsingState,data)
         .then(function(result){
            if(result.status === 200){
                window.alert("using state updated.")
                console.log(result)
                navigate("/AddUsedState")
            }
         }).catch(e=>{
          console.log(e)
          window.alert("error")
         }) 

    e.preventDefault();
  }


  
  return (

    <div className='space'>


      <form onSubmit={handleSubmitForm} >
        
        <input type="text"
          className="form-control"
          name="usedStatus"
          value={usedStatus}
          onChange={(e) => setUsingState(e.target.value)}
          placeholder="using state "
        />

 
        <div>
          <button type="submit" className="btn btn-danger">EDIT</button>

        </div>
      </form>
    </div>

  )
}

