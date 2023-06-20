import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Landing.css";

function Landing() {
  // window.location.reload(false);
  const location = useLocation();
  const auth = localStorage.getItem("token");
  console.log("auth: ", auth);
  // let loggedOut = location.state || false;
  // if (auth) {
  //   return (
  //     <div className="landingPage-container">
  //       <p className="landing">
  //         Get started building your personalized Scholar Profile!
  //       </p>
  //       <Link to="/form">
  //         <button className="create-account-btn" type=" button">
  //           Click here
  //         </button>
  //       </Link>
  //       <span className="create-account">to get started!</span>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="landingPage-container">
  //       {/* <div className="landing"> */}
  //       <p className="landing">
  //         Get started building your personalized Scholar Profile!
  //       </p>
  //       <Link to="/register">
  //         <button className="create-account-btn" type=" button">
  //           Create an account
  //         </button>
  //       </Link>
  //       <span className="create-account">to get started!</span>
  //       <div className="landing-login-container">
  //         <span className="login">Already have an account?</span>
  //         <Link to="/login">
  //           <button className="login-btn" type=" button">
  //             Log in
  //           </button>
  //         </Link>
  //         <span className="login">to continue your journey</span>
  //       </div>
  //       {/* </div> */}
  //     </div>
  //   );
  // }
  // console.log("landing: ", landing);
  // if (loggedOut) {
  //   window.location.reload(false);
  //   loggedOut = false;
  // }
  return (
    <div>
      {auth ? (
        <div className="landingPage-container">
          <p className="landing">
            Get started building your personalized Scholar Profile!
          </p>
          <Link to="/form">
            <button className="create-account-btn" type=" button">
              Click here
            </button>
          </Link>
          <span className="create-account">to build your profile!</span>
          <div className="landing-login-container">
            <span className="login">Already have a profile?</span>
            <Link to="/profile">
              <button className="login-btn" type=" button">
                Click here
              </button>
            </Link>
            <span className="login">to view your profile</span>
          </div>
        </div>
      ) : (
        <div className="landingPage-container">
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
        </div>
      )}
    </div>
  );
}

export default Landing;
