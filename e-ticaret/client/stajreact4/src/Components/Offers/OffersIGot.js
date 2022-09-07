import axios from "axios"
import { useEffect, useState } from "react"
import Header from "../SideBar/Header"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function OffersIGot() {

    const userId = localStorage.getItem("userID")
    const [offersIGot, SetOffersIGot] = useState([])
    

    function getOffersIGot() {
        axios.get(`http://localhost:64082/api/offer/getoffersigot/${userId}`).then(response => {
            SetOffersIGot(response.data)
            console.log({ offersIGot })
        }).catch(e => {
            console.log(e)
        })
    }


    function DeclineOffer(OfferId){
        axios.delete(`http://localhost:64082/api/offer/cancelOffer/${OfferId}`).then(res=>{
            getOffersIGot()
            console.log("başarıyla teklif silindi")
       }).catch(er=>{
        console.log(er)
       })
    }

    function updateOfferStatus(product){
        
        product.isApproved = true;

        axios.post(`http://localhost:64082/api/offer/UpdateIsApprovedOffer/${product.offerId}`)
        .then(function(response){
       if(response.status === 200)
       {
          
          window.alert("offer başarıyla kabul edildi..")
          //DeclineOffer(OfferID)
       }
   }).catch((error)=>{
      console.log(error)
   })
    }


    function handleShowDecline(OfferId){

        console.log(OfferId)
            confirmAlert({
                title: 'WARNING!',
                message: 'Incoming offer will be cancelled. Are you sure?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => DeclineOffer(OfferId)
                  },
                  {
                    label: 'No',
                    
                  }
                ]
              });
        }

        function handleShowAccept(product){

            
                confirmAlert({
                    title: 'WARNING!',
                    message: 'Are you sure you want to accept offer?',
                    buttons: [
                      {
                        label: 'Yes',
                        onClick: () => updateOfferStatus(product)
                      },
                      {
                        label: 'No',
                        
                      }
                    ]
                  });
            }
    



    useEffect(() => {

        getOffersIGot()
    }, [])


    return (

        
        <>
        
        <Header/>
        <br/>
        <br/>
        <h2>Offers on my products</h2>
            <div>
                
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Category Name</th>
                            <th>Brand Name</th>
                            <th>Color Name</th>
                            <th>Product Price</th>
                            <th>Offered Price</th>
                            <th>is Approved</th>
                            <th>Accept Offer</th>
                            <th>Decline Offer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offersIGot.data?.map((product) => (


                            <tr>
                                <td>{ product.productId}</td>
                                <td>{ product.productName}</td>
                                <td>{product.productDescription}</td>
                                <td>{product.categoryName}</td>
                                <td>{product.brandName}</td>
                                <td>{product.colorName}</td>
                                <td>{`${product.price} TL`}</td>
                                <td>{`${product.offerPrice} TL`}</td>
                                <td>{String(product.isApproved)}</td>
                                <td>
                               { !product.isApproved &&<button 
                                        className="button"
                                        onClick={()=>handleShowAccept(product)}>accept</button>}
                                </td>
                                <td>
                                    { !product.isApproved &&<button 
                                        className="btn btn-danger"
                                        onClick={()=>handleShowDecline(product.offerId)}>decline</button>}
                                </td>
                            </tr>

                        ))}



                    </tbody>
                </table>



            </div>
        </>

    )
}