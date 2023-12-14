import React, { useState } from "react";
import { motion } from 'framer-motion';
import axios from 'axios'; // Don't forget to import axios
import "./settings.scss";

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      // Add logic to submit the new password to the server
      const response = await axios.post('http://localhost:3001/change-password', { newPassword });
      
      // Optionally, handle the response from the server
      console.log('Password change successful:', response.data);

      // Clear input fields and reset error state
      setNewPassword("");
      setConfirmPassword("");
      setError("");

      // Optional: Provide feedback to the user (e.g., display a success message)
      // You can use a state to manage success messages or a notification system
    } catch (error) {
      console.error('Password change error:', error);

      // Handle password change error (e.g., display an error message to the user)
      setError("Password change failed. Please try again.");
    }
  };

  return (
    <div className="settings">
      <motion.h1
        className="settingmain"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Change your Password
      </motion.h1>

      <motion.div
        className="settingform"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handlePasswordChange}>
          <label>New Password</label>
          <br />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />

          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />

          {error && <div className="error-message">{error}</div>}

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Settings;
