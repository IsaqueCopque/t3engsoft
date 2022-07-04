import React from 'react';
import axios from 'axios';
import Home from './Home.jsx';
import Login from './Login.jsx';
import { CookiesProvider, useCookies } from 'react-cookie';

const api = axios.create({ 
  baseURL: "http://localhost:8081/",
  withCredentials: true,
});

const Ensino = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token", "cargo"]);
    return(
        <CookiesProvider>
          {cookies["token"]? 
          <Home api={api} cookies={cookies} removeCookie={removeCookie}/> 
          : 
          <Login api={api} setCookie={setCookie}/>
          }
        </CookiesProvider>
      );
};

export default Ensino;