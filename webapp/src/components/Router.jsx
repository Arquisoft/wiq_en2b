import React from "react";
import Root from "../pages/Root";
import Signup from "../pages/Signup";
import { Route,createRoutesFromElements } from "react-router-dom";

export default createRoutesFromElements(
    <Route path="/">
      <Route index element={<Root />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
