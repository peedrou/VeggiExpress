import Contact from "../Contact/contact";
import Footer from "../Footer/footer";
import person from "../../images/person.png";
import veggieicon from "../../images/veggie-icon.png";
import veggiexpress from "../../images/veggiexpresss.png";
import bananafruit from "../../images/bananafruit.png";
import grapesfruit from "../../images/grapesfruit.png";
import burger from "../../images/burgermenu.png";
import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./mainpage.scss";

function Mainpage() {
  const { currentUser, logout } = useAuth();
  const [logged, setLogged] = useState(false);
  const [orderRedirect, setOrderRedirect] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [pushMenu, setPushMenu] = useState(false);
  const [transformMenu, setTransformMenu] = useState(0);
  const Navigate = useNavigate();

  useEffect(() => {
    let cb = function () {
      const totalWidth = window.innerWidth;
      if (totalWidth <= 800) {
        setBurgerMenu(true);
      } else {
        setBurgerMenu(false);
      }
    };
    window.addEventListener("resize", cb);

    return () => {
      window.removeEventListener("resize", cb);
    };
  });

  useEffect(() => {
    if (!pushMenu) {
      setTransformMenu(-250);
    } else {
      setTransformMenu(0);
    }
  });

  useEffect(() => {
    if (logged) {
      setOrderRedirect(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (currentUser.email != null) {
        setLogged(true);
      }
    } catch {
      console.log(1);
    }
  }, []);

  async function handleLogout() {
    await logout();
    window.location.reload();
  }

  function handleRedirect(value, product) {
    Navigate({
      pathname: "/order",
      search: `?value=${value}&product=${product}`,
    });
  }

  return (
    <div className="super-div">
      <div className="navbar-main-div">
        <div className="image-div">
          <img className="logo" alt="placeholder" src={veggiexpress} />
        </div>
        {!burgerMenu && (
          <>
            {logged == false && (
              <div className="log-sign-div">
                {orderRedirect && (
                  <div className="log-first">
                    You must log in or sign up before ordering!
                  </div>
                )}
                <a href="/login" className="login-a">
                  <h2 className="log-in">Log In</h2>
                  <img
                    src={grapesfruit}
                    alt="Image not found"
                    className="grapesfruit"
                  />
                </a>
                <a href="/signup" className="signup-a">
                  <h2 className="sign-up">Sign Up</h2>
                  <img
                    src={bananafruit}
                    alt="Image not found"
                    className="bananafruit"
                  />
                </a>
              </div>
            )}
            <div className="logged-super-div">
              {logged && (
                <div className="logged-in-div">
                  <a href="/dashboard" className="loggen-in-a">
                    <h2>My Profile</h2>
                  </a>
                </div>
              )}
              {logged && (
                <div className="sign-out-div" onClick={() => handleLogout()}>
                  <h1 className="sign-out-heading">Sign Out</h1>
                </div>
              )}
            </div>
          </>
        )}{" "}
        {burgerMenu && (
          <div className="burger-main-div">
            <div>
              {!logged && (
                <div
                  className="burger-notlogged-div"
                  style={{ transform: `translateX(${transformMenu}px)` }}
                >
                  <a href="/login" className="burger-login-a">
                    <h4 className="burger-login-heading">Log In</h4>
                  </a>
                  <a href="/signup" className="burger-signup-a">
                    <h4 className="burger-signup-heading">Sign Up</h4>
                  </a>
                </div>
              )}
              {logged && (
                <div
                  className="burger-logged-div"
                  style={{ transform: `translateX(${transformMenu}px)` }}
                >
                  <a href="/dashboard" className="burger-dashboard-a">
                    <h4 className="burger-dashboard-heading">My Profile</h4>
                  </a>
                  <h4
                    className="burger-signout-heading"
                    onClick={() => handleLogout()}
                  >
                    Sign Out
                  </h4>
                </div>
              )}
            </div>{" "}
            <img
              className="burger-img"
              style={{ transform: `translateX(${transformMenu}px)` }}
              onClick={() => setPushMenu(!pushMenu)}
              src={burger}
            />
          </div>
        )}
      </div>
      <div className="slogan-option-wrapper">
        <img className="person" src={person} />
        <div className="slogan-div">
          <h1 className="slogan-heading1">One click away...</h1>
          <h1 className="slogan-heading2">
            from getting fresh veggies at your door
          </h1>
        </div>
        <div className="options-div">
          <a
            onClick={() => {
              orderRedirect == false
                ? logged
                  ? handleRedirect(4.99, "One Basket")
                  : setOrderRedirect(true)
                : logged
                ? handleRedirect(4.99, "One Basket")
                : setOrderRedirect(true);
            }}
            className="order-once-a"
          >
            <div className="single-purchase-button-wrapper">
              <button className="single-purchase-button">
                I want one basket!
              </button>
              <img className="veggie-icon1" src={veggieicon} />
            </div>
          </a>
          <a
            onClick={() => {
              orderRedirect == false
                ? logged
                  ? handleRedirect(2.99, "Monthly Delivery")
                  : setOrderRedirect(true)
                : logged
                ? handleRedirect(2.99, "Monthly Delivery")
                : setOrderRedirect(true);
            }}
            className="order-month-a"
          >
            <div className="membership-button-wrapper">
              <button className="membership-button">
                I want a basket every month!
              </button>
              <div className="veggies-wrapper">
                <img className="veggie-icon2" src={veggieicon} />
                <img className="veggie-icon2" src={veggieicon} />
                <img className="veggie-icon2" src={veggieicon} />
                <img className="veggie-icon2" src={veggieicon} />
              </div>
            </div>
          </a>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default Mainpage;
