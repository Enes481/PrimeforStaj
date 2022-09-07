import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Css/AddProduct.css'
import { ProductAddSchema } from "../../validations/productAddSchema"
import { useFormik } from 'formik'
import { useFileContext } from '../../Contexts/FileContext'
import { useParams } from 'react-router-dom';

function UpdateProduct() {

 

  //fetch data 
  const [colors, SetColors] = useState([])
  const [brands, SetBrands] = useState([])
  const [categories, SetCategories] = useState([])
  const [usedStatus, SetUsedStatus] = useState([])
  

  const userId = localStorage.getItem("userID")
  const { id } = useParams()
  //console.log(id)
  //image set
  const { baseImage, setBaseImage } = useFileContext();

  const image = {
    image: baseImage
  }

  //image convert base 64 format
  async function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
     
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
       
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }


  //upload image
  async function uploadImage(event) {
    const file = event.target.files[0];
    console.log(file.size)
    if(file.size > 409600){
        window.alert("image size is too large !.")
    }
    else{
      const base64 = await convertBase64(file);
      setBaseImage(base64);
      console.log(baseImage)
    }
   

  }


  useEffect(() => {
     getAll()
    
  }, [])



  async function getAll() {


    //getall colors
    axios.get('http://localhost:64082/api/color/getall')
      .then(response => {
        SetColors(response.data)
      }).catch(error => {
        return alert("Error: " + error);
      })

    //getall brands
    axios.get('http://localhost:64082/api/brand/getall')
      .then(response => {
        SetBrands(response.data)
      }).catch(error => {
        return alert("Error: " + error);
      })


    //getall categories
    axios.get('http://localhost:64082/api/categories/getall')
      .then(response => {
        SetCategories(response.data)
      }).catch(error => {
        return alert("Error: " + error);
      })

    //getall usingstatus (new or used)
    axios.get('http://localhost:64082/api/usingstatus/getall')
      .then(response => {
        SetUsedStatus(response.data)
      }).catch(error => {
        return alert("Error: " + error);
      })


  }


  const { handleSubmit, handleChange, values, errors, touched } =
    useFormik({

      initialValues: {
        productId:id,
        productName: "",
        productDescription: "",
        colorId: "",
        brandId: "",
        categoryId: "",
        price: "",
        usingStatusId: "",
        isOfferable: "",
        OwnerId: userId,
        productImage: ""
      },
      onSubmit: (values) => {



        if (values.isOfferable === "false")
          values.isOfferable = false
        else if (values.isOfferable === "true")
          values.isOfferable = true

        values.productImage = image.image

        axios.post('http://localhost:64082/api/products/updateproductbyid', values)
          .then(result => {
            //console.log(result)
            window.alert(`${values.productName} product successfully added`)

          })
          .catch(error => {
            console.log(error)
            window.alert("something went wrong....")

          })

      },
      validationSchema: ProductAddSchema
    })



  return (

    <div className='space'>


      <div className="create">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Product Name:</label>
          <input
            type="text"
            name='productName'
            value={values.productName}
            onChange={handleChange}
            placeholder="product name"
          />

          {errors.productName && touched.productName && (
            <div >{errors.productName}</div>
          )}

          <label>Product Description:</label>
          <textarea
            value={values.productDescription}
            onChange={handleChange}
            name="productDescription"
            placeholder='description'
          ></textarea>

          {errors.productDescription && touched.productDescription && (
            <div >{errors.productDescription}</div>
          )}

          <label>Product color name:</label>
          <select
            name='colorId'
            value={values.colorId}
            onChange={handleChange}>
            <option >select color</option>
            {
              colors?.map((color, index) => {

                return (<option key={index} value={color.colorId}>{color.name}</option>)
              })
            }
          </select>

          {errors.colorId && touched.colorId && (
            <div  >{errors.colorId}</div>
          )}



          <label>Product brand name:</label>
          <select
            name='brandId'
            value={values.brandId}
            onChange={handleChange}>
            <option >select brand</option>
            {
              brands?.map((brand, index) => {
                return (<option key={index} value={brand.brandId}>{brand.name}</option>)
              })
            }
          </select>

          {errors.brandId && touched.brandId && (
            <div >{errors.brandId}</div>
          )}

          <label>Product category name:</label>
          <select
            name='categoryId'
            value={values.categoryId}
            onChange={handleChange}>
            <option >select category</option>
            {
              categories?.map((category, index) => {
                return (<option key={index} value={category.categoryId}>{category.categoryName}</option>)
              })
            }
          </select>
          {errors.categoryId && touched.categoryId && (
            <div >{errors.categoryId}</div>
          )}

          <label>Product Price:</label>
          <input
            type="number"
            name='price'
            value={values.price}
            onChange={handleChange}
            placeholder="price TL"
          />
          {errors.price && touched.price && (
            <div >{errors.price}</div>
          )}


          <label>select used state</label>
          <select
            name='usingStatusId'
            value={values.usingStatusId}
            onChange={handleChange}
          >


            {
              usedStatus.map((state, index) => {

                return (<option key={index} value={state.usingStatusId}>{state.usedStatus}</option>)
              })
            }
          </select>
          {errors.usingStatusId && touched.usingStatusId && (
            <div >{errors.usingStatusId}</div>
          )}


          <label>is Offerable</label>
          <select
            name='isOfferable'
            value={values.isOfferable}
            onChange={handleChange}
          >


            <option>true</option>
            <option>false</option>

          </select>
          {errors.isOfferable && touched.isOfferable && (
            <div >{errors.isOfferable}</div>
          )}



          <label>product image:</label>
          <input
            id="imgs"
            type="file"
            name="productImage"
            accept="image/png, image/jpeg,image/jpg"
            onChange={(e) => uploadImage(e)} />

          <br />

          <img src={baseImage} width="200px" height="200px" />
         
          {/*image file*/}

          <br />
          <br />
          <div>
            <button type='submit' >Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;