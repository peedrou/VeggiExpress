import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase.js";
import "./dashboard.scss";

function Dashboard() {
  const location = useLocation();
  const [error, setError] = useState("");
  const [finalAddress, setFinalAddress] = useState("");
  const [order, setOrder] = useState("");
  const [loadStatus, setLoadStatus] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const db = firestore;

  useEffect(() => {
    const status = new URLSearchParams(location.search).get("status");
    if (status == "success") {
      setLoadStatus(true);
    }
  }, []);

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

  useEffect(() => {
    async function getOrder() {
      const userRef = db.collection("users").doc(currentUser.uid);
      await userRef.get("Order").then((doc) => {
        setOrder(doc.data()["Order"]);
      });
    }
    getOrder();
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
        {loadStatus && <h4 className="success-order">Order was successful!</h4>}
        {error == "Failed to Log Out" && (
          <h2 className="failed-to-logout">{error}</h2>
        )}
        <div className="profile-info-wrapper">
          <h3 className="email-heading">
            <b>Email:</b> {currentUser.email}
          </h3>
          <a href="/address" className="address-a">
            <h3 className="address-heading">
              <b className="address-b">Address:</b> {finalAddress}
            </h3>
          </a>
          <h3 className="orders-heading">
            <b>My Orders: {order}</b>
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
