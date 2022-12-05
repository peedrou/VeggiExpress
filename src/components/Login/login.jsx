import React from "react";
import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import veggiexpress from "../../images/veggiexpresss.png";
import orangefruit from "../../images/orangefruit.png";
import applefruit from "../../images/applefruit.png";
import "./login.scss";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

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
        <form onSubmit={handleSubmit}>
          <h1 className="login-form-header">Login</h1>
          <div className="login-form-content">
            <div className="login-form-input-wrapper">
              <input
                className="login-form-input"
                type="email"
                placeholder="Email"
                ref={emailRef}
              ></input>
              <input
                className="login-form-input"
                type="password"
                placeholder="Password"
                ref={passwordRef}
              ></input>
            </div>
            <a href="#" className="login-form-link">
              Forgot your Password?
            </a>
          </div>
          <div className="login-form-action">
            <button className="login-form-button" type="submit">
              Sign In
            </button>
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
