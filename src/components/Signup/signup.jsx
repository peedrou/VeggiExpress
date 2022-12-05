import React, { useRef, useState } from "react";
import veggiexpress from "../../images/veggiexpresss.png";
import orangefruit from "../../images/orangefruit.png";
import applefruit from "../../images/applefruit.png";
import { useAuth } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import "./signup.scss";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch {
      setError("Failed to create an account, please try again later");
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
        <form onSubmit={handleSubmit}>
          <h1 className="signup-form-header">Sign Up</h1>
          {error && <h5>{error}</h5>}
          <div className="signup-form-content">
            <div className="signup-form-content-wrapper">
              <input
                className="signup-form-input"
                type="email"
                placeholder="Email"
                ref={emailRef}
                required
              ></input>
              <input
                className="signup-form-input"
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              ></input>
              <input
                className="signup-form-input"
                type="password"
                placeholder="Confirm Password"
                ref={passwordConfirmRef}
                required
              ></input>
            </div>
            {loading == false && (
              <button className="signup-form-register-button" type="submit">
                Register
              </button>
            )}
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
