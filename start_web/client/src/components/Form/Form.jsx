// import React from "react";
// import { useState, useRef } from "react";
// import Input from "./Input/Input";
// import "./Form.css";
// import axios from "axios";
// import { Navigate, useNavigate } from "react-router-dom";
// import * as MdIcons from "react-icons/md";
// import { FaListOl } from "react-icons/fa";

// function Form() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     primaryName: "",
//     alternativeName: [],
//     link: "",
//     keywords: "",
//   });

//   const { primaryName, alternativeName, link, resume, photo } = formData;
//   const [linkList, setLinkList] = useState([{ link: "" }]);
//   const [altNameList, setAltNameList] = useState([{ alternativeName: "" }]);
//   //   const [toggle, setToggle] = useState(false);

//   //   const inputRef = useRef();
//   //   const selectRef = useRef();

//   //   //   const { primaryName, link, keywords } = formData;

//   //   const onChange = (e, index) => {
//   //     setFormData((prevState) => ({
//   //       ...prevState,
//   //       [e.target.id]: e.target.value,
//   //     }));
//   //   };

//   //   const handleAddField = (e) => {
//   //     e.preventDefault();
//   //     const values = [...formData];
//   //     values.push({
//   //       label: inputRef.current.value || "label",
//   //       type: selectRef.current.value || "text",
//   //       value: "",
//   //     });
//   //     setFormData(values);
//   //     setToggle(false);
//   //   };

//   //   const addBtnClick = (e) => {
//   //     e.preventDefault();
//   //     setToggle(true);
//   //   };

// //   const inputArr = [
// //     {
// //       type: "text",
// //       id: 1,
// //       value: "",
// //     },
// //   ];

//   //   const [arr, setArr] = useState(inputArr);

//   const addAltNameInput = () => {
//     setAltNameList([...altNameList, { alternativeName: "" }]);
//   };

//   const addLinkInput = () => {
//     setLinkList([...linkList, { link: "" }]);
//   };

//   const removeAltNameInput = (index) => {
//     const list = [...altNameList];
//     list.splice(index, 1);
//     setAltNameList(list);

//   };

//   const removeLinkInput = (index) => {
//     const list = [...linkList];
//     list.splice(index, 1);
//     setLinkList(list);
//   };

//   const onChange = (e) => {
//     e.preventDefault();

//     // const index = e.target.id;
//     // setArr((s) => {
//     //   const newArr = s.slice();
//     //   newArr[index].value = e.target.value;

//     //   return newArr;
//     // });
//     console.log(e.target.id);
//     console.log( e.target);
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.id]: e.target.value,
//     }));
//   };

//   let submit = async (e) => {
//     // e.preventDefault();
//     // console.log("submitted", formData);
//     e.preventDefault();
//     const account = localStorage.getItem("token");
//     let user = await axios.get("http://localhost:8000/api/auth/me", {
//       headers: {
//         Authorization: `Bearer ${account}`,
//       },
//     });
//     var data = JSON.stringify({
//       primaryName: primaryName,
//         alternativeName: alternativeName,
//     //   alternativeName: altNameList,
//       link: link,
//       resume: resume,
//       photo: photo
//       //   keywords: keywords,
//     });
//     var config = {
//       method: "post",
//       url: "http://localhost:8000/api/profiles",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${account}`,
//       },
//       data: data,
//     };

//     axios(config)
//       .then(function (response) {
//         console.log(JSON.stringify(response.data));
//         // if (photo == null) {
//         //   navigate("/Profile");
//         // } else {
//         //   singleFileUploadHandler(account, response.data.data._id);
//         // }
//         navigate("/profile");
//       })
//       .catch(function (error) {
//         console.log("post listing error: ", error.message);
//       });
//   };

//   return (
//     <div className="main-container">
//       <div className="profile-form-continer">
//         <h1>Profile Form</h1>
//         <form
//           className="profile-form"
//           runat="server"
//           enctype="multipart/form-data"
//           onSubmit={submit}
//         >
//           <p className="profile-form-input">Primary Name</p>
//           <input
//             type="text"
//             className="formPrimaryName"
//             placeholder="Preferred full name"
//             required
//             id="primaryName"
//             onChange={onChange}
//           />
//           <p className="profile-form-input">Alternative Names</p>
//           {altNameList.map((singleAltName, index) => {
//             return (
//               <>
//                 <div className="altNameInputs">
//                   <input
//                     type="text"
//                     className="formAlternativeName"
//                     id="alternativeName"
//                     placeholder="Alternative name"
//                     onChange={onChange}
//                     key={index}
//                   />
//                   {altNameList.length > 1 && (
//                     <button
//                       className="remove-input"
//                       type="button"
//                       key={index}
//                       onClick={() => removeAltNameInput(index)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//                 {/* <button className="more-input" onClick={addInput}>+</button> */}
//               </>
//             );
//           })}
//           <div className="add-buttons">
//             <button
//               className="more-input"
//               type="button"
//               onClick={addAltNameInput}
//             >
//               Add
//             </button>
//           </div>
//           {/* <div className="add-buttons">
//             <MdIcons.MdOutlineAddCircleOutline
//               className="more-input"
//               onClick={addAltNameInput}
//             />
//           </div> */}
//           {/* <input
//             type="text"
//             className="formAlternativeName"
//             placeholder="Alternative name"
//             id="alternativeName"
//             onChange={onChange}
//           />
//           <button className="more-input" onClick={addInput}>
//             +
//           </button> */}

