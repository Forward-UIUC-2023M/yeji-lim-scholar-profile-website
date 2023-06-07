import React from "react";
import { useState, useRef } from "react";
import Input from "./Input/Input";
import "./Form.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primaryName: "",
    alternativeName: "",
    link: "",
    keywords: "",
  });

  const { primaryName, alternativeName, link, keywords } = formData;
  //   const [formData, setFormData] = useState([]);
  //   const [toggle, setToggle] = useState(false);

  //   const inputRef = useRef();
  //   const selectRef = useRef();

  //   //   const { primaryName, link, keywords } = formData;

  //   const onChange = (e, index) => {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [e.target.id]: e.target.value,
  //     }));
  //   };

  //   const handleAddField = (e) => {
  //     e.preventDefault();
  //     const values = [...formData];
  //     values.push({
  //       label: inputRef.current.value || "label",
  //       type: selectRef.current.value || "text",
  //       value: "",
  //     });
  //     setFormData(values);
  //     setToggle(false);
  //   };

  //   const addBtnClick = (e) => {
  //     e.preventDefault();
  //     setToggle(true);
  //   };

  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const onChange = (e) => {
    e.preventDefault();

    // const index = e.target.id;
    // setArr((s) => {
    //   const newArr = s.slice();
    //   newArr[index].value = e.target.value;

    //   return newArr;
    // });

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  let submit = async (e) => {
    // e.preventDefault();
    // console.log("submitted", formData);
    e.preventDefault();
    const account = localStorage.getItem("token");
    let user = await axios.get("http://localhost:8000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${account}`,
      },
    });
    var data = JSON.stringify({
      primaryName: primaryName,
      alternativeName: alternativeName,
      link: link,
      //   keywords: keywords,
    });
    var config = {
      method: "post",
      url: "http://localhost:8000/api/profiles",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${account}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // if (photo == null) {
        //   navigate("/Profile");
        // } else {
        //   singleFileUploadHandler(account, response.data.data._id);
        // }
        navigate("/profile");
      })
      .catch(function (error) {
        console.log("post listing error: ", error.message);
      });
  };

  return (
    <div className="main-container">
      <div className="profile-form-continer">
        <h1>Profile Form</h1>
        <form
          className="profile-form"
          runat="server"
          enctype="multipart/form-data"
          onSubmit={submit}
        >
          <p className="profile-form-primary-name">Primary Name</p>
          <input
            type="text"
            className="formPrimaryName"
            placeholder="Preferred full name"
            required
            id="primaryName"
            onChange={onChange}
          />
          <p className="profile-form-secondary-name">Alternative Names</p>
          <input
            type="text"
            className="formAlternativeName"
            placeholder="Alternative name"
            id="alternativeName"
            onChange={onChange}
          />

          {/* <div>
            <button onClick={addInput}>+</button>
            {arr.map((item, i) => {
              return (
                <input
                  onChange={onChange}
                  value={item.value}
                  id={i}
                  type={item.type}
                  size="40"
                />
              );
            })}
          </div> */}

          <p className="profile-form-link">Link</p>
          <input
            type="text"
            className="formLink"
            id="link"
            placeholder="Link to preferred website with info"
            onChange={onChange}
          />
          {/* <p className="profile-form-link">Links</p>
          {formData.map((obj, index) => (
            <Input
              key={index}
              objValue={obj}
              onChange={onChange}
              index={index}
            />
          ))} */}
          {/* <p className="profile-form-keywords">Key Words</p>
          {formData.map((obj, index) => (
            <Input
              key={index}
              objValue={obj}
              onChange={onChange}
              index={index}
            />
          ))} */}
          <p className="profile-form-keywords">Key Words</p>
          <input
            type="text"
            className="formKeywords"
            id="keywords"
            placeholder="Keywords for your studies"
            onChange={onChange}
          />
          <p> Profile Picture </p>
          <input
            type="file"
            name="itemImage"
            className="CreateListingPhoto"
            id="photo"
            // onChange={handleFileChange}
          />

          <div>
            <button type="submit" version="secondary" className="submit-button">
              {" "}
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
