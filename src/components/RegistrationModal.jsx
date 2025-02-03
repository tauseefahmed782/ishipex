import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const RegistrationModal = ({ onClose, onRegistrationSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async () => {
    if (!name || !email || !phone || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const phoneParts = phone.split(" ");
      const ccode = phoneParts[0];

      const response = await axios.post(
        "https://admin.beingmotherstore.com/parc_api/reg_user.php",
        {
          name,
          email,
          mobile: phone.slice(2, 12),
          ccode: "+" + ccode.slice(0, 2),
          password,
        }
      );

      if (response.data.ResponseCode === "200") {
        onRegistrationSuccess(response.data.ResponseMsg);
        onClose();
      } else {
        setError(response.data.ResponseMsg || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Register</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PhoneInput
          international
          defaultCountry="IN"
          value={phone}
          onChange={setPhone}
          placeholder="Phone Number"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegistration} disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegistrationModal;