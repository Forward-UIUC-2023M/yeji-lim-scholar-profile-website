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
import { AiOutlineStar, AiFillStar, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "./Search.css";

function Search() {
  const MAX_LENGTH = 4; // maximum number of links or keywords displayed
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [filterBoxshown, setFilterBoxshown] = useState(false);
  const [filterKeywords, setFilterKeywords] = useState([]);
  const [initialProfiles, setInitialProfiles] = useState([]);


  const handleSubscribe = async (profileId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Prompt the user to log in.
        alert('Please log in to favorite profiles.');
        return;
      }
  
      const response = await axios.post(
        `http://localhost:8000/api/profiles/${profileId}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
  
      // Toggle the favorited status of the profile in state
      setProfiles(
        profiles.map((profile) =>
          profile._id === profileId
            ? { ...profile, favorited: !profile.favorited }
            : profile
        )
      );
    } catch (error) {
      console.log(error);
    }
  };  

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchPerformed(true);
    try {
      const profilesResponse = await axios.get(
        `http://localhost:8000/api/profiles/search?q=${searchTerm}`
      );
  
      let favoritedProfileIds = new Set();
      const token = localStorage.getItem("token");
      if (token) {
        const favoritesResponse = await axios.get(
          "http://localhost:8000/api/profiles/favorited",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        favoritedProfileIds = new Set(
          favoritesResponse.data.data.map((id) => id.toString())
        );
      }
  
      setProfiles(
        profilesResponse.data.data.map((profile) => ({
          ...profile,
          favorited: favoritedProfileIds.has(profile._id),
        }))
      );
      setInitialProfiles(
        profilesResponse.data.data.map((profile) => ({
          ...profile,
          favorited: favoritedProfileIds.has(profile._id),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };  

  // control when filter box is shown
  const handleShowFilterBox = () => {
    setFilterBoxshown(!filterBoxshown);
  };

  // apply the filtered keywords to the search results
  const handleApplyFilters = () => {
    setProfiles(
      initialProfiles.filter(profile => 
        filterKeywords.every(filterKeyword =>
          profile.keywords.map(kw => kw.toLowerCase()).includes(filterKeyword.toLowerCase())
        )
      )
    );
  };

  const handleAddFilter = () => {
    setFilterKeywords([...filterKeywords, filterTerm]);
    setFilterTerm('');
  };
  
  const handleRemoveFilter = (index) => {
    const newFilterKeywords = [...filterKeywords];
    newFilterKeywords.splice(index, 1);
    setFilterKeywords(newFilterKeywords);
  };

  

  return (
    <div>
      <Container
        className={
          searchPerformed
            ? "mt-5 search-container after-search"
            : "mt-5 search-container"
        }
      >
        <Row>
          <Col>
            <Form className="d-flex">
              <InputGroup.Text className="bg-white search-icon">
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 search-bar"
                style={{ width: "50vw" }}
                aria-label="Search"
                maxLength={80}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Button type="submit" onClick={handleSearch}>
                Search
              </Button>
              <Button
                variant={filterBoxshown ? "danger" : "success"}
                className="ms-2"
                onClick={handleShowFilterBox}
              >
                Filter
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <ListGroup
        className={
          searchPerformed
            ? "align-items-center after-search"
            : "align-items-center"
        }
      >
        {/* searching results */}
        <div className="d-flex">
          <div>
            {profiles.map((profile, profile_index) => (
              <ListGroup.Item
                key={profile_index}
                className={
                  filterBoxshown
                    ? "rounded search-listGroup-item-filter"
                    : "rounded search-listGroup-item"
                }
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <div className="d-flex">
                      <h6 className="mt-3" style={{ fontWeight: "bold" }}>
                        {profile.firstName + " " + profile.lastName + ","}&nbsp;
                      </h6>

                      <h6 className="mt-3" style={{ fontWeight: "bold" }}>
                        {profile.institution}
                      </h6>
                    </div>

                    <div className="d-flex">
                      <h6 className="text-warning">Keywords:&nbsp;</h6>

                      {/* display only first 5 keywords */}
                      {profile.keywords
                        .slice(0, MAX_LENGTH)
                        .map((keyword, keyword_index) => {
                          if (
                            keyword_index ===
                            Math.min(
                              profile.keywords.length - 1,
                              MAX_LENGTH - 1
                            )
                          ) {
                            return <h6 key={keyword_index}>{keyword}</h6>;
                          } else {
                            return (
                              <h6 key={keyword_index}>{keyword + ","}&nbsp;</h6>
                            );
                          }
                        })}
                      {profile.keywords.length > MAX_LENGTH && <h6>...</h6>}
                    </div>

                    <div className="d-flex">
                      <h6 className="text-warning">Publications:&nbsp;</h6>

                      {/* display only first 5 links */}
                      {profile.papers
                        .slice(0, MAX_LENGTH)
                        .map((paper, paper_index) => {
                          if (
                            paper_index ===
                            Math.min(profile.papers.length - 1, MAX_LENGTH - 1)
                          ) {
                            return <h6 key={paper_index}>{paper}</h6>;
                          } else {
                            return (
                              <h6 key={paper_index}>{paper + ","}&nbsp;</h6>
                            );
                          }
                        })}
                      {profile.papers.length > MAX_LENGTH && <h6>...</h6>}
                    </div>
                  </div>

                  {profile.favorited ? (
                    <div className="align-self-center">
                      <AiFillStar
                        size={25}
                        color="orange"
                        onClick={() => handleSubscribe(profile._id)}
                      />
                    </div>
                  ) : (
                    <div className="align-self-center">
                      <AiOutlineStar
                        size={25}
                        onClick={() => handleSubscribe(profile._id)}
                      />
                    </div>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </div>

          {/* filter box */}
          <div className="ms-5">
            {filterBoxshown ? (
              <ListGroup.Item className="rounded mt-5 filter-container">
                <div className="d-flex flex-column">
                  <h5 className="mt-2">Filter by Keyword</h5>
                  <div className="d-flex mt-2">
                    <Form.Control
                      type="search"
                      placeholder="Search Keywords..."
                      className="me-2 filter-bar"
                      aria-label="Filter"
                      maxLength={80}
                      onChange={(event) => setFilterTerm(event.target.value)}
                    />
                    <Button variant="dark" onClick={handleAddFilter}> Add </Button>
                    <Button
                      variant="dark"
                      className="ms-2"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={handleApplyFilters}
                    >
                      Apply Filters
                    </Button>
                  </div>
                  <div className="d-flex flex-wrap mt-3 mb-2">
                    {/* {filterKeywords.map((keyword, i) => 
                      <Button className="me-2 mb-2" key={i}> {keyword} </Button>
                    )} */}
                    {filterKeywords.map((keyword, i) => (
                        <Button className="me-2 mb-2" key={i}>
                            {keyword}
                            <AiOutlineClose 
                                size={20}
                                style={{ marginLeft: "10px", cursor: "pointer" }} 
                                onClick={() => handleRemoveFilter(i)} 
                            />
                        </Button>
                    ))}

                  </div>

                  {/* <div className="d-flex flex-wrap mt-3 mb-2">
                    <Button className="me-2 mb-2"> Data Science </Button>
                    <Button className="me-2 mb-2"> Neural Networks </Button>
                    <Button className="me-2 mb-2"> Machine Learning </Button>
                    <Button className="me-2 mb-2"> Keyword Extraction </Button>
                    <Button className="me-2 mb-2"> Data Science </Button>
                  </div> */}
                </div>
              </ListGroup.Item>
            ) : (
              <></>
            )}
          </div>
        </div>
      </ListGroup>
    </div>
  );
}

export default Search;
