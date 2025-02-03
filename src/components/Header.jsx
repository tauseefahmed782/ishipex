import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate
import { Dropdown } from "react-bootstrap"; // Importing dropdown from react-bootstrap
import { FaUserCircle } from "react-icons/fa"; // Icon for profile button

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // To store user's name
  const [userEmail, setUserEmail] = useState(""); // To store user's email
  const [userPhone, setUserPhone] = useState(""); // To store user's phone
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  useEffect(() => {
    // Check if the user is logged in by checking localStorage for the auth token
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
      // You can use your API to get user profile details here if needed
      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userEmail");
      const userPhone = localStorage.getItem("userPhone");
      setUserName(userName);
      setUserEmail(userEmail);
      setUserPhone(userPhone);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear the auth token and redirect to the login page
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    navigate(""); // Use navigate to redirect to the login page
  };

  return (
    <header className="header">
      <nav>
        {/* Your other nav items here */}
        {isLoggedIn && (
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
        )}
      </nav>
    </header>
  );
};

export default Header;
