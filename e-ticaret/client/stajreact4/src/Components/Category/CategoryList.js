import React, { useEffect, useState,useContext } from "react"
import { Link} from "react-router-dom";
import "../../Css/Categories.css"
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {isLoginContext} from '../../Contexts/isLoginContex'
import { AuthContext } from "../../Contexts/AuthContext";


export default function CategoryList() {



    const [Categories, SetCategories] = useState([]);
    const url = 'http://localhost:64082/api/categories/getall'
    const {isLogin} = useContext(isLoginContext)
    const {userrole} = useContext(AuthContext);


    function getall() {
        axios.get(url)
            .then(response => {
                SetCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getall()

    }, [])


    const truncateOverview = (string, maxLength) => {
        if (!string) return null;
        if (string.length <= maxLength) return string;
        return `${string.substring(0, maxLength)} ...`;
    }


    function deleteCategory(id) {


        console.log("id", id)
        fetch(`http://localhost:64082/api/categories/delete/${id}`,{ method: 'DELETE' })
            .then(() => {
                getall()
        }) 


    }

    

    function handleShow(id){

        confirmAlert({
            title: 'WARNING!',
            message: 'Are you sure to delete category!',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteCategory(id)
              },
              {
                label: 'No',
                
              }
            ]
          });
    }
 
    return (

        <div className="categories">

            {Categories.map((category, i) => (

                <div className="category" key={i}>
                    <div className="inner-category">
                        <Link className="image-body" to={`/ProductList/${category.categoryId}`} >

                            <img src={category.categoryImage} className="image" alt="" />

                        </Link>
                        <div className="category-body">
                            <div>
                                <h5 className="">{category.categoryName}</h5>
                                <p className="">{truncateOverview(category.categoryDescription, 50)}</p>
                                <Link to={`/UpdateCategory/${category.categoryId}`}>
                                    {localStorage.getItem("userrole") && localStorage.getItem("islogin") &&<button className="btn btn-warning" variant="primary" >
                                        EDIT
                                    </button>}
                                </Link>

                             

                               {localStorage.getItem("userrole") && localStorage.getItem("islogin")&& <button
                                    onClick={()=>handleShow(category.categoryId)}
                                    className="btn btn-danger"
                                    variant="primary" >

                                    DELETE
                                </button>
}
                              
                              

                            </div>

                        </div>
                    </div>
                </div>

            ))}



        </div>

    )
};






