import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/companyLogo.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Navbar Component KUSHAGRA BHARTI Kentaro Barnes is KB

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="navbar-logo">
          <img className="navbar-img" src={logo} alt="Company Logo" />
        </div>
      </Link>

      <form className="navbar-search-bar" action="">
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>

      <div className="navbar-account">
        <div className="account-dropdown">
          <h2 className="account-btn">My Account</h2>
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </div>

      <Link to="/signin" className="navbar-icon">
        <ShoppingCartIcon />
      </Link>
      <Link to="/cart" className="navbar-icon">
        <ShoppingCartIcon />
      </Link>
      <Link to="/admin" className="navbar-icon">
        Admin
      </Link>
    </div>
  );
};

export default Navbar;
