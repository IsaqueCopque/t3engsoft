import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Inst from './Inst';
import InstVali from './InstVali';
import Home from './Home';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/instVali' element={<InstVali />} />
          <Route path='/instEn' element={<Inst />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);