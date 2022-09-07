import { Route, Routes, NavLink } from 'react-router-dom'
import { isLoginContext } from './Contexts/isLoginContex';
import {useContext, useEffect, useState} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { AuthContext } from './Contexts/AuthContext';

import './Css/navbar.css'
import './App.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import LoginPage from './Components/Login/LoginPage'
import SignUpPage from './Components/SignUp/SignUpPage'
import Home from './Components/Home'
import ProductList from './Components/Product/ProductList'
import CategoryList from './Components/Category/CategoryList'
import AddCategory from './Components/Category/AddCategory'
import UpdateCategory from './Components/Category/UpdateCategory'
import AddProduct from './Components/Product/AddProduct'
import AddColor from './Components/Color/AddColor'
import AddBrand from './Components/Brand/AddBrand'
import GiveOfferProduct from './Components/Product/GiveOfferProduct'
import UserProducts from './Components/Products/UserProducts'
import MyAccount from './Components/Login/MyAccount';
import UserOffers from './Components/Offers/UserOffers';
import OffersIGot from './Components/Offers/OffersIGot';
import AddUsedState from './Components/UsedState/AddUsedState';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import UpdateColor from './Components/Color/UpdateColor';
import UpdateBrand from './Components/Brand/UpdateBrand';
import UpdateUsedState from './Components/UsedState/UpdateUsedState';
import UserSettings from './Components/SideBar/UserSettings';
import UpdateProduct from './Components/Product/UpdateProduct';



function App() {

  const [userRoleState,setUserRoleState] = useState(false)


  const {isLogin,setLogin} = useContext(isLoginContext)
  const {userrole,setUserRole} = useContext(AuthContext);
 
  
  function handleShow(){

    confirmAlert({
        title: 'WARNING!',
        message: 'Are you sure to log out your account!',
        buttons: [
          {
            label: 'Yes',
            onClick: () => setIsLogin()
          },
          {
            label: 'No',
            
          }
        ]
      });
}



  function setIsLogin(){
      setLogin(false)
     
  }
 

  return (
    
    
   
      <div id='nav'>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <ul className="nav navbar-nav navbar-right">
            <NavLink to="/" >Home </NavLink>
            <NavLink to="/LoginPage" >Login </NavLink>
            <NavLink to="/SignUpPage" >Sign Up </NavLink> {/* burası hep sabit gözükür*/}
            {userrole && isLogin &&<NavLink to="/AddCategory" >Add Category</NavLink> }
            {isLogin &&<NavLink to="/MyAccount" >My Acount</NavLink> }
            {isLogin &&<NavLink to="/AddProduct" >Add Product</NavLink>}
            {userrole &&isLogin &&<NavLink to="/AddColor" >Color</NavLink>}
            {userrole &&isLogin &&<NavLink to="/AddBrand" >Brand</NavLink>}
            {userrole &&isLogin &&<NavLink to="/AddUsedState" >Used State</NavLink>}
            {isLogin &&<NavLink to="/" onClick={()=>handleShow()} >Log Out</NavLink>}
           
          </ul>
        </nav>


        <div>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignUpPage" element={<SignUpPage />} />
            <Route path="/ProductList" element={<ProductList />} />
            <Route path="/CategoryList" element={<CategoryList />} />
            <Route path="/ProductList/:id" element={<ProductList />} />
            <Route path="/AddCategory" element={  <AddCategory />} />
            <Route path="/UpdateCategory/:id" element={ <UpdateCategory />} />
            <Route path="/AddProduct" element={ <AddProduct />} />
            <Route path="/AddColor" element={ <AddColor />} />
            <Route path="/AddBrand" element={ <AddBrand />} />
            <Route path="/MyAccount" element={<MyAccount/>} />
            <Route path="/ProductList/:id/GiveOfferProduct" element={<GiveOfferProduct/>} />
            <Route path="/UserProducts" element={<UserProducts/>} />
            <Route path="/UserOffers" element={<UserOffers/>} />
            <Route path="/OffersIGot" element={<OffersIGot/>} />
            <Route path="/AddUsedState" element={<AddUsedState/>} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/UpdateColor/:id" element={<UpdateColor />} />
            <Route path="/UpdateBrand/:id" element={<UpdateBrand />} />
            <Route path="/UpdateUsedState/:id" element={<UpdateUsedState />} />
            <Route path="/UserSettings" element={<UserSettings />} />
            <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
          </Routes>
          
        </div>
      </div>
     
  );

}

export default App;
