// import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

// Connect this to backend, loop through back end to get the list elements
// Figure out how to use useEffect before rendering

function Profile() {
  const [profile, setProfile] = useState([]);
  // const [profile = [], setProfile] = useState();
  // const profile = useRef(null);
  const navigate = useNavigate();
  const click = (e) => {
    navigate("/form");
  }

  // useEffect(() => {
  //   const fetchprofile = async () => {
  //     const { data } = await axios.get(
  //       "http://localhost:8000/api/profiles/647d0065250a2907b7dc6735"
  //     );
  //     console.log("data: ", data);
  //     setProfile(data.data);
  //   };
  //   fetchprofile();
  //   console.log(profile);
  //   // var data = JSON.stringify({
  //   //   name: name,
  //   //   description: description,
  //   //   seller: user.data.data._id,
  //   //   cost: cost,
  //   // });
  // });

  // const [id, setId] = useState();

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

        // useEffect(() => { setProfile(profile_to_set) }, [])
        setProfile(profile_to_set[0]);
        // setProfile(prevPostsData=> ([...prevPostsData, ...profile_to_set]));
        // profile.primaryName = profile_to_set.primaryName;
        // setProfile(

        // setProfile(
        // data.data.filter((prof) => prof.user === user.data.data._id)
        // );
        // );
        console.log("profile:", profile);
      } catch (error) {
        console.log(error);
      }
    };

    defaultData();
    console.log("profile 2: ", profile);
  }, []);

  console.log("profile yoyo: ", profile);
  if (profile) {
    const {
      primaryName,
      keywords,
      email,
      phone,
      education,
      institution,
      title,
      major,
      focusArea,
      honors,
      experiences,
      papers,
    } = profile;

    return (
      <div>
        <div className="container-profile">
          <img
            className="container-img"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile.jpg"
          />

          <div className="container-detail-1">
            <h1 className="profile-name">{primaryName}</h1>
            <h4>{email}</h4>
            <h4>{phone}</h4>
          </div>

          <div class="container-vertical-line"></div>
          
          <div className="container-detail-2">
            <h3>{institution}</h3>
            <h3>Title</h3>
            <ul>
              {title?.map((titl, index) => {
                return (
                  <li className="title" key={index}>
                    {titl}
                  </li>
                );
              })}
            </ul>
            <h3>{major}</h3>
            <h3>Focus Area</h3>
            <ul>
              {focusArea?.map((foc, index) => {
                return (
                  <li className="focusArea" key={index}>
                    {foc}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="d-flex">
          <div className="container-professional-detail">
            <div className="educations">
              <h1>Education</h1>
              <ul>
                {education?.map((edu, index) => {
                  return (
                    <li className="education" key={index}>
                      {edu}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="honors">
              <h1>Honors</h1>
              <ul>
                {honors?.map((hon, index) => {
                  return (
                    <li className="honor" key={index}>
                      {hon}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="experiences">
              <h1>Experience</h1>
              <ul>
                {experiences?.map((exp, index) => {
                  return (
                    <li className="experience" key={index}>
                      {exp}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="keywords">
              <h1>Key Words</h1>
              <ul>
                {keywords?.map((keyw, index) => {
                  return (
                    <li className="keyword" key={index}>
                      {keyw}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="container-papers">
            <h1>Published Papers</h1>
            <ul className="published-papers">
              {papers?.map((pap, index) => {
                return (
                  <li className="published-paper" key={index}>
                    {pap}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div >
    );
  } else {
    return (
      <div className="no-profile-container">
        <h1>A Profile Has Not Been Made</h1>
        <button className="go-to-form-button" onClick={click}>Make Your First Profile!</button>
      </div>
    );
  }

  // console.log("primary yoyo: ", primaryName);

  // return (
  //   <div>
  //     <div className="container-profile">
  //       <div className="container-img">
  //         <img
  //           src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  //           alt="profile.jpg"
  //         />
  //       </div>
  //       <div className="container-detail-1">
  //         <h1 className="profile-name">{primaryName}</h1>
  //         <h4>{email}</h4>
  //         <h4>{phone}</h4>
  //       </div>
  //       <hr width="1" size="300" />
  //       <div className="container-detail-2">
  //         <h3>{institution}</h3>
  //         <h3>{title}</h3>
  //         <h3>Computer science</h3>
  //         <h3>Artificial Intelligence, Data and Information Systems</h3>
  //       </div>
  //     </div>
  //     <div className="container-professional-detail">
  //       <div className="educations">
  //         <h1>Education</h1>
  //         <ul>
  //           {education?.map((edu, index) => {
  //             return (
  //               <li className="education" key={index}>
  //                 {edu}
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </div>
  //       <div className="honors">
  //         <h1>Honors</h1>
  //         <ul>
  //           {honors?.map((hon, index) => {
  //             return (
  //               <li className="honor" key={index}>
  //                 {hon}
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </div>
  //       <div className="experiences">
  //         <h1>Experience</h1>
  //         <ul>
  //           {experiences?.map((exp, index) => {
  //             return (
  //               <li className="experience" key={index}>
  //                 {exp}
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </div>
  //       <div className="keywords">
  //         <h1>Key Words</h1>
  //         <ul>
  //           <li className="keyword">
  //             {/* Ph.D. Electrial Engineering, Stanford University, 2001 */}
  //             {keywords}
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //     <div className="container-papers">
  //       <h1>Published Papers</h1>
  //       <ul className="published-papers">
  //         {papers?.map((pap, index) => {
  //           return (
  //             <li className="published-paper" key={index}>
  //               {pap}
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   </div>
  // );
}

export default Profile;

// import React from "react";

// function Profile() {
//   return (
//     <div>
//       <header>
//         <div className="container-profile">
//           <h2>hello</h2>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Profile;
