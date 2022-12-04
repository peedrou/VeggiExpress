import Contact from "../Contact/contact";
import Footer from "../Footer/footer";
import veggie from "../../images/veggie-basket.png";
import veggieicon from "../../images/veggie-icon.png";
import veggiexpress from "../../images/veggiexpresss.png";
import bananafruit from "../../images/bananafruit.png";
import grapesfruit from "../../images/grapesfruit.png";
import "./mainpage.scss";

function Mainpage() {
  return (
    <div className="super-div">
      <div className="navbar-main-div">
        <div className="image-div">
          <img className="logo" alt="placeholder" src={veggiexpress} />
        </div>
        <div className="log-sign-div">
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
      </div>
      <div className="slogan-option-wrapper">
        <img className="veggie-basket" src={veggie} />
        <div className="slogan-div">
          <h1 className="slogan-heading1">One click away...</h1>
          <h1 className="slogan-heading2">
            from getting fresh veggies at your door
          </h1>
        </div>
        <div className="options-div">
          <a href="/order_once" className="order-once-a">
            <div className="single-purchase-button-wrapper">
              <button className="single-purchase-button">
                I want one basket!
              </button>
              <img className="veggie-icon1" src={veggieicon} />
            </div>
          </a>
          <a href="/order_month" className="order-month-a">
            <div className="membership-button-wrapper">
              <button className="membership-button">
                I want the basket every month!
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
