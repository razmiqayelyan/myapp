import React,{ useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Context from './components/Context';
import 'react-alice-carousel/lib/alice-carousel.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context>
      <App/>
    </Context>
  </React.StrictMode>
);

