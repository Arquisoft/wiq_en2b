import React from "react";
import { Route,createRoutesFromElements } from "react-router-dom";

import Root from "../pages/Root";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Rules from "../pages/Rules";
import Signup from "../pages/Signup";
import Game from "../pages/Game";
import Results from "../pages/Results";
import Statistics from "pages/Statistics";

export default createRoutesFromElements(
  <Route path="/">
    <Route index element={<Root />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />}/>
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/dashboard/rules" element={<Rules />}/>
    <Route path="/dashboard/game" element={<Game />}/>
    <Route path="/dashboard/game/results" element={<Results />}/>
    <Route path="/statistics" element={<Statistics />} />
  </Route>
)
