import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../Css/Space.css'
import {useFormik} from 'formik'
import {useNavigate} from "react-router-dom"


export default function UpdateColor() {

  const { id } = useParams()
 
  const url = `http://localhost:64082/api/color/getbyid/${id}`
  const urlUpdateColor = `http://localhost:64082/api/color/update`


  const [colorName, setColorName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {

    axios.get(url)
      .then(response => {
        setColorName(response.data.name)
       
      })
      .catch(error => {
        console.log(error)
      })
    
  }, []);

  const handleSubmitForm = (e) => {
    
    const data = {
      colorId : id,
      name : colorName,
      
    }
    console.log(data);

    axios.post(urlUpdateColor,data)
         .then(function(result){
            if(result.status === 200){
                window.alert("color updated.")
                console.log(result)
                navigate("/AddColor")
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
          name="colorName"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          placeholder="color name "
        />

 
        <div>
          <button type="submit" className="btn btn-danger">EDIT</button>

        </div>
      </form>
    </div>

  )
}

