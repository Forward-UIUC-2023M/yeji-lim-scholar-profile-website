import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const { name, email, password } = formData;

  const onChange = async (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;

    if (
      email.indexOf(".com") > -1 ||
      email.indexOf(".org") > -1 ||
      email.indexOf(".edu") > -1
    ) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email.");
    }
    onChange(e);
  };

  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (e) => {
    var password = e.target.value;

    if (password.length >= 6) {
      setPasswordError("");
    } else {
      setPasswordError("Password must contain at least 6 characters.");
    }
    onChange(e);
  };

  let submit = async (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: "http://localhost:8000/api/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        // if (error.response.data.error === "Duplicate field value entered") {
        //   setEmailError("This email is already in use.");
        // }
        setEmailError("This email is already in use.");
      });
  };

  return (
    <>
      {/* {localStorage.getItem("token") != null && <Navigate to="/Profile" />} */}
      <div className="register-container">
        <h1>Create Account</h1>
        <div className="container-register-form">
          <form
            action=""
            className="register-form"
            onSubmit={submit}
            autoComplete="off"
          >
            <br></br>
            {/* <h5 className="register-input"> Name </h5> */}
            <input
              type="text"
              className="register-name"
              placeholder="Full Name"
              id="name"
              value={name}
              onChange={onChange}
            />
            {/* <h5 className="register-input"> Email </h5> */}
            <input
              type="email"
              className="register-email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => validateEmail(e)}
            />
            <div>
              <div
                className="register-error"
                style={{
                  color: "red",
                }}
              >
                {emailError}
              </div>
            </div>
            {/* <h5 className="register-input"> Password </h5> */}
            <input
              type="password"
              className="register-password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => validatePassword(e)}
            />
            <div>
              <div
                className="register-error"
                style={{
                  color: "red",
                }}
              >
                {passwordError}
              </div>
            </div>
            {/* <h5 className="register-input"> Password </h5>
            <input
              type="password"
              className="register-password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => validatePassword(e)}
            /> */}
            <div>
              <button
                className="register-button"
                type="submit"
                version="secondary"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="register-footer">
          <Link to="/register" className="register-link">
            <p className="PageHeader">Already a Member? Log in Here</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
