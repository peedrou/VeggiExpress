import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase.js";
import veggiexpress from "../../images/veggiexpresss.png";

import {
  CalendarDaysIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

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

      if (`${street}, ${postalCode} ${city}, ${country}` == `,  , `) {
        setFinalAddress("");
      } else {
        setFinalAddress(`${street}, ${postalCode} ${city}, ${country}`);
      }
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
    <div className="flex flex-col gap-12 items-center justify-center w-screen h-screen">
      <a href="/">
        <img
          src={veggiexpress}
          alt="image not found"
          className="veggiexpress-login-image"
        />
      </a>
      <div className="lg:col-start-3 lg:row-end-1">
        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
          <dl className="flex flex-wrap">
            <div className="flex-auto pl-6 pt-6">
              <dt className="text-start text-sm font-semibold leading-6 text-gray-900">
                Profile
              </dt>
            </div>

            <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
              <dt className="flex-none">
                <UserCircleIcon
                  className="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-sm font-medium leading-6 text-gray-900">
                {currentUser.email}
              </dd>
            </div>
            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
              <dt className="flex-none">
                <CalendarDaysIcon
                  className="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-sm leading-6 text-gray-500">
                {finalAddress}
              </dd>
            </div>
            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
              <dt className="flex-none">
                <ShoppingCartIcon
                  className="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-sm leading-6 text-gray-500">{order}</dd>
            </div>
          </dl>
          <div className="flex items-center justify-center">
            <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
              <a
                href="/address"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Change Address
              </a>
            </div>
            <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
              <button
                onClick={() => handleLogout()}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
