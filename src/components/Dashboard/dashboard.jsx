import React from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Log Out");
    }
  }

  return (
    <div className="dashboard-main-div">
      <div className="profile-main-wrapper">
        <h1 className="profile-heading">Profile</h1>
        {error == "Failed to Log Out" && (
          <h2 className="failed-to-logout">{error}</h2>
        )}
        <div className="profile-info-wrapper">
          <h3 className="email-heading">
            <b>Email:</b> {currentUser.email}
          </h3>
          <h3 className="address-heading">
            <b>Address:</b>
          </h3>
        </div>
      </div>
      <div className="buttons-wrapper">
        <a href="/" className="home-a">
          <button className="home-button">Back to Home</button>
        </a>
        <button className="logout-button" onClick={() => handleLogout()}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
