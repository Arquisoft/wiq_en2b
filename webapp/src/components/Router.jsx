import React from "react";
import Root from "../pages/Root";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Rules from "../pages/Rules";

import { Route, createRoutesFromElements } from "react-router-dom";

export default createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Root />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/rules" element={<Rules />}/>
    </Route>
  )
