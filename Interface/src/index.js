import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

//Components
import Login from './Components/Login';
import Home from './Components/Home';
import './index.css';

const Router = () =>{
  //States
  const [token, setToken] = React.useState({auth: false, inst: false, level: "funcionario"});

  return(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home token={token} setToken={setToken}/>} />
          <Route path='/login/:inst' element={<Login setToken={setToken}/>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router/>);