//           {/* <div>
//             <button onClick={addInput}>+</button>
//             {arr.map((item, i) => {
//               return (
//                 <input
//                   onChange={onChange}
//                   value={item.value}
//                   id={i}
//                   type={item.type}
//                   size="40"
//                 />
//               );
//             })}
//           </div> */}

//           <p className="profile-form-input">Link</p>
//           {linkList.map((singleLink, index) => {
//             return (
//               <>
//                 <div className="linkInputs">
//                   <input
//                     type="text"
//                     className="formLink"
//                     id="link"
//                     placeholder="Link to preferred website with information"
//                     onChange={onChange}
//                     key={index}
//                   />
//                   {linkList.length > 1 && (
//                     <button
//                       className="remove-input"
//                       type="button"
//                       key={index}
//                       onClick={() => removeLinkInput(index)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//                 {/* <button className="more-input" onClick={addInput}>+</button> */}
//               </>
//             );
//           })}
//           <div className="add-buttons">
//             <button className="more-input" type="button" onClick={addLinkInput}>
//               Add
//             </button>
//           </div>
//           {/* <input
//             type="text"
//             className="formLink"
//             id="link"
//             placeholder="Link to preferred website with information"
//             onChange={onChange}
//           />
//           <button className="more-input">+</button> */}
//           <p className="profile-form-input">Other Information</p>
//           <textarea
//             type="text"
//             className="formOther"
//             id="other"
//             placeholder="Other miscellaneous information"
//             onChange={onChange}
//           />
//           {/* <p className="profile-form-link">Links</p>
//           {formData.map((obj, index) => (
//             <Input
//               key={index}
//               objValue={obj}
//               onChange={onChange}
//               index={index}
//             />
//           ))} */}
//           {/* <p className="profile-form-keywords">Key Words</p>
//           {formData.map((obj, index) => (
//             <Input
//               key={index}
//               objValue={obj}
//               onChange={onChange}
//               index={index}
//             />
//           ))} */}
//           {/* <p className="profile-form-keywords">Key Words</p>
//           <input
//             type="text"
//             className="formKeywords"
//             id="keywords"
//             placeholder="Keywords for your studies"
//             onChange={onChange}
//           /> */}
//           <p className="profile-form-input"> Resume/CV </p>
//           <input
//             type="file"
//             name="form-resume"
//             className="formResume"
//             id="resume"
//             // onChange={handleFileChange}
//           />
//           <p className="profile-form-input"> Profile Picture </p>
//           <input
//             type="file"
//             name="profilePhoto"
//             className="formProfilePhoto"
//             id="photo"
//             // onChange={handleFileChange}
//           />

