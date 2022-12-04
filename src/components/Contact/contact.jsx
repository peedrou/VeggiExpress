import React from "react";
import "./contact.scss";

function Contact() {
  return (
    <div className="main-contact-div">
      <div className="heading-and-contact-div">
        <h1 className="contact-heading">
          Want a custom order? <br /> Give us a message!
        </h1>
        <div className="email-div">
          <svg className="email-svg" viewBox="0 0 8 6">
            <path d="m0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z" />
          </svg>
          <h4 className="contact-email">Let's Talk</h4>
        </div>
      </div>
    </div>
  );
}

export default Contact;
