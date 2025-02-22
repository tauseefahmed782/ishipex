import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate
import { Button, Dropdown } from "react-bootstrap"; // Importing dropdown from react-bootstrap
import { FaUserCircle } from "react-icons/fa"; // Icon for profile button

const Header = ({isLoggedIn,setIsLoggedIn,handleLogout,userName,showLoginModal,setShowLoginModal}) => {
  

  return (
    <header className="header">
      <nav>
        {/* Your other nav items here */}
        {isLoggedIn ? (
          <div className="profile-btn">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FaUserCircle size={24} />
                <span className="ml-2">{userName || "Profile"}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/my-account">
                  My Account
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/my-orders">
                  My Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ):<Button onClick={()=>setShowLoginModal(!showLoginModal)}>Login</Button>}
      </nav>
    </header>
  );
};

export default Header;