//           <div>
//             <button type="submit" version="secondary" className="submit-button">
//               {" "}
//               Submit{" "}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Form;
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Flex,
  List,
  ListItem,
  Text,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function Form() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Resume/CV selected");
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [text, setText] = useState("");
  const [exists, setExists] = useState(false);
  const [formId, setFormId] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(
      e.target.files[0] ? e.target.files[0].name : "No Resume/CV selected"
    );
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleAddUrl = () => {
    setUrls((prevUrls) => [...prevUrls, url]);
    setUrl("");
  };

  const handleDeleteUrl = (index) => {
    const list = [...urls];
    list.splice(index, 1);
    setUrls(list);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  //   const handleSubmit = async (e) => {
  //     const userInfo = {
  //       // Populate this with actual data
  //     };
  //     navigate("/profile", { state: { userInfo } });
  //   };

  let handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log("submitted", formData);
    e.preventDefault();
    const account = localStorage.getItem("token");
    let user = await axios.get("http://localhost:8000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${account}`,
      },
    });
    if (exists) {
      var data = JSON.stringify({
        links: urls,
        extraInfo: text,
      });
      var config = {
        method: "put",
        url: `http://localhost:8000/api/forms/${formId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account}`,
        },
        data: data,
      };
      await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          // formUploadHandler(account, response.data.data._id);
          // if (photo == null) {
          //   navigate("/Profile");
          // } else {
          singleFileUploadHandler(account, response.data.data._id);
          // }
          // navigate("/profile");
        })
        .catch(function (error) {
          console.log("put form error: ", error.message);
        });
    } else {
      var data = JSON.stringify({
        firstName: user.data.data.firstName,
        lastName: user.data.data.lastName,
        //   alternativeName: altNameList,
        // links: urls,
        //   resume: resume,
        //   photo: photo,
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
          formUploadHandler(account, response.data.data._id);
          // if (photo == null) {
          //   navigate("/Profile");
          // } else {
          //   singleFileUploadHandler(account, response.data.data._id);
          // }
          // navigate("/profile");
        })
        .catch(function (error) {
          console.log("post listing error: ", error.message);
        });
    }
  };

  const formUploadHandler = async (account, id) => {
    var data = JSON.stringify({
      links: urls,
      extraInfo: text,
    });
    var config = {
      method: "post",
      url: "http://localhost:8000/api/forms",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${account}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // formUploadHandler(account, response.data.data._id);
        // if (photo == null) {
        //   navigate("/Profile");
        // } else {
        singleFileUploadHandler(account, response.data.data._id);
        // }
        // navigate("/profile");
      })
      .catch(function (error) {
        console.log("post listing error: ", error.message);
      });
  };

  const singleFileUploadHandler = async (account, id) => {
    console.log("singleFileUploadHandler");
    const data = new FormData();

    // If file selected
    if (file) {
      data.append("itemImage", file, file.name);
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
          updateFormPhoto(account, id, response);
        })
        .catch(function (error) {
          console.log("post photo error: ", error.message);
        });
    }
  };

  const updateFormPhoto = async (account, id, file) => {
    console.log("updateFormPhoto");
    var data = JSON.stringify({
      resume: file.data.location,
    });
    var config = {
      method: "put",
      url: `http://localhost:8000/api/forms/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${account}`,
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log("put photo", response);
        navigate("/profile");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let defaultData = async () => {
      try {
        const account = localStorage.getItem("token");
        let user = await axios.get("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${account}`,
          },
        });

        const userData = await axios.get("http://localhost:8000/api/forms");
        const relatedForm = await userData.data.data.filter(
          (form) => form.user === user.data.data._id
        );
        if (relatedForm[0]) {
          console.log("exists: ", relatedForm[0]);
          setExists(true);
          setUrls(relatedForm[0].links);
          setText(relatedForm[0].extraInfo);
          setFormId(relatedForm[0]._id);
        }
        // setForm(relatedForm[0]._id);
      } catch (error) {
        console.log(error);
      }
    };

    defaultData();
  }, []);

  return (
    <>
      <div className="form-intro-1">
        <p>Time to generate your personalized profile!</p>
      </div>
      <div className="form-intro-2">
        <p>Upload your Resume/CV and any relevant URLs</p>
      </div>
      <Flex
        direction="column"
        align="center"
        justify="center"
        // height="100vh"
        // margin-top="20"
        padding="20"
      >
        <Flex direction="row" justify="center" align="center" width="100%">
          <Spacer />
          <Box
            width="xl"
            borderWidth="1px"
            borderRadius="15px"
            padding="40"
            backgroundColor="#fff"
          >
            <Input
              type="file"
              hidden
              id="file-upload"
              onChange={handleFileChange}
            />
            <Flex alignItems="center" marginBottom="20">
              <Button as="label" htmlFor="file-upload" className="add-button">
                Add Resume/CV
              </Button>
              <Text ml="10" mt="15">
                {fileName}
              </Text>
            </Flex>
            <Flex marginBottom="5">
              <Input
                type="text"
                placeholder="Enter URL..."
                value={url}
                onChange={handleUrlChange}
                className="URLInput"
              />
              <Button className="add-button" onClick={handleAddUrl}>
                Add URL
              </Button>
            </Flex>
            <List spacing={3} mt="15">
              {urls.map((url, index) => (
                <>
                  <ListItem key={index} className="list-item">
                    • {url}
                    <Button
                      className="delete-button"
                      onClick={() => handleDeleteUrl(index)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                </>
              ))}
            </List>
            <Flex>
              <Textarea
                className="textInput"
                placeholder="Enter additional info..."
                value={text}
                onChange={handleTextChange}
              />
            </Flex>
            <Flex justifyContent="center" marginTop="30">
              <Button className="generate-button" onClick={handleSubmit}>
                Generate Profile
              </Button>
            </Flex>
          </Box>
          <Spacer />
        </Flex>
      </Flex>
    </>
  );
}

export default Form;
