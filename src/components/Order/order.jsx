import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import veggiexpress from "../../images/veggiexpresss.png";
import "./order.scss";

function Order() {
  const [price, setPrice] = useState(0);
  const location = useLocation();
  const finalPrice = new URLSearchParams(location.search).get("value");

  useEffect(() => {
    if (finalPrice == 2.99 || finalPrice == 4.99) {
      setPrice(finalPrice);
    } else {
      setPrice("Do not alter the URL");
    }
  }, []);

  return (
    <div className="order-main-div">
      <a href="/">
        <img className="logo" src={veggiexpress} />
      </a>
      <div className="info-wrapper">
        <div className="user-info">
          <h3 className="profile-heading">Profile: </h3>
          <h3 className="address-heading">Address: </h3>
          <h3 className="payment-method-heading">Payment Method: </h3>
        </div>
        <div className="checkout-wrapper">
          <div className="checkout-info-wrapper">
            <div className="product-and-price-wrapper">
              <h3 className="summary-heading">You are ordering:</h3>
              <h3 className="product-info">One Basket</h3>
              <h3 className="price-info">{price}$</h3>
            </div>
            <button className="checkout-button">Purchase Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
