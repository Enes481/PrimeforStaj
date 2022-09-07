import { Route, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import '../../Css/Button.css'
import { isLoginContext } from "../../Contexts/isLoginContex";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { productIdContext } from "../../Contexts/ProductIdContext";





export default function ProductList() {

    // const { products } = useContext(ProductByIdContext);

    //kullanıcı giriş yaptıysa eğer teklif verme butonu açık olsun yoksa gözükmesin
    const { isLogin } = useContext(isLoginContext)

    const navigate = useNavigate();

    //kategori id sini aldık. Kategori id sine göre ürünleri getirmek için.
    const { id } = useParams()

    //console.log("id-->", id)
    const{productid, setProductId} = useContext(productIdContext)
    //giriş yapan kullanıcının id si bunu ürünlerde eğer giriş yapan kişi ürünün sahibi ise teklif veremesin diye aldık.
    const userId = localStorage.getItem("userID")
   

    const [products, SetProducts] = useState({});
    const [imagedata,setimagedata] = useState("")

    const url = `http://localhost:64082/api/products/getproductbycategoryid/${id}`


    
    const values ={
        productId:"",
        colorId:"",
        brandId:"",
        categoryId:"",
        UsingStatusId:"",
        ownerId:"",
        isOfferable:"",
        productName:"",
        productDescription:"",
        isSold:"",
        comments:"",
        price:"",
        image:""
    }




    const fetchData = () => {

        axios.get(url)
            .then(response => {
                SetProducts(response.data)
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


function buyproduct(product){

    
    values.productId = product.productId
    values.colorId = product.colorId
    values.brandId = product.brandId
    values.categoryId = product.categoryId
    values.UsingStatusId = product.usingStatusID
    values.ownerId = userId
    values.isOfferable=false
    values.productName = product.productName
    values.productDescription = product.productDescription
    values.isSold = true
    values.price = product.price
    values.productImage = product.image
   

    axios.post('http://localhost:64082/api/products/buyproduct',values)
         .then(function(response){
        if(response.status === 200)
        {
           window.alert("ürün başarıyla alındı.")
           fetchData()
        }
    }).catch((error)=>{
       console.log(error)
    })

    
}

 function handleShow(product){

    console.log({product})
        confirmAlert({
            title: 'WARNING!',
            message: 'Are you sure to buy product!',
            buttons: [
              {
                label: 'Yes',
                onClick: () => buyproduct(product)
              },
              {
                label: 'No',
                
              }
            ]
          });
    }

    function handleProductID(id){
        setProductId(id)
        navigate("./GiveOfferProduct")
    }



    return (
        <>
            <div>
        
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>product is offerable</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product is sold</th>
                            <th>Category Name</th>
                            <th>Brand Name</th>
                            <th>Color Name</th>
                            <th>Product Price</th>
                            <th>using state</th>
                            <th>Product image</th>
                            <th>buy</th>
                            <th>give offer</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {products.data?.map((product) => (
                           
                         
                            <tr>
                                  
                                <td>{product.productId}</td>
                                <td>{String(product.isOfferable)}</td>
                                <td>{product.productName}</td>
                                <td>{product.productDescription}</td>
                                <td>{String(product.isSold)}</td>
                                <td>{product.categoryName}</td>
                                <td>{product.brandName}</td>
                                <td>{product.colorName}</td>

                                <td>{`${product.price} TL`}</td>
                                <td>{product.usedStatus}</td>
                                <td><img width="100px" height="100px" src={`${product.image}`} /></td>
                                <td>
                                    {product.ownerID != userId && !product.isSold && localStorage.getItem("islogin") &&<button 
                                    className="button"
                                    onClick={()=>handleShow(product)}>buy</button>}
                                </td>
                                <td>
                               
                                    {product.ownerID != userId && !product.isSold && product.isOfferable && localStorage.getItem("islogin") && 
                                    <button 
                                    onClick ={ () => handleProductID(product.productId) } 
                                    className="button">give offer</button>}
                                </td>
                            </tr>
                            
                        ))}



                    </tbody>
                </table>



            </div>
        </>
    )


}

