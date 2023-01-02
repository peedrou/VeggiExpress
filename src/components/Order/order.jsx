import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { useLocation } from "react-router-dom";
import { firestore } from "../../firebase.js";
import veggiexpress from "../../images/veggiexpresss.png";
import arrow from "../../images/arrow.png";
import card from "../../images/credit-card.png";
import "./order.scss";

function Order() {
  const [isUpsideDown, setIsUpsideDown] = useState(false);
  const { currentUser } = useAuth();
  const [finalAddress, setFinalAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [product, setProduct] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Choose a payment method");
  const [loadError, setLoadError] = useState(false);
  const db = firestore;
  const location = useLocation();
  const finalPrice = new URLSearchParams(location.search).get("value");
  const finalProduct = new URLSearchParams(location.search).get("product");

  useEffect(() => {
    console.log(finalPrice);
    if (finalPrice == 2.99 || finalPrice == 4.99) {
      setPrice(finalPrice);
    } else {
      setPrice("Do not alter the URL");
    }
  }, []);

  useEffect(() => {
    setProduct(finalProduct);
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

  function handlePaymentMethodChange(card) {
    setPaymentMethod(card);
    setIsUpsideDown(!isUpsideDown);
  }

  async function completeOrder() {
    if (paymentMethod != "Choose a payment method") {
      try {
        const docRef = db.collection("users").doc(currentUser.uid);
        const updatedData = { Order: product };
        await docRef.update(updatedData);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoadError(true);
    }
  }

  return (
    <div className="order-main-div">
      <a href="/">
        <img className="logo" src={veggiexpress} />
      </a>
      <div className="info-wrapper">
        <div className="user-info">
          <h3 className="profile-heading">Profile: {currentUser.email}</h3>
          <h3 className="address-heading">Address: {finalAddress}</h3>
          <div className="payment-method-div">
            <h3 className="payment-method-heading">Payment Method: </h3>
            <div
              className="payment-image-div"
              onClick={() => setIsUpsideDown(!isUpsideDown)}
            >
              <h4 className="choose-payment">{paymentMethod}</h4>
              <img
                alt="arrow"
                className="arrow-image"
                style={{
                  transform: isUpsideDown ? "rotate(-180deg)" : "rotate(0deg)",
                }}
                src={arrow}
              />
            </div>
            {isUpsideDown && (
              <div className="payment-method-cards-div">
                <div
                  className="credit-card-div"
                  onClick={() => handlePaymentMethodChange("XXXX-XXXXX918")}
                >
                  <img
                    alt="credit card image"
                    className="credit-card-image"
                    src={card}
                  />
                  <h6 className="card">XXXX-XXXXX918</h6>
                </div>
                <div
                  className="credit-card-div"
                  onClick={() => handlePaymentMethodChange("XXXX-XXXXX756")}
                >
                  <img
                    alt="credit card image"
                    className="credit-card-image"
                    src={card}
                  />
                  <h6 className="card">XXXX-XXXXX756</h6>
                </div>
                <div
                  className="credit-card-div"
                  onClick={() => handlePaymentMethodChange("XXXX-XXXXX113")}
                >
                  <img
                    alt="credit card image"
                    className="credit-card-image"
                    src={card}
                  />
                  <h6 className="card">XXXX-XXXXX113</h6>
                </div>
              </div>
            )}
            {loadError && (
              <div className="payment-method-error-div">
                <h4 className="payment-method-error-heading">
                  You must choose a payment method
                </h4>
              </div>
            )}
          </div>
        </div>
        <div className="checkout-wrapper">
          <div className="checkout-info-wrapper">
            <div className="product-and-price-wrapper">
              <h3 className="summary-heading">
                You are ordering: {product} for {price}$
              </h3>
            </div>
            <button onClick={() => completeOrder()} className="checkout-button">
              Purchase Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
