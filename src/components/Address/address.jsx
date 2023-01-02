import React, { useEffect, useRef } from "react";
import veggiexpress from "../../images/veggiexpresss.png";
import { useAuth } from "../../contexts/AuthContext.js";
import { firestore } from "../../firebase.js";
import { useState } from "react";
import "./address.scss";

function Address() {
  const { currentUser } = useAuth();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const db = firestore;

  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const postalRef = useRef(null);

  useEffect(() => {
    let street;
    let city;
    let country;
    let postalCode;
    async function GetAddressData() {
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

      setStreet(street);
      setCity(city);
      setCountry(country);
      setPostalCode(postalCode);
    }
    GetAddressData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const docRef = db.collection("users").doc(currentUser.uid);
      const newStreet = streetRef.current.value;
      const newCity = cityRef.current.value;
      const newPostal = postalRef.current.value;
      const newCountry = countryRef.current.value;
      const updatedData = {
        City: newCity,
        Country: newCountry,
        PostalCode: newPostal,
        Street: newStreet,
      };
      console.log(updatedData);
      await docRef.update(updatedData);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="address-main-div">
      <a href="/">
        <img className="logo" src={veggiexpress} />
      </a>
      <div className="address-wrapper">
        <div className="current-address-wrapper">
          <div className="current-address-heading-div">
            <h3 className="current-address-heading">
              <b>Current Address</b>
            </h3>
          </div>
          <h4 className="current-heading">
            <b>Street: {street}</b>
          </h4>
          <h4 className="current-heading">
            <b>Postal Code: {postalCode}</b>
          </h4>
          <h4 className="current-heading">
            <b>City: {city}</b>
          </h4>
          <h4 className="current-heading">
            <b>Country: {country}</b>
          </h4>
        </div>
        <div className="new-address-wrapper">
          <h3 className="new-address-heading">
            <b>Change Address</b>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-main-div">
              <div className="form-div-info">
                <input
                  type="text"
                  placeholder="Street"
                  className="input-info1"
                  ref={streetRef}
                />
                <div className="postal-city-wrapper">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="input-info-postal"
                    ref={postalRef}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="input-info-city"
                    ref={cityRef}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  className="input-info1"
                  ref={countryRef}
                />
              </div>
              <button type="submit" className="submit-button">
                Update Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Address;
