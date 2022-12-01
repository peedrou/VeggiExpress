import React from "react";
import veggiexpress from "../../images/veggiexpresss.png";
import orangefruit from "../../images/orangefruit.png";
import applefruit from "../../images/applefruit.png";
import "./login.scss";

function Login() {
  return (
    <div className="main-div">
      <div className="images-div">
        <a href="/">
          <img
            src={veggiexpress}
            alt="image not found"
            className="veggiexpress-login-image"
          />
        </a>
        <div className="fruits-div">
          <img
            src={orangefruit}
            alt="image not found"
            className="orangefruit-login-image"
          />
          <img
            src={applefruit}
            alt="image not found"
            className="applefruit-login-image"
          />
        </div>
      </div>
      <div className="login-form-div">
        <form>
          <h1 className="login-form-header">Login</h1>
          <div className="login-form-content">
            <div className="login-form-input-wrapper">
              <input
                className="login-form-input"
                type="email"
                placeholder="Email"
              ></input>
              <input
                className="login-form-input"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <a href="#" className="login-form-link">
              Forgot your Password?
            </a>
          </div>
          <div className="login-form-action">
            <button className="login-form-button">Sign In</button>
            <a href="/signup" className="login-form-button-register">
              <span className="login-form-button-register-span">Register</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
