import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landingPage-container">
      {/* <div className="landing"> */}
      <p className="landing">
        Get started building your personalized Scholar Profile!
      </p>
      <Link to="/register">
        <button className="create-account-btn" type=" button">
          Create an account
        </button>
      </Link>
      <span className="create-account">to get started!</span>
      <div className="landing-login-container">
      <span className="login">Already have an account?</span>
      <Link to="/login">
        <button className="login-btn" type=" button">
          Log in
        </button>
      </Link>
      <span className="login">to continue your journey</span>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Landing;
