import React from "react";
import { Route, createRoutesFromElements } from "react-router-dom";

import Root from "../pages/Root";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Rules from "../pages/Rules";
import Signup from "../pages/Signup";
import Game from "../pages/Game";
import Results from "../pages/Results";
import Statistics from "pages/Statistics";
import ProtectedRoute from "./utils/ProtectedRoute";
import Logout from "pages/Logout";
import About from "pages/About";

export default createRoutesFromElements(
  <Route path="/">
    <Route index element={<Root />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />}/>
    <Route path="/about" element={<About />} />
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/" element={<ProtectedRoute />}>

      <Route path="/dashboard/rules" element={<Rules />}/>
      <Route path="/dashboard/game" element={<Game />}/>
      <Route path="/dashboard/game/results" element={<Results />}/>
      <Route path="/dashboard/statistics" element={<Statistics />} />
      <Route path="/logout" element={<Logout />} />
    </Route>
  </Route>
)
