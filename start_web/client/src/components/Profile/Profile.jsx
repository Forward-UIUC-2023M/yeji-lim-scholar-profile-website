// import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import MultilineEdit from "./MultilineEdit";
import "./Profile.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import { IconContext } from 'react-icons'
import { BiEdit } from 'react-icons/bi';


// Connect this to backend, loop through back end to get the list elements
// Figure out how to use useEffect before rendering

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    primaryName: '',
    keywords: [],
    email: '',
    phone: '',
    educations: [],
    institution: '',
    titles: [],
    major: '',
    focusAreas: [],
    honors: [],
    experiences: [],
    papers: [],
  });

  const [editModes, setEditModes] = useState({
    primaryName: false,
    keywords: false,
    email: false,
    phone: false,
    educations: false,
    institution: false,
    titles: false,
    major: false,
    focusAreas: false,
    honors: false,
    experiences: false,
    papers: false,
  });  // states for whether current elements, e.g. primaryName, is in edit mode

  const click = (e) => {
    navigate("/form");
  };

  // setter for all fields in the user profile
  const setProfileField = (fieldName, value, index = null) => {
    setProfile((prevProfile) => {
      if (index !== null) {
        // Handle indexed fields
        const updatedField = [...prevProfile[fieldName]];
        updatedField[index] = value;

        return {
          ...prevProfile,
          [fieldName]: updatedField,
        };
      } else {
        // Handle non-indexed fields
        return {
          ...prevProfile,
          [fieldName]: value,
        };
      }
    });
  };

  // set field in editModes to be true when the user clicks on edit buttons
  const handleClickOnEdit = (fieldName) => {
    setEditModes((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: true,
    }));
  };

  // set field in editModes to be false when the user finish editing
  const handleCloseEdit = (fieldName) => {
    setEditModes((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: false,
    }));
  };

  useEffect(() => {
    let defaultData = async (e) => {
      try {
        // const account = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2NjZWM4MmUwY2Y4Y2M0MDVlMmFhNiIsImlhdCI6MTY4NTkxMTU3OSwiZXhwIjoxNjg4NTAzNTc5fQ.iJg27Jre1t-x5Ii7730bVr_ySvtPB8CWGMJ-exV1NWQ";
        const account = localStorage.getItem("token");
        let user = await axios.get("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${account}`,
          },
        });
        // setId(user.data.data._id);
        // console.log("id", id);

        const { data } = await axios.get("http://localhost:8000/api/profiles");
        console.log(data);
        console.log("user id: ", user.data.data._id);
        const profile_to_set = await data.data.filter(
          (prof) => prof.user === user.data.data._id
        );

        setProfile(profile_to_set[0]);
      } catch (error) {
        console.log(error);
      }
    };

    defaultData();
  }, []);

  console.log("profile yoyo: ", profile);
  if (profile) {
    return (
      <div>
        <div className="container-profile">
          <img
            className="container-img"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile.jpg"
          />
          <div className="container-detail-1">
            <div className="container-detail-info">
              {editModes.primaryName ? (
                <MultilineEdit
                  placeholder="Name: "
                  value={profile.primaryName}
                  setValue={(value) => setProfileField('primaryName', value)}
                  setIsEdit={() => handleCloseEdit('primaryName')}
                  shouldFocus={true}
                />
              ) : (
                <>
                  <BiEdit className="edit-button" onClick={() => handleClickOnEdit('primaryName')} />
                  <h1>{profile.primaryName}</h1>
                </>
              )}
            </div>

            <div className="container-detail-info">
              {editModes.email ? (
                <MultilineEdit
                  placeholder="Email: "
                  value={profile.email}
                  setValue={(value) => setProfileField('email', value)}
                  setIsEdit={() => handleCloseEdit('email')}
                  shouldFocus={true}
                />
              ) : (
                <>
                  <BiEdit className="edit-button" onClick={() => handleClickOnEdit('email')} />
                  <h4>{profile.email}</h4>
                </>
              )}
            </div>

            <div className="container-detail-info">
              {editModes.phone ? (
                <MultilineEdit
                  placeholder="Phone: "
                  value={profile.phone}
                  setValue={(value) => setProfileField('phone', value)}
                  setIsEdit={() => handleCloseEdit('phone')}
                  shouldFocus={true}
                />
              ) : (
                <>
                  <BiEdit className="edit-button" onClick={() => handleClickOnEdit('phone')} />
                  <h4>{profile.phone}</h4>
                </>
              )}
            </div>
          </div>

          <div className="container-vertical-line"></div>

          <div className="container-detail-2">
            <div className="container-detail-info">
              {/* TODO: change editModes.institution to a button */}
              {editModes.institution ? (
                <>
                  <MultilineEdit
                    placeholder="institution: "
                    value={profile.institution}
                    setValue={(value) => setProfileField('institution', value)}
                    setIsEdit={() => handleCloseEdit('institution')}
                    shouldFocus={true}
                  />

                  <h3>Title</h3>

                  <ul>
                    {profile.titles?.map((title, index) => (
                      <li className="title" key={index}>
                        <MultilineEdit
                          placeholder="Title: "
                          value={title}
                          index={index}
                          setValue={(value, index) => setProfileField('titles', value, index)}
                          setIsEdit={() => handleCloseEdit('titles')}
                        />
                      </li>
                    ))}
                  </ul>

                  <h3> Major </h3>
                  <MultilineEdit
                    placeholder="Major: "
                    value={profile.major}
                    setValue={(value) => setProfileField('major', value)}
                    setIsEdit={() => handleCloseEdit('major')}
                  />

                  <h3>Focus Area</h3>
                  <ul>
                    {profile.focusAreas?.map((focusArea, index) => {
                      return (
                        <li className="focusArea" key={index}>
                          <MultilineEdit
                            placeholder="FocusArea: "
                            value={focusArea}
                            index={index}
                            setValue={(value, index) => setProfileField('focusAreas', value, index)}
                            setIsEdit={() => handleCloseEdit('focusAreas')}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <>
                  <BiEdit className="edit-button" onClick={() => handleClickOnEdit('major')} />
                  <h3>{profile.institution}</h3>
                  <h3>Title</h3>

                  <ul>
                    {profile.titles?.map((title, index) => {
                      return (
                        <li className="title" key={index}>
                          {title}
                        </li>
                      );
                    })}
                  </ul>

                  <h3> Major: {profile.major}</h3>
                  <h3>Focus Area</h3>
                  <ul>
                    {profile.focusAreas?.map((focusArea, index) => {
                      return (
                        <li className="focusArea" key={index}>
                          {focusArea}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

          </div>
          <div className="edit-buttons">
            <Link to="/">
              <FiIcons.FiEdit className="edit-profile-button" color="#625155"/>
            </Link>
            {/* <button className="edit-keywords-button">edit</button> */}
          </div>
        </div>

        <div className="d-flex">
          <div className="container-professional-detail">
            <div className="educations">
            <div className="edit-buttons">
            <Link to="/">
              <FiIcons.FiEdit className="edit-education-button" color="#625155"/>
            </Link>
            {/* <button className="edit-keywords-button">edit</button> */}
          </div>
              <h1>Education</h1>
              <ul>
                {profile.educations?.map((education, index) => {
                  return (
                    <li className="education" key={index}>
                      {education}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="honors">
            <div className="edit-buttons">
            <Link to="/">
              <FiIcons.FiEdit className="edit-honors-button" color="#625155"/>
            </Link>
            {/* <button className="edit-keywords-button">edit</button> */}
          </div>
              <h1>Honors</h1>
              <ul>
                {profile.honors?.map((honor, index) => {
                  return (
                    <li className="honor" key={index}>
                      {honor}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="experiences">
            <div className="edit-buttons">
            <Link to="/">
              <FiIcons.FiEdit className="edit-experiences-button" color="#625155"/>
            </Link>
            {/* <button className="edit-keywords-button">edit</button> */}
          </div>
              <h1>Experience</h1>
              <ul>
                {profile.experiences?.map((experience, index) => {
                  return (
                    <li className="experience" key={index}>
                      {experience}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="keywords">
            <div className="edit-buttons">
            <Link to="/">
              <FiIcons.FiEdit className="edit-keywords-button" color="#625155"/>
            </Link>
            {/* <button className="edit-keywords-button">edit</button> */}
          </div>
              <h1>Key Words</h1>
              <ul>
                {profile.keywords?.map((keyword, index) => {
                  return (
                    <li className="keyword" key={index}>
                      {keyword}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="container-papers">
          <div className="edit-buttons">
            <Link to="/">
              <FiIcons.FiEdit className="edit-papers-button" color="#625155"/>
            </Link>
            {/* <button className="edit-keywords-button">edit</button> */}
          </div>
            <h1>Published Papers</h1>
            <ul className="published-papers">
              {profile.papers?.map((paper, index) => {
                return (
                  <li className="published-paper" key={index}>
                    {paper}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="no-profile-container">
        <h1>A Profile Has Not Been Made</h1>
        <button className="go-to-form-button" onClick={click}>
          Make Your First Profile!
        </button>
      </div>
    );
  }
}

export default Profile;