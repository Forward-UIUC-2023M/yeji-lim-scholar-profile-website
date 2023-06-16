// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   InputGroup,
//   ListGroup,
//   Form,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { BsSearch } from "react-icons/bs";
// import { AiOutlineStar, AiFillStar } from "react-icons/ai";
// import "./Search.css";

// function Search() {
//   const [profiles, setProfiles] = useState([]);
//   // TODO: should fetch subscribed from the backend
//   const [subscribed, setSubscribed] = useState(false);

//   const b1 = {
//     firstName: "Edison",
//     lastName: "Yin",
//     institution: "UIUC",
//     links: ["google.com", "apple.com", "yahoo.com"],
//     keywords: ["Computer Science", "Frontend Developer"],
//   };
//   const b2 = {
//     firstName: "Amy",
//     lastName: "Lay",
//     institution: "UIUC",
//     links: ["google.com", "apple.com", "yahoo.com"],
//     keywords: ["Computer Science", "Frontend Developer"],
//   };
//   const b3 = {
//     firstName: "John",
//     lastName: "Musk",
//     institution: "UIUC",
//     links: ["google.com", "apple.com", "yahoo.com"],
//     keywords: ["Computer Science", "Frontend Developer"],
//   };

//   // handle subscription of profiles
//   const handleSubscribe = () => {
//     setSubscribed(!subscribed);
//   };

//   useEffect(() => {
//     setProfiles([b1, b2, b3]);
//   }, []);

import React, { useState } from "react";
import {
  Button,
  InputGroup,
  ListGroup,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import axios from "axios"; 
import "./Search.css";

function Search() {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/api/profiles/search?q=${searchTerm}`);
      console.log(response.data);
      setProfiles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }; 

  return (
    <div>
      <Container className="mt-5 search-container">
        <Row>
          <Col>
            <Form className="d-flex">
              <InputGroup.Text className="bg-white">
                <BsSearch></BsSearch>
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                style={{ width: "50vw" }}
                aria-label="Search"
                maxLength={80}
                onChange={event => setSearchTerm(event.target.value)}
              />
              <Button type="submit" onClick={handleSearch}>Search</Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <ListGroup
        className="align-items-center round-circle"
        style={{ borderRadius: "30%" }}
      >
        {profiles.map((profile, profile_index) => (
          <ListGroup.Item
            key={profile_index}
            className="rounded mb-5 search-listGroup-item round-circle"
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <h5 className="mt-3">Profile #{profile_index + 1}</h5>

                <div className="d-flex">
                  <h6 className="mt-3" style={{ fontWeight: "bold" }}>
                    {profile.firstName + " " + profile.lastName + ","}&nbsp;
                  </h6>

                  <h6 className="mt-3" style={{ fontWeight: "bold" }}>
                    {profile.institution}
                  </h6>
                </div>

                <div className="d-flex">
                  <h6 className="text-warning">Links:&nbsp;</h6>

                  {profile.links.map((link, link_index) => {
                    if (link_index === profile.links.length - 1) {
                      return <h6 key={link_index}>{link}</h6>;
                    } else {
                      return <h6 key={link_index}>{link + ","}&nbsp;</h6>;
                    }
                  })}
                </div>

                <div className="d-flex">
                  <h6 className="text-warning">Keywords:&nbsp;</h6>

                  {profile.keywords.map((keyword, keyword_index) => {
                    if (keyword_index === profile.keywords.length - 1) {
                      return <h6 key={keyword_index}>{keyword}</h6>;
                    } else {
                      return <h6 key={keyword_index}>{keyword + ","}&nbsp;</h6>;
                    }
                  })}
                </div>
              </div>

              {subscribed ? (
                <div className="align-self-center">
                  <AiFillStar
                    color="orange"
                    className="starr"
                    onClick={handleSubscribe}
                  />
                </div>
              ) : (
                <div className="align-self-center">
                  <AiOutlineStar className="starr" onClick={handleSubscribe} />
                </div>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Search;
