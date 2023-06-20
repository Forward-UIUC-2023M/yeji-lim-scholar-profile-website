import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import axios from "axios";
import "./Favorite.css";

function Favorite() {
  const MAX_LENGTH = 5; // maximum number of links or keywords displayed
  const [favoriteProfiles, setFavoriteProfiles] = useState([]); // list of favorite profiles
  const [profileFavoritedList, setProfileFavoritedList] = useState([]); // list of bools that determines whether the given profile is favorited

  const handleSubscribe = async (profileId, index) => {
    try {
      const token = localStorage.getItem("token");
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
      setProfileFavoritedList((prev) => ({
        ...prev,
        [index]: !profileFavoritedList[index],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const favoritesResponse = await axios.get(
        "http://localhost:8000/api/profiles/favorited",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const favoritedProfileIds = new Set(
        favoritesResponse.data.data.map((id) => id.toString())
      );

      const favoriteProfileList = await Promise.all(
        Array.from(favoritedProfileIds).map(async (favoritedProfileId) => {
          const favoriteProfile = await axios.get(
            `http://localhost:8000/api/profiles/${favoritedProfileId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return favoriteProfile.data.data;
        })
      );

      setFavoriteProfiles(favoriteProfileList);
      setProfileFavoritedList(
        favoriteProfileList.map((_, index) => ({ [index]: true }))
      ); // set initial favorite list to all trues since it's the favorite page
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFavoriteProfiles([]);
    handleShowFavorites();
    favoriteProfiles.map((favoriteProfile, index) =>
      console.log(favoriteProfile)
    );
  }, []);

  return (
    <div className="favorite-page-container">
      <ListGroup className="mt-5 align-items-center">
        {favoriteProfiles.map((profile, index) => (
          <ListGroup.Item
            key={index}
            className="rounded mb-4 favorite-listGroup-item round-circle"
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <h5 className="mt-2" style={{ fontWeight: "bold" }}>
                  {profile.firstName && profile.lastName
                    ? profile.firstName +
                      " " +
                      profile.lastName +
                      ", " +
                      profile.institution
                    : profile.primaryName + ", " + profile.institution}
                  &nbsp;
                </h5>

                {/* <div className="d-flex">
                  <h6 className="mt-3" style={{ fontWeight: "bold" }}>
                    {profile.firstName + " " + profile.lastName + ","}&nbsp;
                  </h6>

                  <h6 className="mt-3" style={{ fontWeight: "bold" }}>
                    {profile.institution}
                  </h6>
                </div> */}

                <div className="d-flex">
                  <h6 className="text-warning">Links:&nbsp;</h6>

                  {/* display only first 5 links */}
                  {profile.links
                    .slice(0, MAX_LENGTH)
                    .map((link, link_index) => {
                      if (
                        link_index ===
                        Math.min(profile.links.length - 1, MAX_LENGTH - 1)
                      ) {
                        return <h6 key={link_index}>{link}</h6>;
                      } else {
                        return <h6 key={link_index}>{link + ","}&nbsp;</h6>;
                      }
                    })}
                  {profile.links.length > MAX_LENGTH && <h6>...</h6>}
                </div>

                <div className="d-flex">
                  <h6 className="text-warning">Keywords:&nbsp;</h6>

                  {/* display only first 5 keywords */}
                  {profile.keywords
                    .slice(0, MAX_LENGTH)
                    .map((keyword, keyword_index) => {
                      if (
                        keyword_index ===
                        Math.min(profile.keywords.length - 1, MAX_LENGTH - 1)
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
              </div>

              {profileFavoritedList[index] ? (
                <div className="align-self-center">
                  <AiFillStar
                    size={25}
                    color="orange"
                    onClick={() => handleSubscribe(profile._id, index)}
                  />
                </div>
              ) : (
                <div className="align-self-center">
                  <AiOutlineStar
                    size={25}
                    onClick={() => handleSubscribe(profile._id, index)}
                  />
                </div>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Favorite;
