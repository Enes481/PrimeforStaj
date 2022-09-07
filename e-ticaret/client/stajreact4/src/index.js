import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import IsLoginContextProvider from './Contexts/isLoginContex';
import { UserProvider } from "./Contexts/userContext"
import ProductIdContextProvider from './Contexts/ProductIdContext';
import { FileProvider } from './Contexts/FileContext';
import { AuthProvider } from './Contexts/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>

    <IsLoginContextProvider>
      <UserProvider>
        <ProductIdContextProvider>
          <FileProvider>
            <AuthProvider>

              <App />

            </AuthProvider>
          </FileProvider>
        </ProductIdContextProvider>
      </UserProvider>
    </IsLoginContextProvider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
