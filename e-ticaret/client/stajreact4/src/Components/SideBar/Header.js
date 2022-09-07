import React, { useContext, useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../../Css/Header.css'
import { isLoginContext } from '../../Contexts/isLoginContex';
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext';


const Header = () => {

  const { isLogin, setLogin } = useContext(isLoginContext)

  const { userrole, setUserRole } = useContext(AuthContext);



  return (



    <Menu>



      <NavLink to="/" >Home</NavLink>

      {isLogin && <NavLink to="/UserOffers" >Offers</NavLink>}

      {isLogin && <NavLink to="/UserProducts" >Products</NavLink>}

      {isLogin && <NavLink to="/MyAccount" >My Account</NavLink>}

      {isLogin && <NavLink to="/OffersIGot" >offers on my products</NavLink>}

      {userrole && isLogin && <NavLink to="/UserSettings" >User Settings</NavLink>}

    </Menu>
  );
};
export default Header;