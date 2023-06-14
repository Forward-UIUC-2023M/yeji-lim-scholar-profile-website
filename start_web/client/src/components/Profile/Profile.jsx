// import React from "react";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import MultilineEdit from "./MultilineEdit";
import "./Profile.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import { IconContext } from "react-icons";
import {
  BiEdit,
  BiCheckSquare,
  BiXCircle,
  BiPlusCircle,
  BiMinusCircle,
} from "react-icons/bi";
import { Button, Dropdown, Modal, Form } from "react-bootstrap";

// Connect this to backend, loop through back end to get the list elements
// Figure out how to use useEffect before rendering

function Profile() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState("");
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
    honors: [],
    experiences: [],
    papers: [],
  };

  const [profile, setProfile] = useState(defaultProfile); // user's current profile displayed
  const [updatedProfile, setUpdatedProfile] = useState(defaultProfile); // user's updated profile in inline edit or modal form control

  const [inlineEditMode, setInlineEditMode] = useState({
    firstName: false,
    lastName: false,
    basicInfo: false,
    honors: false,
    experiences: false,
    keywords: false,
    papers: false,
  }); // states for whether current elements, e.g. primaryName, is in inline edit mode

  const [modalEditMode, setModalEditMode] = useState({
    basicInfo: false,
    honors: false,
    experiences: false,
    keywords: false,
    papers: false,
  }); // states for whether current elements, e.g. primaryName, is in modal edit mode

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

  const click = (e) => {
    navigate("/form");
  };

  // setter for all fields in the user profile
  const setProfileField = (fieldName, value, index = null) => {
    setProfile((prevProfile) => {
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
  const removeProfileField = (fieldName, index = null) => {
    setProfile((prevProfile) => {
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
  };

  // set profile to be the updated version and then close the inlineEditMode
  const handleSaveInlineEdit = (fieldName) => {
    setProfile(updatedProfile);

    setInlineEditMode((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: false,
    }));
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
  };

  // set profile to be the updated version and then close the modal
  const handleSaveModalEdit = (fieldName) => {
    setProfile(updatedProfile);

    setModalEditMode((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: false,
    }));
  };

  const handleAddTitle = () => {};

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
        console.log("user is: ", user.data.data.photo);
        setPhoto(user.data.data.photo);
        console.log("user is 2: ", photo);
        // setId(user.data.data._id);
        // console.log("id", id);

        const { data } = await axios.get("http://localhost:8000/api/profiles");
        console.log(data);
        console.log("user id: ", user.data.data._id);
        const profile_to_set = await data.data.filter(
          (prof) => prof.user === user.data.data._id
        );

        setProfile(profile_to_set[0]);
        setUpdatedProfile(profile_to_set[0]);
      } catch (error) {
        console.log(error);
      }
    };

    defaultData();
  }, []);

  // const location = useLocation();
  // const userInfo = location.state.userInfo;

  console.log("profile: ", profile);
  console.log("profile new: ", updatedProfile);
  if (profile) {
    return (
      <div className="profile-page-container">
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
                defaultValue={profile.firstName}
                placeholder="Name"
                onChange={(e) =>
                  setUpdatedProfileField("primaryName", e.target.value)
                }
              />
              Email:
              <Form.Control
                type="text"
                defaultValue={profile.email}
                placeholder="Email"
                onChange={(e) =>
                  setUpdatedProfileField("email", e.target.value)
                }
              />
              Phone:
              <Form.Control
                type="text"
                defaultValue={profile.phone}
                placeholder="Phone"
                onChange={(e) =>
                  setUpdatedProfileField("phone", e.target.value)
                }
              />
              Institution:
              <Form.Control
                type="text"
                defaultValue={profile.institution}
                placeholder="Institution"
                onChange={(e) =>
                  setUpdatedProfileField("institution", e.target.value)
                }
              />
              Title:
              <ul>
                {profile.titles?.map((title, index) => (
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
                defaultValue={profile.major}
                placeholder="Major"
                onChange={(e) =>
                  setUpdatedProfileField("major", e.target.value)
                }
              />
              Focus Areas:
              <ul>
                {profile.focusAreas?.map((focusArea, index) => (
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
                  value={profile.firstName}
                  setValue={(value) => setProfileField("firstName", value)}
                  shouldFocus={true}
                />
                <MultilineEdit
                  placeholder="Last Name: "
                  value={profile.lastName}
                  setValue={(value) => setProfileField("lastName", value)}
                  shouldFocus={true}
                />

                <MultilineEdit
                  placeholder="Email: "
                  value={updatedProfile.email}
                  setValue={(value) => setUpdatedProfileField("email", value)}
                />

                <MultilineEdit
                  placeholder="Phone: "
                  value={profile.phone}
                  setValue={(value) => setUpdatedProfileField("phone", value)}
                />
              </div>

              <div className="container-vertical-line"></div>

              <div className="container-detail-2">
                <MultilineEdit
                  placeholder="institution: "
                  value={profile.institution}
                  setValue={(value) =>
                    setUpdatedProfileField("institution", value)
                  }
                />

                <h3>Title</h3>

                <ul>
                  {profile.titles?.map((title, index) => {
                    if (index !== profile.titles.length - 1) {
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
                                removeProfileField("titles", index)
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
                              onClick={() => setProfileField("titles", "", -1)}
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
                  value={profile.major}
                  setValue={(value) => setUpdatedProfileField("major", value)}
                />

                <h3>Focus Area</h3>
                <ul>
                  {profile.focusAreas?.map((focusArea, index) => {
                    if (index !== profile.focusAreas.length - 1) {
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
                                removeProfileField("focusAreas", index)
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
                                setProfileField("focusAreas", "", -1)
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
                {/* <h1>{profile.firstName} {profile.lsatName}</h1> */}
                <h1>
                  {profile.firstName} <span>{profile.lastName}</span>
                </h1>
                <h4>{profile.email}</h4>
                <h4>{profile.phone}</h4>
              </div>

              <div className="container-vertical-line"></div>

              <div className="container-detail-2">
                <BiEdit
                  className="edit-button"
                  onClick={() => handleOpenInlineEdit("major")}
                />
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
                    {profile.educations?.map((education, index) => (
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
                    {profile.educations?.map((education, index) => {
                      if (index !== profile.educations.length - 1) {
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
                                  removeProfileField("educations", index)
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
                                  setProfileField("educations", "", -1)
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
                    {profile.educations?.map((education, index) => {
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
                    {profile.honors?.map((honor, index) => (
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
                    {profile.honors?.map((honor, index) => {
                      if (index !== profile.honors.length - 1) {
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
                                  removeProfileField("honors", index)
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
                                  setProfileField("honors", "", -1)
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
                    {profile.honors?.map((honor, index) => {
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
                    {profile.experiences?.map((experience, index) => (
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
                    {profile.experiences?.map((experience, index) => {
                      if (index !== profile.experiences.length - 1) {
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
                                  removeProfileField("experiences", index)
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
                                  setProfileField("experiences", "", -1)
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
                    {profile.experiences?.map((experience, index) => {
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
                    {profile.keywords?.map((keyword, index) => (
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
                    {profile.keywords?.map((keyword, index) => {
                      if (index !== profile.keywords.length - 1) {
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
                                  removeProfileField("keywords", index)
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
                                  setProfileField("keywords", "", -1)
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
                    {profile.keywords?.map((keyword, index) => {
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
                  {profile.papers?.map((paper, index) => (
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
                  {profile.papers?.map((paper, index) => {
                    if (index !== profile.papers.length - 1) {
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
                                removeProfileField("papers", index)
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
                              onClick={() => setProfileField("papers", "", -1)}
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
                  {profile.papers?.map((paper, index) => {
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
        <button className="go-to-form-button" onClick={click}>
          Make Your First Profile!
        </button>
      </div>
    );
  }
}

export default Profile;
