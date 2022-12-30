import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase.js";
import "./dashboard.scss";

function Dashboard() {
  const [error, setError] = useState("");
  const [finalAddress, setFinalAddress] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const db = firestore;

  useEffect(() => {
    async function fullAddress() {
      let street;
      let city;
      let country;
      let postalCode;
      const userRef = db.collection("users").doc(currentUser.uid);
      await userRef.get("Street").then((doc) => {
        street = doc.data()["Street"];
      });
      await userRef.get("City").then((doc) => {
        city = doc.data()["City"];
      });
      await userRef.get("Country").then((doc) => {
        country = doc.data()["Country"];
      });
      await userRef.get("PostalCode").then((doc) => {
        postalCode = doc.data()["PostalCode"];
      });

      setFinalAddress(`${street}, ${postalCode} ${city}, ${country}`);
    }
    fullAddress();
  }, []);

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
          <a href="/address" className="address-a">
            <h3 className="address-heading">
              <b>Address:</b> {finalAddress}
            </h3>
          </a>
          <h3 className="orders-heading">
            <b>My Orders:</b>
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
