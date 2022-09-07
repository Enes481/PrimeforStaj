import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../Css/Space.css'
import {useFormik} from 'formik'
import {useNavigate} from "react-router-dom"


export default function UpdateColor() {

  const { id } = useParams()
 
  const url = `http://localhost:64082/api/brand/getbyid/${id}`
  const urlUpdateBrand = `http://localhost:64082/api/brand/update`


  const [brandName, setBrandName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {

    axios.get(url)
      .then(response => {
        setBrandName(response.data.name)
       
      })
      .catch(error => {
        console.log(error)
      })
    
  }, []);

  const handleSubmitForm = (e) => {
    
    const data = {
        brandId : id,
      name : brandName,
      
    }
    console.log(data);

    axios.post(urlUpdateBrand,data)
         .then(function(result){
            if(result.status === 200){
                window.alert("brand updated.")
                console.log(result)
                navigate("/AddBrand")
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
          name="brandName"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="brand name "
        />

 
        <div>
          <button type="submit" className="btn btn-danger">EDIT</button>

        </div>
      </form>
    </div>

  )
}

