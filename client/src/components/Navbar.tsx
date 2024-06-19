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
            <Link to="/profile">
              <a href="/profile">Profile</a>
            </Link>

            <Link to="/orders">
              <a href="/orders">Orders</a>
            </Link>
            <Link to="/logout">
              <a href="/logout">Logout</a>
            </Link>
          </div>
        </div>
      </div>

      <Link to="/signin">
        <ShoppingCartIcon />
      </Link>
      <Link to="/cart">
        <ShoppingCartIcon />
      </Link>
    </div>
  );
};

export default Navbar;
