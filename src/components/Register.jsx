import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const Register = ({ onRegisterSuccess, onRegisterFailure }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { name, email, phone, password, confirmPassword } = newUser;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all registration fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://admin.beingmotherstore.com/parc_api/reg_user.php",
        {
          name,
          email,
          mobile: phone.slice(2, 12),
          ccode: "+" + phone.slice(0, 2),
          password,
        }
      );

      if (response.data.ResponseCode === "200") {
        setRegistrationMessage("Sign Up Done Successfully!");

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify({ name, email, phone }));

      

        onRegisterSuccess();
      } else {
        setError(response.data.ResponseMsg || "Registration failed.");
        onRegisterFailure();
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <div>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleRegistrationChange}
          placeholder="Full Name"
          className="form-control mb-3"
          aria-label="Full Name"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleRegistrationChange}
          placeholder="Email"
          className="form-control mb-3"
          aria-label="Email"
        />
        <PhoneInput
          international
          country={'ae'}

          value={newUser.phone}
          onChange={(value) => setNewUser({ ...newUser, phone: value })}
          placeholder="Phone Number"
          aria-label="Phone Number"
        />
        <div className="input-group my-3">
        <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={newUser.password}
            onChange={handleRegistrationChange}
            placeholder="Password"
            className="form-control"
            aria-label="Password"
          />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                >
                  {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
            </div>
            
            <div className="input-group my-3">
            <input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={handleRegistrationChange}
            placeholder="Confirm Password"
            className="form-control"
            aria-label="Confirm Password"
          />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  >
                  {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
            </div>
       
 
    <div className="text-center">
    <button
        className="btn btn_register"
        onClick={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </div>
    
        </div>
      {registrationMessage && <div className="message">{registrationMessage}</div>}
    </div>
  );
};

export default Register;
