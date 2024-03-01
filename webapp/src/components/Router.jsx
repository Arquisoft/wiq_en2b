import React from "react";
import Root from "../pages/Root";
import Layout from "./Layout";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

export default createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index element={<Root />} />
    </Route>
  )