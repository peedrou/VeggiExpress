import React from "react";
import "./login.scss";

function Login() {
  return (
    <div className="login-form-div">
      <form>
        <h1 className="login-form-header">Login</h1>
        <div className="login-form-content">
          <div className="login-form-input-wrapper">
            <input
              className="login-form-input-email"
              type="email"
              placeholder="Email"
            ></input>
            <input
              lassName="login-form-input-password"
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <a href="#" className="login-form-link">
            Forgot your Password?
          </a>
        </div>
        <div className="login-form-action">
          <button className="login-form-button-SI">Sign In</button>
          <button className="login-form-button-register">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
