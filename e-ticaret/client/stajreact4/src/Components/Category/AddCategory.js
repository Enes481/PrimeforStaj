import React, { useState } from 'react';
import axios from 'axios';
import '../../Css/Space.css'




export default function AddCategory() {

  const [categoryName, setcategoryName] = useState('');
  const [categoryDescription, setcategoryDescription] = useState('');
  const [categoryImage, setImage] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();


    axios({
      method: 'post',
      url: 'http://localhost:64082/api/categories/add',
      data: {
        categoryName,
        categoryDescription,
        categoryImage,
      }
    }).then(() => {
      window.alert(`${categoryName} successfully added`)
    })

  }

  return (

    <div className='space'>


      <div className="create">
        <h2>Add a New Category</h2>
        <form onSubmit={handleSubmit}>
          <label>Category Name:</label>
          <input
            type="text"
            required
            value={categoryName}
            onChange={(e) => setcategoryName(e.target.value)}
          />
          <label>Category Description:</label>
          <textarea
            required
            value={categoryDescription}
            onChange={(e) => setcategoryDescription(e.target.value)}
          ></textarea>
          <label>Category Image URL:</label>
          <input
            type="text"
            required
            value={categoryImage}
            onChange={(e) => setImage(e.target.value)}
          />

          <button>Add Category</button>
        </form>
      </div>
    </div>
  );
}

