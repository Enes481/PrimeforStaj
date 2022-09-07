import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../SideBar/Header"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function UserOffers() {

    const [userOffers, setUserOffers] = useState([])
    const userid = localStorage.getItem("userID")
    const url = `http://localhost:64082/api/offer/getuseroffers/${userid}`



    const values = {
        
        productId:"",
        colorId:"",
        brandId:"",
        categoryId:"",
        usingStatusId:"",
        ownerId:"",
        isOfferable:"",
        productName:"",
        productDescription:"",
        isSold:"",
        comments:"",
        price:"",
        productImage:""
    }


    function getAllOffers(){
        axios.get(url)
        .then(response => {
            setUserOffers(response.data)
            console.log({ userOffers })
        }).catch(err => {
            console.log(err)
        })

    } 

    useEffect(() => {
        getAllOffers()
       
    }, [])

    function handleOfferCancel(id) {
        
        console.log(id)
        axios.delete(`http://localhost:64082/api/offer/cancelOffer/${id}`).then(res=>{
            getAllOffers()
            console.log("başarıyla teklif silindi")
       }).catch(er=>{
        console.log(er)
       })

    }

    function buyProduct(offer){
        

        
        values.productId = offer.productId
        values.colorId = offer.colorId
        values.brandId = offer.brandId
        values.categoryId = offer.categoryId
        values.usingStatusId = offer.usingStatusId
        values.ownerId = offer.userId
        values.isOfferable=false
        values.productName = offer.productName
        values.productDescription = offer.productDescription
        values.isSold = true
        values.price = offer.offerPrice
        values.productImage = offer.productImage
      

        axios.post(`http://localhost:64082/api/products/updateproductbyid`,values)
        .then(function(response){
         if(response.status === 200){
            handleOfferCancel(offer.offerId)
            window.alert("ürün başarıyla alındı.")
         }

         })
        .catch(error =>{
             console.log(error)
             
             
       })

    }

    function handleShowCancel(offerid) {
        confirmAlert({
            title: 'WARNING!',
            message: 'Are you sure to cancel your offer!',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleOfferCancel(offerid)
                },
                {
                    label: 'No',

                }
            ]
        });
    }

    function handleShowBuy(offer) {
        confirmAlert({
            title: 'WARNING!',
            message: 'Are you sure to buy product!',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => buyProduct(offer)
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
            <h2>My Offers</h2>
            <div className='space'>


                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>owner of the product</th>
                            <th>bidder</th>
                            <th>Product Name</th>
                            <th>Category Name</th>
                            <th>Brand Name</th>
                            <th>Color Name</th>
                            <th>using state</th>
                            <th>Product Description</th>
                            <th>Product Price</th>
                            <th>Product offered Price</th>
                            <th>product image</th>
                            <th>buy product</th>
                            <th>cancel my offer</th>

                        </tr>
                    </thead>

                    <tbody>
                        {userOffers.data?.map((offer) => (

                            <tr>
                                <td>{offer.productId}</td>
                                <td>{offer.ownerFirstName}</td>
                                <td>{offer.userFirstName}</td>
                                <td>{offer.productName}</td>
                                <td>{offer.categoryName}</td>
                                <td>{offer.brandName}</td>
                                <td>{offer.colorName}</td>
                                <td>{offer.usingStatusName}</td>
                                <td>{offer.productDescription}</td>
                                <td>{`${offer.price} TL`}</td>
                                <td>{`${offer.offerPrice} TL`}</td>
                                <td><img width="100px" height="100px" src={`${offer.productImage}`} /></td>
                                <td>
                                    {offer.isApproved && <button
                                        className="btn btn-success"
                                        onClick={() => handleShowBuy(offer)}>buy</button>}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleShowCancel(offer.offerId)}>cancel</button>
                                </td>
                            </tr>

                        ))}


                    </tbody>
                </table>



            </div>
        </>

    )


}