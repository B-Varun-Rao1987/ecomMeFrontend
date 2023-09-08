import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'; 
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// const dotenv=require('dotenv');
// dotenv.config({path:"frontend/config/config.env"});

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const container=document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
    </Provider>
  </React.StrictMode>
);



