import React from "react";
import Root from "../pages/Root";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

export default createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Root />} />
    </Route>
  )
