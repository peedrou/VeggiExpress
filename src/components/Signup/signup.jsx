import React from "react";
import "./signup.scss";

function Signup() {
  return (
    <div className="signup-form-div">
      <form>
        <h1 className="signup-form-header">Sign Up</h1>
        <div className="signup-form-content">
          <div className="signup-form-content-wrapper">
            <input
              className="signup-form-email"
              type="email"
              placeholder="Email"
              required
            ></input>
            <input
              className="signup-form-password"
              type="password"
              placeholder="Password"
              required
            ></input>
            <input
              className="signup-form-password-repeat"
              type="password"
              placeholder="Confirm Password"
              required
            ></input>
          </div>
          <button className="signup-form-register-button">Register</button>
          <a href="#" className="signup-form-return">
            Already have an account? Log in
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
