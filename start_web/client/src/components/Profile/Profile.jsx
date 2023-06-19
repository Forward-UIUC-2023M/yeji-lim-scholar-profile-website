// import React from "react";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import {
  BiEdit,
  BiCheckSquare,
  BiXCircle,
  BiPlusCircle,
  BiMinusCircle,
} from "react-icons/bi";
import { Button, Dropdown, Modal, Form } from "react-bootstrap";
import axios from "axios";
import MultilineEdit from "./MultilineEdit";
import "./Profile.css";

// Connect this to backend, loop through back end to get the list elements
// Figure out how to use useEffect before rendering

function Profile() {
  const defaultProfile = {
    firstName: "",
    lastName: "",
    keywords: [],
    email: "",
    phone: "",
    institution: "",
    titles: [],
    major: "",
    focusAreas: [],
    educations: [],
    honors: [],
    experiences: [],
    papers: [],
  };

  const navigate = useNavigate();
  const location = useLocation();
  let shouldDelete = location.state || false;

  const [profileId, setProfileId] = useState("");
  const [photo, setPhoto] = useState("");
  const [profile, setProfile] = useState(defaultProfile); // user's current profile displayed
  const [updatedProfile, setUpdatedProfile] = useState(defaultProfile); // user's updated profile in inline edit or modal form control
  const [form, setForm] = useState();

  const [inlineEditMode, setInlineEditMode] = useState({
    basicInfo: false,
    honors: false,
    experiences: false,
    keywords: false,
    papers: false,
  }); // states for whether current elements, e.g. honors, is in inline edit mode

  const [modalEditMode, setModalEditMode] = useState({
    basicInfo: false,
    honors: false,
    experiences: false,
    keywords: false,
    papers: false,
  }); // states for whether current elements, e.g. honors, is in modal edit mode

  // use of custom edit button instead of original dropdown button
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="#valid"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <FiIcons.FiEdit className="edit-honors-button" color="#625155" />
    </a>
  ));

  const handleCreateProfile = () => {
    navigate("/form");
  };

  // setter for all fields in the user updated profile
  const setUpdatedProfileField = (fieldName, value, index = null) => {
    setUpdatedProfile((prevProfile) => {
      if (index === null) {
        // Handle non-indexed fields
        return {
          ...prevProfile,
          [fieldName]: value,
        };
      } else if (index === -1) {
        // Handle adding new entry to the list
        const updatedField = [...prevProfile[fieldName], value];

        return {
          ...prevProfile,
          [fieldName]: updatedField,
        };
      } else {
        // Handle indexed fields
        const updatedField = [...prevProfile[fieldName]];
        updatedField[index] = value;

        return {
          ...prevProfile,
          [fieldName]: updatedField,
        };
      }
    });
  };

  // remove the specified index in the given fieldName array, fieldName must be an array!
  const removeUpdatedProfileField = (fieldName, index = null) => {
    setUpdatedProfile((prevProfile) => {
      const updatedField = [...prevProfile[fieldName]];
      updatedField.splice(index, 1);

      return {
        ...prevProfile,
        [fieldName]: updatedField,
      };
    });
  };

  // set field in inlineEditMode to be true when the user clicks on edit buttons
  const handleOpenInlineEdit = (fieldName) => {
    setInlineEditMode((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: true,
    }));
  };

  // set field in inlineEditMode to be false when the user finish editing
  const handleCloseInlineEdit = (fieldName) => {
    setUpdatedProfile(profile);

    setInlineEditMode((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: false,
    }));

    removeEmptyField();
  };

  // set profile to be the updated version, close the inlineEditMode, and send profile to backend
  const handleSaveInlineEdit = (fieldName) => {
    setProfile(updatedProfile);

    setInlineEditMode((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: false,
    }));

    const newProfile = removeEmptyField();
    updateBackend(newProfile);
  };

  // set field in inlineEditMode to be true when the user clicks on edit buttons
  const handleOpenModalEdit = (fieldName) => {
    setModalEditMode((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: true,
    }));
  };

  // set field in inlineEditMode to be false when the user finish editing
  const handleCloseModalEdit = (fieldName) => {
    setUpdatedProfile(profile);

    setModalEditMode((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: false,
    }));

    removeEmptyField();
  };

  // set profile to be the updated version, close the modal, and send profile to backend
  const handleSaveModalEdit = (fieldName) => {
    setProfile(updatedProfile);

    setModalEditMode((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: false,
    }));

    const newProfile = removeEmptyField();
    updateBackend(newProfile);
  };

  // remove any empty field in the updatedProfile. Returns the profile with no empty field for use in backend
  const removeEmptyField = () => {
    // TODO: write a more generalized form
    let updatedTitles = updatedProfile.titles.filter((title) => title !== "");
    let updatedFocusAreas = updatedProfile.focusAreas.filter(
      (focusArea) => focusArea !== ""
    );
    let updatedEducations = updatedProfile.educations.filter(
      (education) => education !== ""
    );
    let updatedHonors = updatedProfile.honors.filter((honor) => honor !== "");
    let updatedExperiences = updatedProfile.experiences.filter(
      (experience) => experience !== ""
    );
    let updatedKeywords = updatedProfile.keywords.filter(
      (keyword) => keyword !== ""
    );
    let updatedPapers = updatedProfile.papers.filter((paper) => paper !== "");

    updatedTitles = updatedTitles.length === 0 ? ["NONE"] : updatedTitles;
    updatedFocusAreas =
      updatedFocusAreas.length === 0 ? ["NONE"] : updatedFocusAreas;
    updatedEducations =
      updatedEducations.length === 0 ? ["NONE"] : updatedEducations;
    updatedHonors = updatedHonors.length === 0 ? ["NONE"] : updatedHonors;
    updatedExperiences =
      updatedExperiences.length === 0 ? ["NONE"] : updatedExperiences;
    updatedKeywords = updatedKeywords.length === 0 ? ["NONE"] : updatedKeywords;
    updatedPapers = updatedPapers.length === 0 ? ["NONE"] : updatedPapers;

    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      titles: updatedTitles,
      focusAreas: updatedFocusAreas,
      educations: updatedEducations,
      honors: updatedHonors,
      experiences: updatedExperiences,
      keywords: updatedKeywords,
      papers: updatedPapers,
    }));

    const newProfile = {
      ...updatedProfile,
      titles: updatedTitles,
      focusAreas: updatedFocusAreas,
      educations: updatedEducations,
      honors: updatedHonors,
      experiences: updatedExperiences,
      keywords: updatedKeywords,
      papers: updatedPapers,
    };

    return newProfile;
  };

  const updateBackend = async (currProfile) => {
    const account = localStorage.getItem("token");

    var data = JSON.stringify({
      firstName: currProfile.firstName,
      lastName: currProfile.lastName,
      keywords: currProfile.keywords,
      email: currProfile.email,
      phone: currProfile.phone,
      institution: currProfile.institution,
      titles: currProfile.titles,
      major: currProfile.major,
      focusAreas: currProfile.focusAreas,
      educations: currProfile.educations,
      honors: currProfile.honors,
      experiences: currProfile.experiences,
      papers: currProfile.papers,
    });
    var config = {
      method: "put",
      url: `http://localhost:8000/api/profiles/${profileId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${account}`,
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log("updateProfile", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let defaultData = async () => {
      try {
        // const account = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2NjZWM4MmUwY2Y4Y2M0MDVlMmFhNiIsImlhdCI6MTY4NTkxMTU3OSwiZXhwIjoxNjg4NTAzNTc5fQ.iJg27Jre1t-x5Ii7730bVr_ySvtPB8CWGMJ-exV1NWQ";
        const account = localStorage.getItem("token");
        let user = await axios.get("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${account}`,
          },
        });
        setPhoto(user.data.data.photo);

        const { data } = await axios.get("http://localhost:8000/api/profiles");
        console.log("data: ", data);
        const profile_to_set = await data.data.filter(
          (prof) => prof.user === user.data.data._id
        );
        setProfileId(profile_to_set[0]._id);
        setProfile(profile_to_set[0]);
        setUpdatedProfile(profile_to_set[0]);

        const userData = await axios.get("http://localhost:8000/api/forms");
        const relatedForm = await userData.data.data.filter(
          (form) => form.user === user.data.data._id
        );
        setForm(relatedForm[0]._id);
      } catch (error) {
        console.log(error);
      }
    };

    defaultData();
  }, []);

  // delete the profile if user perform the action
  useEffect(() => {
    if (shouldDelete) {
      shouldDelete = false;

      const account = localStorage.getItem("token");

      // delete the profile
      var config1 = {
        method: "delete",
        url: `http://localhost:8000/api/profiles/${profileId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account}`,
        },
      };

      // delete the form
      var config2 = {
        method: "delete",
        url: `http://localhost:8000/api/forms/${form}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account}`,
        },
      };

      let defaultData = async () => {
        await axios(config1)
          .then(function (response) {
            console.log("deleteProfile", response);
            setProfile();
            setUpdatedProfile(defaultProfile);
          })
          .catch(function (error) {
            console.log(error);
          });

        await axios(config2)
          .then(function (response) {
            console.log("deleteForm", response);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      defaultData();
    }
  }, [shouldDelete]);

  if (profile) {
    return (
      <div className="profile-page-container">
        <br />
        <br />
        <br />
        <div>
          <Modal
            show={modalEditMode.basicInfo}
            onHide={() => handleCloseModalEdit("basicInfo")}
          >
            <Modal.Header closeButton>
              <Modal.Title>Basic Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Name:
              <Form.Control
                type="text"
                defaultValue={updatedProfile.firstName}
                placeholder="First Name"
                onChange={(e) =>
                  setUpdatedProfileField("firstName", e.target.value)
                }
              />
              <Form.Control
                type="text"
                defaultValue={updatedProfile.lastName}
                placeholder="Last Name"
                onChange={(e) =>
                  setUpdatedProfileField("lastName", e.target.value)
                }
              />
              Email:
              <Form.Control
                type="text"
                defaultValue={updatedProfile.email}
                placeholder="Email"
                onChange={(e) =>
                  setUpdatedProfileField("email", e.target.value)
                }
              />
              Phone:
              <Form.Control
                type="text"
                defaultValue={updatedProfile.phone}
                placeholder="Phone"
                onChange={(e) =>
                  setUpdatedProfileField("phone", e.target.value)
                }
              />
              Institution:
              <Form.Control
                type="text"
                defaultValue={updatedProfile.institution}
                placeholder="Institution"
                onChange={(e) =>
                  setUpdatedProfileField("institution", e.target.value)
                }
              />
              Title:
              <ul>
                {updatedProfile.titles?.map((title, index) => (
                  <li key={index}>
                    <Form.Control
                      type="text"
                      defaultValue={title}
                      placeholder="Title"
                      onChange={(e) =>
                        setUpdatedProfileField("titles", e.target.value, index)
                      }
                    />
                  </li>
                ))}
              </ul>
              Major:
              <Form.Control
                type="text"
                defaultValue={updatedProfile.major}
                placeholder="Major"
                onChange={(e) =>
                  setUpdatedProfileField("major", e.target.value)
                }
              />
              Focus Areas:
              <ul>
                {updatedProfile.focusAreas?.map((focusArea, index) => (
                  <li key={index}>
                    <Form.Control
                      type="text"
                      defaultValue={focusArea}
                      placeholder="Focus Area"
                      onChange={(e) =>
                        setUpdatedProfileField(
                          "focusAreas",
                          e.target.value,
                          index
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => handleSaveModalEdit("basicInfo")}
              >
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleCloseModalEdit("basicInfo")}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {inlineEditMode.basicInfo ? (
            <div className="container-profile">
              <img className="container-img" src={photo} alt="profile.jpg" />

              <div className="container-detail-1">
                <MultilineEdit
                  placeholder="First Name: "
                  value={updatedProfile.firstName}
                  setValue={(value) =>
                    setUpdatedProfileField("firstName", value)
                  }
                  shouldFocus={true}
                />
                <MultilineEdit
                  placeholder="Last Name: "
                  value={updatedProfile.lastName}
                  setValue={(value) =>
                    setUpdatedProfileField("lastName", value)
                  }
                />

                <MultilineEdit
                  placeholder="Email: "
                  value={updatedProfile.email}
                  setValue={(value) => setUpdatedProfileField("email", value)}
                />

                <MultilineEdit
                  placeholder="Phone: "
                  value={updatedProfile.phone}
                  setValue={(value) => setUpdatedProfileField("phone", value)}
                />
              </div>

              <div className="container-vertical-line"></div>

              <div className="container-detail-2">
                <MultilineEdit
                  placeholder="institution: "
                  value={updatedProfile.institution}
                  setValue={(value) =>
                    setUpdatedProfileField("institution", value)
                  }
                />

                <h3>Title</h3>

                <ul>
                  {updatedProfile.titles?.map((title, index) => {
                    if (index !== updatedProfile.titles.length - 1) {
                      return (
                        <li className="title" key={index}>
                          <div className="d-flex">
                            <MultilineEdit
                              placeholder="Title: "
                              value={title}
                              index={index}
                              setValue={(value, index) =>
                                setUpdatedProfileField("titles", value, index)
                              }
                            />
                            <BiMinusCircle
                              size={30}
                              color="#123456"
                              className="ms-3 mt-1 bi-add-button"
                              onClick={() =>
                                removeUpdatedProfileField("titles", index)
                              }
                            />
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li className="title" key={index}>
                          <div className="d-flex">
                            <MultilineEdit
                              placeholder="Title: "
                              value={title}
                              index={index}
                              setValue={(value, index) =>
                                setUpdatedProfileField("titles", value, index)
                              }
                            />
                            <BiPlusCircle
                              size={30}
                              color="#123456"
                              className="ms-3 mt-1 bi-add-button"
                              onClick={() =>
                                setUpdatedProfileField("titles", "", -1)
                              }
                            />
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>

                <h3> Major </h3>
                <MultilineEdit
                  placeholder="Major: "
                  value={updatedProfile.major}
                  setValue={(value) => setUpdatedProfileField("major", value)}
                />

                <h3>Focus Area</h3>
                <ul>
                  {updatedProfile.focusAreas?.map((focusArea, index) => {
                    if (index !== updatedProfile.focusAreas.length - 1) {
                      return (
                        <li className="focusArea" key={index}>
                          <div className="d-flex">
                            <MultilineEdit
                              placeholder="Focus Area: "
                              value={focusArea}
                              index={index}
                              setValue={(value, index) =>
                                setUpdatedProfileField(
                                  "focusAreas",
                                  value,
                                  index
                                )
                              }
                            />
                            <BiMinusCircle
                              size={30}
                              color="#123456"
                              className="ms-3 mt-1 bi-add-button"
                              onClick={() =>
                                removeUpdatedProfileField("focusAreas", index)
                              }
                            />
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li className="focusArea" key={index}>
                          <div className="d-flex">
                            <MultilineEdit
                              placeholder="Focus Area: "
                              value={focusArea}
                              index={index}
                              setValue={(value, index) =>
                                setUpdatedProfileField(
                                  "focusAreas",
                                  value,
                                  index
                                )
                              }
                            />
                            <BiPlusCircle
                              size={30}
                              color="#123456"
                              className="ms-3 mt-1 bi-add-button"
                              onClick={() =>
                                setUpdatedProfileField("focusAreas", "", -1)
                              }
                            />
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>

              <BiCheckSquare
                className="bi-check-button"
                size={35}
                color="green"
                onClick={() => handleSaveInlineEdit("basicInfo")}
              />
              <BiXCircle
                className="bi-cancel-button"
                size={35}
                color="red"
                onClick={() => handleCloseInlineEdit("basicInfo")}
              />
            </div>
          ) : (
            <div className="container-profile">
              <img className="container-img" src={photo} alt="profile.jpg" />

              <div className="container-detail-1">
                <h1>
                  {updatedProfile.firstName + " " + updatedProfile.lastName}
                </h1>
                <h4>{updatedProfile.email}</h4>
                <h4>{updatedProfile.phone}</h4>
              </div>

              <div className="container-vertical-line"></div>

              <div className="container-detail-2">
                <BiEdit
                  className="edit-button"
                  onClick={() => handleOpenInlineEdit("major")}
                />
                <h3>{updatedProfile.institution}</h3>
                <h3>Title</h3>

                <ul>
                  {updatedProfile.titles?.map((title, index) => {
                    return (
                      <li className="title" key={index}>
                        {title}
                      </li>
                    );
                  })}
                </ul>

                <h3> Major: {updatedProfile.major}</h3>
                <h3>Focus Area</h3>
                <ul>
                  {updatedProfile.focusAreas?.map((focusArea, index) => {
                    return (
                      <li className="focusArea" key={index}>
                        {focusArea}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="edit-buttons">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleOpenInlineEdit("basicInfo")}
                    >
                      Inline Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleOpenModalEdit("basicInfo")}
                    >
                      Edit in Modal
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          )}
        </div>

        <div className="d-flex">
          <div className="container-professional-detail">
            <div className="educations">
              <Modal
                show={modalEditMode.educations}
                onHide={() => handleCloseModalEdit("educations")}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Education:
                  <ul>
                    {updatedProfile.educations?.map((education, index) => (
                      <li key={index}>
                        <Form.Control
                          type="text"
                          defaultValue={education}
                          placeholder="Education"
                          onChange={(e) =>
                            setUpdatedProfileField(
                              "educations",
                              e.target.value,
                              index
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    onClick={() => handleSaveModalEdit("educations")}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleCloseModalEdit("educations")}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              {inlineEditMode.educations ? (
                <>
                  <h1>Education</h1>
                  <ul>
                    {updatedProfile.educations?.map((education, index) => {
                      if (index !== updatedProfile.educations.length - 1) {
                        return (
                          <li className="education" key={index}>
                            <div className="d-flex">
                              <MultilineEdit
                                placeholder="Education: "
                                value={education}
                                index={index}
                                setValue={(value, index) =>
                                  setUpdatedProfileField(
                                    "educations",
                                    value,
                                    index
                                  )
                                }
                              />
                              <BiMinusCircle
                                size={30}
                                color="#123456"
                                className="ms-3 mt-1 bi-add-button"
                                onClick={() =>
                                  removeUpdatedProfileField("educations", index)
                                }
                              />
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li className="education" key={index}>
                            <div className="d-flex">
                              <MultilineEdit
                                placeholder="Education: "
                                value={education}
                                index={index}
                                setValue={(value, index) =>
                                  setUpdatedProfileField(
                                    "educations",
                                    value,
                                    index
                                  )
                                }
                              />
                              <BiPlusCircle
                                size={30}
                                color="#123456"
                                className="ms-3 mt-1 bi-add-button"
                                onClick={() =>
                                  setUpdatedProfileField("educations", "", -1)
                                }
                              />
                            </div>
                          </li>
                        );
                      }
                    })}
                  </ul>

                  <BiCheckSquare
                    className="bi-check-button"
                    size={35}
                    color="green"
                    onClick={() => handleSaveInlineEdit("educations")}
                  />
                  <BiXCircle
                    className="bi-cancel-button"
                    size={35}
                    color="red"
                    onClick={() => handleCloseInlineEdit("educations")}
                  />
                </>
              ) : (
                <>
                  <div className="edit-buttons">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleOpenInlineEdit("educations")}
                        >
                          Inline Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleOpenModalEdit("educations")}
                        >
                          Edit in Modal
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <h1>Education</h1>
                  <ul>
                    {updatedProfile.educations?.map((education, index) => {
                      return (
                        <li className="education" key={index}>
                          {education}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            <div className="honors">
              <Modal
                show={modalEditMode.honors}
                onHide={() => handleCloseModalEdit("honors")}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Honor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Honor:
                  <ul>
                    {updatedProfile.honors?.map((honor, index) => (
                      <li key={index}>
                        <Form.Control
                          type="text"
                          defaultValue={honor}
                          placeholder="Honor"
                          onChange={(e) =>
                            setUpdatedProfileField(
                              "honors",
                              e.target.value,
                              index
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    onClick={() => handleSaveModalEdit("honors")}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleCloseModalEdit("honors")}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              {inlineEditMode.honors ? (
                <>
                  <h1>Honor</h1>
                  <ul>
                    {updatedProfile.honors?.map((honor, index) => {
                      if (index !== updatedProfile.honors.length - 1) {
                        return (
                          <li className="honor" key={index}>
                            <div className="d-flex">
                              <MultilineEdit
                                placeholder="Honor: "
                                value={honor}
                                index={index}
                                setValue={(value, index) =>
                                  setUpdatedProfileField("honors", value, index)
                                }
                              />
                              <BiMinusCircle
                                size={30}
                                color="#123456"
                                className="ms-3 mt-1 bi-add-button"
                                onClick={() =>
                                  removeUpdatedProfileField("honors", index)
                                }
                              />
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li className="honor" key={index}>
                            <div className="d-flex">
                              <MultilineEdit
                                placeholder="Honor: "
                                value={honor}
                                index={index}
                                setValue={(value, index) =>
                                  setUpdatedProfileField("honors", value, index)
                                }
                              />
                              <BiPlusCircle
                                size={30}
                                color="#123456"
                                className="ms-3 mt-1 bi-add-button"
                                onClick={() =>
                                  setUpdatedProfileField("honors", "", -1)
                                }
                              />
                            </div>
                          </li>
                        );
                      }
                    })}
                  </ul>

                  <BiCheckSquare
                    className="bi-check-button"
                    size={35}
                    color="green"
                    onClick={() => handleSaveInlineEdit("honors")}
                  />
                  <BiXCircle
                    className="bi-cancel-button"
                    size={35}
                    color="red"
                    onClick={() => handleCloseInlineEdit("honors")}
                  />
                </>
              ) : (
                <>
                  <div className="edit-buttons">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleOpenInlineEdit("honors")}
                        >
                          Inline Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleOpenModalEdit("honors")}
                        >
                          Edit in Modal
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <h1>Honor</h1>
                  <ul>
                    {updatedProfile.honors?.map((honor, index) => {
                      return (
                        <li className="honor" key={index}>
                          {honor}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            <div className="experiences">
              <Modal
                show={modalEditMode.experiences}
                onHide={() => handleCloseModalEdit("experiences")}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Experience:
                  <ul>
                    {updatedProfile.experiences?.map((experience, index) => (
                      <li key={index}>
                        <Form.Control
                          type="text"
                          defaultValue={experience}
                          placeholder="Experience"
                          onChange={(e) =>
                            setUpdatedProfileField(
                              "experiences",
                              e.target.value,
                              index
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    onClick={() => handleSaveModalEdit("experiences")}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleCloseModalEdit("experiences")}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              {inlineEditMode.experiences ? (
                <>
                  <h1>Experience</h1>
                  <ul>
                    {updatedProfile.experiences?.map((experience, index) => {
                      if (index !== updatedProfile.experiences.length - 1) {
                        return (
                          <li className="experience" key={index}>
                            <div className="d-flex">
                              <MultilineEdit
                                placeholder="Experience: "
                                value={experience}
                                index={index}
                                setValue={(value, index) =>
                                  setUpdatedProfileField(
                                    "experiences",
                                    value,
                                    index
                                  )
                                }
                              />
                              <BiMinusCircle
                                size={30}
                                color="#123456"
                                className="ms-3 mt-1 bi-add-button"
                                onClick={() =>
                                  removeUpdatedProfileField(
                                    "experiences",
                                    index
                                  )
                                }
                              />
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li className="experience" key={index}>
                            <div className="d-flex">
                              <MultilineEdit
                                placeholder="Experience: "
                                value={experience}
                                index={index}
                                setValue={(value, index) =>
                                  setUpdatedProfileField(
                                    "experiences",
                                    value,
                                    index
                                  )
                                }
                              />
                              <BiPlusCircle
                                size={30}
                                color="#123456"
                                className="ms-3 mt-1 bi-add-button"
                                onClick={() =>
                                  setUpdatedProfileField("experiences", "", -1)
                                }
                              />
                            </div>
                          </li>
                        );
                      }
                    })}
                  </ul>

                  <BiCheckSquare
                    className="bi-check-button"
                    size={35}
                    color="green"
                    onClick={() => handleSaveInlineEdit("experiences")}
                  />
                  <BiXCircle
                    className="bi-cancel-button"
                    size={35}
                    color="red"
                    onClick={() => handleCloseInlineEdit("experiences")}
                  />
                </>
              ) : (
                <>
                  <div className="edit-buttons">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleOpenInlineEdit("experiences")}
                        >
                          Inline Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleOpenModalEdit("experiences")}
                        >
                          Edit in Modal
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <h1>Experience</h1>
                  <ul>
                    {updatedProfile.experiences?.map((experience, index) => {
                      return (
                        <li className="experience" key={index}>
                          {experience}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            <div className="keywords">
              <Modal
                show={modalEditMode.keywords}
                onHide={() => handleCloseModalEdit("keywords")}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Keyword</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Keyword:
                  <ul>
                    {updatedProfile.keywords?.map((keyword, index) => (
                      <li key={index}>
                        <Form.Control
                          type="text"
                          defaultValue={keyword}
                          placeholder="Keyword"
                          onChange={(e) =>
                            setUpdatedProfileField(
                              "keywords",
                              e.target.value,
                              index
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    onClick={() => handleSaveModalEdit("keywords")}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleCloseModalEdit("keywords")}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              {inlineEditMode.keywords ? (
                <>
                  <h1>Keywords</h1>
                  <ul>
                    {updatedProfile.keywords?.map((keyword, index) => {
                      if (index !== updatedProfile.keywords.length - 1) {
                        return (
                          <li className="keyword" key={index}>
                            <div className="d-flex">
                              <MultilineEdit
                                placeholder="Keyword: "
                                value={keyword}
                                index={index}
                                setValue={(value, index) =>
                                  setUpdatedProfileField(
                                    "keywords",
                                    value,
                                    index
                                  )
                                }
                              />
                              <BiMinusCircle
                                size={30}
                                color="#123456"
                                className="ms-3 mt-1 bi-add-button"
                                onClick={() =>
                                  removeUpdatedProfileField("keywords", index)
                                }
                              />
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li className="keyword" key={index}>
                            <div className="d-flex">
                              <MultilineEdit
                                placeholder="Keyword: "
                                value={keyword}
                                index={index}
                                setValue={(value, index) =>
                                  setUpdatedProfileField(
                                    "keywords",
                                    value,
                                    index
                                  )
                                }
                              />
                              <BiPlusCircle
                                size={30}
                                color="#123456"
                                className="ms-3 mt-1 bi-add-button"
                                onClick={() =>
                                  setUpdatedProfileField("keywords", "", -1)
                                }
                              />
                            </div>
                          </li>
                        );
                      }
                    })}
                  </ul>

                  <BiCheckSquare
                    className="bi-check-button"
                    size={35}
                    color="green"
                    onClick={() => handleSaveInlineEdit("keywords")}
                  />
                  <BiXCircle
                    className="bi-cancel-button"
                    size={35}
                    color="red"
                    onClick={() => handleCloseInlineEdit("keywords")}
                  />
                </>
              ) : (
                <>
                  <div className="edit-buttons">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleOpenInlineEdit("keywords")}
                        >
                          Inline Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleOpenModalEdit("keywords")}
                        >
                          Edit in Modal
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <h1>Keywords</h1>
                  <ul>
                    {updatedProfile.keywords?.map((keyword, index) => {
                      return (
                        <li className="keyword" key={index}>
                          {keyword}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="container-papers">
            <Modal
              show={modalEditMode.papers}
              onHide={() => handleCloseModalEdit("papers")}
            >
              <Modal.Header closeButton>
                <Modal.Title>Paper</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Paper:
                <ul>
                  {updatedProfile.papers?.map((paper, index) => (
                    <li key={index}>
                      <Form.Control
                        type="text"
                        defaultValue={paper}
                        placeholder="Paper"
                        onChange={(e) =>
                          setUpdatedProfileField(
                            "papers",
                            e.target.value,
                            index
                          )
                        }
                      />
                    </li>
                  ))}
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => handleSaveModalEdit("papers")}
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleCloseModalEdit("papers")}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {inlineEditMode.papers ? (
              <>
                <h1>Papers</h1>
                <ul>
                  {updatedProfile.papers?.map((paper, index) => {
                    if (index !== updatedProfile.papers.length - 1) {
                      return (
                        <li className="paper" key={index}>
                          <div className="d-flex">
                            <MultilineEdit
                              placeholder="Paper: "
                              value={paper}
                              index={index}
                              setValue={(value, index) =>
                                setUpdatedProfileField("papers", value, index)
                              }
                            />
                            <BiMinusCircle
                              size={30}
                              color="#123456"
                              className="ms-3 mt-1 bi-add-button"
                              onClick={() =>
                                removeUpdatedProfileField("papers", index)
                              }
                            />
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li className="paper" key={index}>
                          <div className="d-flex">
                            <MultilineEdit
                              placeholder="Paper: "
                              value={paper}
                              index={index}
                              setValue={(value, index) =>
                                setUpdatedProfileField("papers", value, index)
                              }
                            />
                            <BiPlusCircle
                              size={30}
                              color="#123456"
                              className="ms-3 mt-1 bi-add-button"
                              onClick={() =>
                                setUpdatedProfileField("papers", "", -1)
                              }
                            />
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>

                <BiCheckSquare
                  className="bi-check-button"
                  size={35}
                  color="green"
                  onClick={() => handleSaveInlineEdit("papers")}
                />
                <BiXCircle
                  className="bi-cancel-button"
                  size={35}
                  color="red"
                  onClick={() => handleCloseInlineEdit("papers")}
                />
              </>
            ) : (
              <>
                <div className="edit-buttons">
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleOpenInlineEdit("papers")}
                      >
                        Inline Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleOpenModalEdit("papers")}
                      >
                        Edit in Modal
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <h1>Papers</h1>
                <ul>
                  {updatedProfile.papers?.map((paper, index) => {
                    return (
                      <li className="paper" key={index}>
                        {paper}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="no-profile-container">
        <h1>A Profile Has Not Been Made</h1>
        <button className="go-to-form-button" onClick={handleCreateProfile}>
          Make Your First Profile!
        </button>
      </div>
    );
  }
}

export default Profile;
