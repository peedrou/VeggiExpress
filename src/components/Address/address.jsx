import React from "react";
import veggiexpress from "../../images/veggiexpresss.png";
import "./address.scss";

function Address() {
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
            <b>Street:</b>
          </h4>
          <h4 className="current-heading">
            <b>Postal Code:</b>
          </h4>
          <h4 className="current-heading">
            <b>City:</b>
          </h4>
          <h4 className="current-heading">
            <b>Country:</b>
          </h4>
        </div>
        <div className="new-address-wrapper">
          <h3 className="new-address-heading">
            <b>Change Address</b>
          </h3>
          <form>
            <div className="form-main-div">
              <div className="form-div-info">
                <input
                  type="text"
                  placeholder="Street"
                  className="input-info1"
                />
                <div className="postal-city-wrapper">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="input-info-postal"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="input-info-city"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  className="input-info1"
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
