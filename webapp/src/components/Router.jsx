import React from "react";
import Root from "../pages/Root";
import Login from "../pages/Login";
import { Route, createRoutesFromElements } from "react-router-dom";

export default createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Root />} />
      <Route path="/login" element={<Login />}/>
    </Route>
  )
