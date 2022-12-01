import React from "react";
import veggiexpress from "../../images/veggiexpresss.png";
import orangefruit from "../../images/orangefruit.png";
import applefruit from "../../images/applefruit.png";
import "./signup.scss";

function Signup() {
  return (
    <div className="main-div">
      <div className="images-div">
        <a href="/">
          <img
            src={veggiexpress}
            alt="image not found"
            className="veggiexpress-signup-image"
          />
        </a>
        <div className="fruits-div">
          <img
            src={orangefruit}
            alt="image not found"
            className="orangefruit-signup-image"
          />
          <img
            src={applefruit}
            alt="image not found"
            className="applefruit-signup-image"
          />
        </div>
      </div>
      <div className="signup-form-div">
        <form>
          <h1 className="signup-form-header">Sign Up</h1>
          <div className="signup-form-content">
            <div className="signup-form-content-wrapper">
              <input
                className="signup-form-input"
                type="email"
                placeholder="Email"
                required
              ></input>
              <input
                className="signup-form-input"
                type="password"
                placeholder="Password"
                required
              ></input>
              <input
                className="signup-form-input"
                type="password"
                placeholder="Confirm Password"
                required
              ></input>
            </div>
            <button className="signup-form-register-button">Register</button>
            <a href="/login" className="signup-form-return">
              Already have an account? Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
