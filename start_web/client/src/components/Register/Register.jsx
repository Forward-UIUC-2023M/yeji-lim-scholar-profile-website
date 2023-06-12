import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    errors: {},
  });
  const [photo, setPhoto] = useState();

  const { firstName, lastName, email, password } = formData;

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

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  let submit = async (e) => {
    e.preventDefault();
    console.log(firstName);
    console.log(lastName);

    var data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
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
        // navigate("/");
        if (photo == null) {
          navigate("/Profile");
        } else {
          console.log("one: ", response.data, response.data.data._id);
          singleFileUploadHandler(response.data.token, response.data.data._id);
        }
      })
      .catch(function (error) {
        console.log(error);
        // if (error.response.data.error === "Duplicate field value entered") {
        //   setEmailError("This email is already in use.");
        // }
        setEmailError("This email is already in use.");
      });
  };

  const singleFileUploadHandler = async (account, id) => {
    console.log("singleFileUploadHandler");
    const data = new FormData();

    // If file selected
    if (photo) {
      data.append("itemImage", photo, photo.name);
      var config = {
        method: "post",
        url: "http://localhost:8000/api/photo",
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          Authorization: `Bearer ${account}`,
        },
        data: data,
      };

      await axios(config)
        .then(function (response) {
          console.log("profile form photo data", JSON.stringify(response.data));
          updateItemPhoto(account, id, response);
        })
        .catch(function (error) {
          console.log("post photo error: ", error.message);
        });
    }
  };

  const updateItemPhoto = async (account, id, photo) => {
    var data = JSON.stringify({
      photo: photo.data.location,
    });
    var config = {
      method: "put",
      url: `http://localhost:8000/api/auth/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${account}`,
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log("put photo", response);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/* {localStorage.getItem("token") != null && <Navigate to="/Profile" />} */}
      <div className="register-container">
        <h1 className="register-heading">Create Account</h1>
        <div className="container-register-form">
          <form
            action=""
            className="register-form"
            onSubmit={submit}
            autoComplete="off"
          >
            <br></br>
            {/* <h5 className="register-input"> Name </h5> */}
            <div className="register-content-container">
              <div className="register-texts-container">
                <div>
                  <input
                    type="text"
                    className="register-name"
                    placeholder="First Name"
                    id="firstName"
                    value={firstName}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="register-name"
                    placeholder="Last Name"
                    id="lastName"
                    value={lastName}
                    onChange={onChange}
                  />
                </div>
                {/* <h5 className="register-input"> Email </h5> */}
                <div>
                  <input
                    type="email"
                    className="register-email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => validateEmail(e)}
                  />
                </div>
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
              </div>
              <div className="register-photo-container">
                <input
                  type="file"
                  name="profilePhoto"
                  className="formProfilePhoto"
                  id="photo"
                  onChange={handleFileChange}
                />
              </div>
            </div>
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
          <div className="register-footer-register">
            <span className="register-footer-span">
              Already have an account?
            </span>
            <Link to="/login" className="register-link">
              <button className="register-login-btn">Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
