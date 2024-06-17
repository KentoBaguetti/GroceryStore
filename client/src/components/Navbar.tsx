import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="/path/to/logo.png" alt="Company Logo" />
      </div>

      <div className="navbar-location">
        <span>Delivery Location:</span>
        <input type="text" placeholder="Enter your location" />
      </div>

      <form className="search-bar" action="">
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>

      <div className="navbar-account">
        <div className="account-dropdown">
          <button className="account-btn">My Account</button>
          <div className="dropdown-content">
            <a href="/profile">Profile</a>
            <a href="/orders">Orders</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      </div>

      <button className="nav-signin">Sign in</button>
      <h2 className="nav-cart">
        <img src="/path/to/logo.png" alt="Company Logo" />
      </h2>
    </div>
  );
};

export default Navbar;
