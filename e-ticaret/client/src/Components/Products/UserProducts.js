import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import '../../Css/Space.css'
import Header from "../SideBar/Header.js"
import { Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import

export default function UserProducts() {


    //s console.log(localStorage.getItem("userID"))

    const [ProductsUser, setUserProducts] = useState({})
    const id = localStorage.getItem("userID")
    const url = `http://localhost:64082/api/products/getproductbyuserid/${id}`

    //const {ProductsUser} = UseUserProducts()

    function fetchProducts(){

        axios.get(url)
        .then(response => {
            setUserProducts(response.data)
            console.log("ProductsUser", { ProductsUser })
        }).catch(err => {
            console.log(err)
        })
    }


    console.log({ ProductsUser })

    useEffect(() => {
        fetchProducts()
      
    }, [])





    const deleteProduct = (id) => {

        axios.post(`http://localhost:64082/api/products/delete/${id}`)
          .then(() => {
            fetchProducts()
    
          }).catch(error => {
            return alert("Error: " + error);
          })
      }




    function handleShow(id){

        confirmAlert({
            title: 'WARNING!',
            message: 'Are you sure to delete product!',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteProduct(id)
              },
              {
                label: 'No',
                
              }
            ]
          });
    }



    return (


        <>
            <br />


            <Header />
            <h2>MY PRODUCTS</h2>
            <div className='space'>

                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>owner name</th>
                            <th>owner last name</th>
                            <th>owner mail</th>
                            <th>product is offerable</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product is sold</th>
                            <th>Category Name</th>
                            <th>Brand Name</th>
                            <th>Color Name</th>
                            <th>Product Price</th>
                            <th>using state</th>
                            <th>product Image</th>
                            <th>edit</th>
                            <th>delete</th>

                        </tr>
                    </thead>

                    <tbody>
                        {ProductsUser.data?.map((p) => (

                            <tr>
                                <td>{p.productId}</td>
                                <td>{p.userName}</td>
                                <td>{p.userLastName}</td>
                                <td>{p.userMail}</td>
                                <td>{String(p.isOfferable)}</td>
                                <td>{p.productName}</td>
                                <td>{p.productDescription}</td>
                                <td>{String(p.isSold)}</td>
                                <td>{p.categoryName}</td>
                                <td>{p.brandName}</td>
                                <td>{p.colorName}</td>
                                <td>{`${p.price} TL`}</td>
                                <td>{p.usedStatus}</td>
                                <td><img width="100px" height="100px" src={`${p.productImage}`} /></td>
                                <td>
                                    <Link to={`/UpdateProduct/${p.productId}`}>
                                        <button className="btn btn-warning" variant="primary" >
                                            edit
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleShow(p.productId)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>

                        ))}


                    </tbody>
                </table>



            </div>
        </>

    )
}

