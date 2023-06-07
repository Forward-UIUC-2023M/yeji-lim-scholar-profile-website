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
        localStorage.setItem("token", response.data.token);
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
      <div className="register-container">
        <h1>Login</h1>
        <div className="container-register-form">
          <form
            action=""
            className="register-form"
            onSubmit={submit}
            autoComplete="off"
          >
            <br></br>
            <h5 className="register-input"> Email </h5>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <h5 className="register-input"> Password </h5>
            <input
              type="password"
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <div>
              <button
                className="register-button"
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
        <div className="navbar">
          <Link to="/register" className="register-link">
            <p className="PageHeader">New Member? Register Here</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
