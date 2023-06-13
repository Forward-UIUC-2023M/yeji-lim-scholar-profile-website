// import React from "react";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import MultilineEdit from "./MultilineEdit";
import "./Profile.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import { IconContext } from "react-icons";
import { BiEdit, BiCheckSquare, BiXCircle } from "react-icons/bi";
import { Button, Dropdown, Modal, Form } from "react-bootstrap";

// Connect this to backend, loop through back end to get the list elements
// Figure out how to use useEffect before rendering

function Profile() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState("");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    keywords: [],
    email: "",
    phone: "",
    experiences: [],
    institution: "",
    titles: [],
    major: "",
    focusAreas: [],
    honors: [],
    experiences: [],
    papers: [],
  });

  const [inlineEditMode, setInlineEditMode] = useState({
    firstName: false,
    lastName: false,
    basicInfo: false,
    keywords: false,
    email: false,
    phone: false,
    experiences: false,
    institution: false,
    titles: false,
    major: false,
    focusAreas: false,
    honors: false,
    experiences: false,
    papers: false,
  }); // states for whether current elements, e.g. primaryName, is in edit mode

  const [modalEditMode, setModalEditMode] = useState({
    basicInfo: false,
    experiences: false,
    honors: false,
    experiences: false,
    keywords: false,
    papers: false,
  });

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

  // set field in inlineEditMode to be true when the user clicks on edit buttons
  const handleOpenInlineEdit = (fieldName) => {
    setInlineEditMode((prevEditingStates) => ({
      ...prevEditingStates,
      [fieldName]: true,
    }));
  };

  // set field in inlineEditMode to be false when the user finish editing
  const handleCloseInlineEdit = (fieldName) => {
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
    setModalEditMode((prevEditingStates) => ({
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
      } catch (error) {
        console.log(error);
      }
    };

    defaultData();
  }, []);

  console.log("profile yoyo: ", profile);
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
              />
              Email:
              <Form.Control
                type="text"
                defaultValue={profile.email}
                placeholder="Email"
              />
              Phone:
              <Form.Control
                type="text"
                defaultValue={profile.phone}
                placeholder="Phone"
              />
              Institution:
              <Form.Control
                type="text"
                defaultValue={profile.institution}
                placeholder="Institution"
              />
              Major:
              <Form.Control
                type="text"
                defaultValue={profile.major}
                placeholder="Major"
              />
              Focus Areas:
              <Form.Control
                type="text"
                defaultValue={profile.focusAreas}
                placeholder="Focus Areas"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => handleCloseModalEdit("basicInfo")}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => handleCloseModalEdit("basicInfo")}
              >
                Save Changes
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
                  value={profile.email}
                  setValue={(value) => setProfileField("email", value)}
                />

                <MultilineEdit
                  placeholder="Phone: "
                  value={profile.phone}
                  setValue={(value) => setProfileField("phone", value)}
                />
              </div>

              <div className="container-vertical-line"></div>

              <div className="container-detail-2">
                <MultilineEdit
                  placeholder="institution: "
                  value={profile.institution}
                  setValue={(value) => setProfileField("institution", value)}
                />

                <h3>Title</h3>

                <ul>
                  {profile.titles?.map((title, index) => (
                    <li className="title" key={index}>
                      <MultilineEdit
                        placeholder="Title: "
                        value={title}
                        index={index}
                        setValue={(value, index) =>
                          setProfileField("titles", value, index)
                        }
                      />
                    </li>
                  ))}
                </ul>

                <h3> Major </h3>
                <MultilineEdit
                  placeholder="Major: "
                  value={profile.major}
                  setValue={(value) => setProfileField("major", value)}
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
                          setValue={(value, index) =>
                            setProfileField("focusAreas", value, index)
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <BiCheckSquare
                size={35}
                onClick={() => handleCloseInlineEdit("basicInfo")}
              />
              <BiXCircle
                size={35}
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
            <div className="experiences">
              <Modal
                show={modalEditMode.experiences}
                onHide={() => handleCloseModalEdit("experiences")}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Education:
                  <Form.Control
                    type="text"
                    defaultValue={profile.experiences}
                    placeholder="Education"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleCloseModalEdit("educations")}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleCloseModalEdit("educations")}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              {inlineEditMode.experiences ? (
                <>
                  <h1>Education</h1>
                  <ul>
                    {profile.experiences?.map((education, index) => {
                      return (
                        <li className="education" key={index}>
                          <MultilineEdit
                            placeholder="Education: "
                            value={education}
                            index={index}
                            setValue={(value, index) =>
                              setProfileField("experiences", value, index)
                            }
                          />
                        </li>
                      );
                    })}
                  </ul>

                  <BiCheckSquare
                    size={35}
                    onClick={() => handleCloseInlineEdit("experiences")}
                  />
                  <BiXCircle
                    size={35}
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

                  <h1>Education</h1>
                  <ul>
                    {profile.experiences?.map((education, index) => {
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
                  <Form.Control
                    type="text"
                    defaultValue={profile.honors}
                    placeholder="Honor"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleCloseModalEdit("honors")}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleCloseModalEdit("honors")}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              {inlineEditMode.honors ? (
                <>
                  <h1>Honor</h1>
                  <ul>
                    {profile.honors?.map((honor, index) => {
                      return (
                        <li className="honor" key={index}>
                          <MultilineEdit
                            placeholder="Honor: "
                            value={honor}
                            index={index}
                            setValue={(value, index) =>
                              setProfileField("honors", value, index)
                            }
                          />
                        </li>
                      );
                    })}
                  </ul>

                  <BiCheckSquare
                    size={35}
                    onClick={() => handleCloseInlineEdit("honors")}
                  />
                  <BiXCircle
                    size={35}
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
                  <Form.Control
                    type="text"
                    defaultValue={profile.experiences}
                    placeholder="Experience"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleCloseModalEdit("experiences")}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleCloseModalEdit("experiences")}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              {inlineEditMode.experiences ? (
                <>
                  <h1>Experience</h1>
                  <ul>
                    {profile.experiences?.map((experience, index) => {
                      return (
                        <li className="experience" key={index}>
                          <MultilineEdit
                            placeholder="Experience: "
                            value={experience}
                            index={index}
                            setValue={(value, index) =>
                              setProfileField("experiences", value, index)
                            }
                          />
                        </li>
                      );
                    })}
                  </ul>

                  <BiCheckSquare
                    size={35}
                    onClick={() => handleCloseInlineEdit("experiences")}
                  />
                  <BiXCircle
                    size={35}
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
                  <Form.Control
                    type="text"
                    defaultValue={profile.keywords}
                    placeholder="Keyword"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleCloseModalEdit("keywords")}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleCloseModalEdit("keywords")}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              {inlineEditMode.keywords ? (
                <>
                  <h1>Keywords</h1>
                  <ul>
                    {profile.keywords?.map((keyword, index) => {
                      return (
                        <li className="keyword" key={index}>
                          <MultilineEdit
                            placeholder="Keyword: "
                            value={keyword}
                            index={index}
                            setValue={(value, index) =>
                              setProfileField("keywords", value, index)
                            }
                          />
                        </li>
                      );
                    })}
                  </ul>

                  <BiCheckSquare
                    size={35}
                    onClick={() => handleCloseInlineEdit("keywords")}
                  />
                  <BiXCircle
                    size={35}
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
                <Form.Control
                  type="text"
                  defaultValue={profile.papers}
                  placeholder="Paper"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => handleCloseModalEdit("papers")}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleCloseModalEdit("papers")}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            {inlineEditMode.papers ? (
              <>
                <h1>Papers</h1>
                <ul>
                  {profile.papers?.map((paper, index) => {
                    return (
                      <li className="paper" key={index}>
                        <MultilineEdit
                          placeholder="Paper: "
                          value={paper}
                          index={index}
                          setValue={(value, index) =>
                            setProfileField("papers", value, index)
                          }
                        />
                      </li>
                    );
                  })}
                </ul>

                <BiCheckSquare
                  size={35}
                  onClick={() => handleCloseInlineEdit("papers")}
                />
                <BiXCircle
                  size={35}
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
