import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import ValueSelection from "./pages/ValueSelection";
import Startpage from "./pages/Startpage";
import PrivateRoute from "./components/PrivateRoute";
import "./styles/global.css";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/select-values"
          element={
            <PrivateRoute>
              <ValueSelection />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
