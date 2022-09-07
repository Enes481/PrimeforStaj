import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../Css/Space.css'
import {useFormik} from 'formik'

export default function UpdateCategory() {

  const { id } = useParams()
 
  const url = `http://localhost:64082/api/categories/getbyid/${id}`
  const urlUpdateCategory = `http://localhost:64082/api/categories/update`


  const [category, setCategory] = useState({})
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");


  useEffect(() => {

    axios.get(url)
      .then(response => {
        setCategoryName(response.data.categoryName)
        setCategoryDescription(response.data.categoryDescription)
        setCategoryImage(response.data.categoryImage)
      })
      .catch(error => {
        console.log(error)
      })
    
  }, []);

  const handleSubmitForm = (e) => {
    
    const data = {
      categoryId : id,
      categoryName : categoryName,
      categoryDescription : categoryDescription,
      categoryImage : categoryImage,
      categoryStatus : true
    }
    console.log(data);

    axios.post(urlUpdateCategory,data)
         .then(function(result){
            if(result.status === 200){
                window.alert("category updated.")
                console.log(result)
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
          name="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="category name"
        />

 
        <label htmlFor="inputName">Category Description</label>
        <input type="text"
          className="form-control"
          name="categoryDescription"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />

        <label htmlFor="inputName">Category Image</label>
        <input type="text"
          className="form-control"
          name="categoryImage"
          value={categoryImage}
          onChange={(e) => setCategoryImage(e.target.value)}
        /> 
        <div>
          <button type="submit" className="btn btn-danger">EDIT</button>

        </div>
      </form>
    </div>

  )
}

