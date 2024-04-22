import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import router from 'components/Router';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import "./i18n";
import theme from "./styles/theme";

const root = ReactDOM.createRoot(document.querySelector("body"));
const browserRouter = createBrowserRouter(router);

root.render(
  <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={browserRouter} />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
