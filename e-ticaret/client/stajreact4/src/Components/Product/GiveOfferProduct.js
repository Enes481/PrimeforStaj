import { useFormik } from 'formik'
import { OfferSchema } from '../../validations/OfferSchema';
import { useEffect, useState } from 'react';
import '../../Css/Space.css'
import { productIdContext } from '../../Contexts/ProductIdContext';
import { useContext } from 'react'
import axios from 'axios';




export default function GiveOfferProduct() {

  const url = "http://localhost:64082/api/offer/add"

  const [designation, setSDesignation] = useState(false);
  const [showOption, setShowOption] = useState(false);

  const { productid } = useContext(productIdContext)

  const userId = localStorage.getItem("userID")

  const [productDetail, SetProductDetails] = useState([]);

  


  const { handleSubmit, handleChange, values, errors, touched } =

    useFormik({
      initialValues: {
        OfferedPrice: "",
        productId: productid,
        userId: userId,
        isApproved: false

      },
      onSubmit: (values) => {

        //console.log(values.OfferedPrice)
        console.log(values)
        if (showOption) {
          axios.post(url, values).then(response => {
            console.log(response)
            window.alert("successfully ")
          }).catch(e => {
            console.log(e)
          })
        }
        else {

          values.OfferedPrice = ((productDetail.data[0].price * values.OfferedPrice) / 100)

          values.OfferedPrice = Math.ceil(values.OfferedPrice)
          
          axios.post(url, values).then(response => {
            console.log(response)
            window.alert("successfully ")
          }).catch(e => {
            console.log(e)
          })
        }





      },
      validationSchema: OfferSchema
    })


  function showProductDetails() {

    axios.get(`http://localhost:64082/api/products/getproductdetailsById/${productid}`).then(res => {
      SetProductDetails(res.data)
     
      console.log(productDetail.data[0].price)

    }).catch(e => {
      console.log(e)
    })
  }


  useEffect(() => {
    showProductDetails()
  }, [])


  return (


    <div className='space'>
      <div className="create">


        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product name</th>
              <th scope="col">color</th>
              <th scope="col">brand</th>
              <th scope="col">category</th>
              <th scope="col">price</th>
              <th scope="col">description</th>


            </tr>
          </thead>
          <tbody>


            {productDetail.data?.map((product) => (

              <tr>

                <td>{product.productName}</td>
                <td>{product.colorName}</td>
                <td>{product.brandName}</td>
                <td>{product.categoryName}</td>
                <td>{product.price} TL</td>
                <td>{product.productDescription}</td>

              </tr>

            ))}


          </tbody>
        </table>


        <form onSubmit={handleSubmit}>


          <label>choose one </label>
          <select
            name="offer"
            value={designation}
            type="text"
            onChange={(e) => {
              setSDesignation(e.target.value)
              if (e.target.value === "1") {
                setShowOption(true)
              }
              else if (e.target.value === "2") {
                setShowOption(false)
              }

            }}

          >
            <option value="1">give price in TL</option>
            <option value="2">give price %</option>

          </select>



          {showOption && <div className="create">
            <h2>give price in TL</h2>

            <label>offer price (TL):</label>
            <input
              type="number"
              name='OfferedPrice'
              value={values.OfferedPrice}
              onChange={handleChange}
              placeholder="please enter price for offer (TL)"
            />
          </div>}

          {showOption && errors.OfferedPrice && touched.OfferedPrice && (
            <div >{errors.OfferedPrice}</div>
          )}


          {!showOption && <div className="create">
            <h2>price as a percentage</h2>

            <label>offer price (%):</label>
            <input
              type="number"
              name='OfferedPrice'
              value={values.OfferedPrice}
              onChange={handleChange}
              placeholder="please enter price for offer (%)"
            />
          </div>}

          {!showOption && errors.OfferedPrice && touched.OfferedPrice && (
            <div >{errors.OfferedPrice}</div>
          )}

          <button type='submit' >give offer</button>



        </form>
      </div>
    </div>

  )
}

