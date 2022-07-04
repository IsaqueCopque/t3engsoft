import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Ensino from './Ensino/index.js';
import Validacao from './Validacao/index.js';
import './index.css';

const Router = () =>{
  return(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/ensino/' element={<Ensino/>} />
          <Route path='/validacao/' element={<Validacao/>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router/>);