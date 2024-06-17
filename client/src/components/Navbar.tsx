import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/companyLogo.jpg";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="navbar-logo">
          <img className="navbar-img" src={logo} alt="Company Logo" />
        </div>
      </Link>

      <Link to="/location">
        <div className="navbar-location">
          <span>Delivery Location:</span>
          <input type="text" placeholder="Enter your location" />
        </div>
      </Link>

      <form className="navbar-search-bar" action="">
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>

      <div className="navbar-account">
        <div className="account-dropdown">
          <button className="account-btn">My Account</button>
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
        <h2 className="navbar-signin">Sign in</h2>
      </Link>
      <Link to="/cart">
        <h2 className="navbar-cart">
          <img className="navbar-img" src={logo} alt="Company Logo" />
        </h2>
      </Link>
    </div>
  );
};

export default Navbar;
