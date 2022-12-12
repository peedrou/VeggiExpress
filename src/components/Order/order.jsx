import React from "react";
import { usePrice } from "../../contexts/priceContext";
import veggiexpress from "../../images/veggiexpresss.png";
import "./order.scss";

function Order() {
  const price = usePrice();
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
