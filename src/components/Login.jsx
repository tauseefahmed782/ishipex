import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icon for visibility toggle
const Login = ({ onLoginSuccess, onLoginFailure }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // For mobile number input
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [passwordVisible, setPasswordVisible] = useState(false); // Add state for password visibility toggle

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem("id");
    const storedPhone = localStorage.getItem("phoneNumber");

    if (storedToken && storedPhone) {
      // Assume user is logged in and invoke onLoginSuccess
      onLoginSuccess({ token: storedToken, fullPhoneNumber: storedPhone });
    }
  }, [onLoginSuccess]);

  const handleLogin = async () => {
    // Check if either email or phone and password are provided
    if ((!email && !phone) || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true); // Set loading state to true
    setError(""); // Clear previous error

    try {
      const phoneParts = phone.split(" "); // Splits into country code and mobile number
      const ccode = phoneParts[0]; // Country code part (ccode)

      const response = await axios.post(
        "https://admin.beingmotherstore.com/parc_api/user_login.php",
        {
          mobile: phone.slice(2, 12), // Use only mobile number
          ccode: "+" + ccode.slice(0, 2), // Send the country code as a separate field
          password,
        }
      );

      // Log the response for debugging
      console.log("API Response:", response.data);

      // Handle the response from the API
      if (response.data.ResponseCode === "200") {
        const { ccode, mobile, id } = response.data.UserLogin;
        const fullPhoneNumber = `${ccode}${mobile}`; // Concatenate country code and mobile number

        // Save user data in localStorage
        localStorage.setItem("id", id); // Save token
        localStorage.setItem("phoneNumber", fullPhoneNumber); // Save phone number
        // Pass full phone number and token on login success
        onLoginSuccess({ token: id, fullPhoneNumber });
      } else {
        setError(response.data.ResponseMsg || "Invalid login credentials");
        onLoginFailure(response.data.ResponseMsg || "Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error); // Log error for debugging
      setError("An error occurred. Please try again later.");
      onLoginFailure("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };


  return (
    <div className="login_form">
      {error && <div className="error">{error}</div>}

      {/* Email or Phone number input */}
      <div>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={!phone} 
        />
        <PhoneInput
          international
          country={'ae'}
          value={phone}
          onChange={setPhone}
          placeholder="Phone Number"
        />
      </div>

    {/* Password Input with Toggle */}
    <div className="input-group my-3">
      <input
        type={passwordVisible ? "text" : "password"}
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      {/* <div>
        <input
          type="password"
          className="form-control my-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div> */}


     <div className="m-auto text-center">
     <button 
        onClick={handleLogin}
        className="btn  btn_login"
        disabled={isLoading}
      >
        {isLoading ? "Logging In..." : "Log In"}
      </button>
     </div>
    </div>
  );
};

export default Login;
