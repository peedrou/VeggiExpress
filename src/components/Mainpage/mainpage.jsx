import veggie from "../../images/veggie-basket.png";
import veggieicon from "../../images/veggie-icon.png";
import veggiexpress from "../../images/veggiexpresss.png";
import "./mainpage.scss";

function Mainpage() {
  return (
    <div className="super-div">
      <div className="navbar-main-div">
        <img className="logo" alt="placeholder" src={veggiexpress} />
        <div className="log-sign-div">
          <h2 className="log-in">Log In</h2>
          <h2 className="sign-up">Sign Up</h2>
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
          <div className="single-purchase-button-wrapper">
            <button className="single-purchase-button">
              I want one basket!
            </button>
            <img className="veggie-icon1" src={veggieicon} />
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
