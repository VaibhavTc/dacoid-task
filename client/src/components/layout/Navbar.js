// src/components/layout/Navbar.js
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const isDashboard = window.location.pathname === "/dashboard";
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold ">
              URL Shortener
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isDashboard ? (
              <Link
                to="/"
                className="hover:text-indigo-200 bg-indigo-700 hover:bg-indigo-800  px-4 py-2 rounded"
              >
                Short URL
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="hover:text-indigo-200 hover:bg-indigo-800 bg-indigo-700  px-4 py-2 rounded"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
