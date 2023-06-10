import React from "react";
import { useState, useRef } from "react";
import Input from "./Input/Input";
import "./Form.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import { FaListOl } from "react-icons/fa";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primaryName: "",
    alternativeName: [],
    link: "",
    keywords: "",
  });

  const { primaryName, alternativeName, link, resume, photo } = formData;
  const [linkList, setLinkList] = useState([{ link: "" }]);
  const [altNameList, setAltNameList] = useState([{ alternativeName: "" }]);
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

  //   const [arr, setArr] = useState(inputArr);

  const addAltNameInput = () => {
    setAltNameList([...altNameList, { alternativeName: "" }]);
  };

  const addLinkInput = () => {
    setLinkList([...linkList, { link: "" }]);
  };

  const removeAltNameInput = (index) => {
    const list = [...altNameList];
    list.splice(index, 1);
    setAltNameList(list);
  };

  const removeLinkInput = (index) => {
    const list = [...linkList];
    list.splice(index, 1);
    setLinkList(list);
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
    //   alternativeName: altNameList,
      link: link,
      resume: resume,
      photo: photo
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
          {altNameList.map((singleAltName, index) => {
            return (
              <>
                <div className="altNameInputs">
                  <input
                    type="text"
                    className="formAlternativeName"
                    id="alternativeName"
                    placeholder="Alternative name"
                    onChange={onChange}
                    key={index}
                  />
                  {altNameList.length > 1 && (
                    <button
                      className="remove-input"
                      type="button"
                      onClick={() => removeAltNameInput(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                {/* <button className="more-input" onClick={addInput}>+</button> */}
              </>
            );
          })}
          <div className="add-buttons">
            <button
              className="more-input"
              type="button"
              onClick={addAltNameInput}
            >
              Add
            </button>
          </div>
          {/* <div className="add-buttons">
            <MdIcons.MdOutlineAddCircleOutline
              className="more-input"
              onClick={addAltNameInput}
            />
          </div> */}
          {/* <input
            type="text"
            className="formAlternativeName"
            placeholder="Alternative name"
            id="alternativeName"
            onChange={onChange}
          />
          <button className="more-input" onClick={addInput}>
            +
          </button> */}

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
          {linkList.map((singleLink, index) => {
            return (
              <>
                <div className="linkInputs">
                  <input
                    type="text"
                    className="formLink"
                    id="link"
                    placeholder="Link to preferred website with information"
                    onChange={onChange}
                    key={index}
                  />
                  {linkList.length > 1 && (
                    <button
                      className="remove-input"
                      type="button"
                      onClick={() => removeLinkInput(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                {/* <button className="more-input" onClick={addInput}>+</button> */}
              </>
            );
          })}
          <div className="add-buttons">
            <button className="more-input" type="button" onClick={addLinkInput}>
              Add
            </button>
          </div>
          {/* <input
            type="text"
            className="formLink"
            id="link"
            placeholder="Link to preferred website with information"
            onChange={onChange}
          />
          <button className="more-input">+</button> */}
          <p className="profile-form-other-info">Other Information</p>
          <textarea
            type="text"
            className="formOther"
            id="other"
            placeholder="Other miscellaneous information"
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
          {/* <p className="profile-form-keywords">Key Words</p>
          <input
            type="text"
            className="formKeywords"
            id="keywords"
            placeholder="Keywords for your studies"
            onChange={onChange}
          /> */}
          <p> Resume/CV </p>
          <input
            type="file"
            name="form-resume"
            className="formResume"
            id="resume"
            // onChange={handleFileChange}
          />
          <p> Profile Picture </p>
          <input
            type="file"
            name="profilePhoto"
            className="formProfilePhoto"
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
