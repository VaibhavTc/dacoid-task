import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/auth/Login.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import UrlShortener from "./components/urls/UrlShortener.js";
import Navbar from "./components/layout/Navbar.js";
import Signup from "./components/auth/Signup.js";

// Protected route component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navbar />
                <div className="container mx-auto py-8 px-4">
                  <UrlShortener />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Navbar />
                <div className="container mx-auto py-8 px-4">
                  <Dashboard />
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
