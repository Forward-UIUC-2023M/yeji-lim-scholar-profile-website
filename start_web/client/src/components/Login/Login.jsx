import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const { email, password } = formData;
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  let submit = async (e) => {
    e.preventDefault();

    var data = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: "http://localhost:8000/api/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("token", response.data.token);
        navigate("/profile");
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        if (error.response.data.error === "Invalid credentials") {
          setError(error.response.data.error);
        }
      });
  };

  return (
    <>
      {/* {localStorage.getItem("token") != null && <Navigate to="/Profile" />} */}
      <div className="login-container">
        <h1 className="login-heading">Login</h1>
        <div className="container-login-form">
          <form
            action=""
            className="login-form"
            onSubmit={submit}
            autoComplete="off"
          >
            <br></br>
            <div>
              {/* <h5 className="login-input"> Email </h5> */}
              <input
                type="email"
                className="emailInput"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
            </div>
            {/* <h5 className="login-input"> Password </h5> */}
            <div>
              <input
                type="password"
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div>
              <button
                className="login-button"
                type="submit"
                version="secondary"
              >
                Log In
              </button>
            </div>
            <span
              style={{
                color: "red",
              }}
            >
              {error}
            </span>
          </form>
        </div>
        <div className="login-footer">
          <div className="login-footer-password">
            <span className="login-footer-span">Forgot your password?</span>
            <Link to="/register" className="login-link">
              <button className="login-new-pass-btn">Reset Password</button>
            </Link>
          </div>
          <div className="login-footer-login">
            <span className="login-footer-span">Don't have an account?</span>
            <Link to="/register" className="login-link">
              <button className="login-new-account-btn">Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
