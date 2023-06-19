import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavItems } from "./NavItems";
import { SidebarItems } from "../Sidebar/SidebarItems";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import Landing from "../Landing/Landing";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");
  const [sidebar, setSidebar] = useState(false);
  const [shouldDropdown, setShouldDropdown] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const logout = () => {
    localStorage.clear();
    navigate("/", { state: { loggedOut: true } });
    // navigate("/");
  };

  const handleSwitchDropDown = (state) => {
    setShouldDropdown(state);
  };

  // delete the user profile by passing the variable to Profile.jsx
  const handleDeleteProfile = () => {
    navigate("/profile", { state: { shouldDelete: true } });
  };

  return (
    <>
      <nav className="NavbarItems">
        {/* <Link to="#" className="side-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link> */}
        <Link to="/" className="navbar-logo">
          ForwardData
        </Link>
        <ul className="navbar-menu">
          {auth ? (
            <>
              <li>
                {shouldDropdown ? (
                  <NavDropdown title="Profile" className="nav-links">
                    <NavDropdown.Item href="/form">
                      Resubmit Form
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="#"
                      onClick={() => {
                        handleDeleteProfile();
                      }}
                    >
                      Delete Profile
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Link
                    className="nav-links"
                    to="/profile"
                    onClick={() => handleSwitchDropDown(true)}
                  >
                    Profile
                  </Link>
                )}
              </li>
              <li>
                <Link
                  className="nav-links"
                  to="/search"
                  onClick={() => handleSwitchDropDown(false)}
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  className="nav-links"
                  to="/"
                  onClick={() => handleSwitchDropDown(false)}
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  className="nav-links"
                  to="/favorite"
                  onClick={() => handleSwitchDropDown(false)}
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  className="nav-links"
                  to={"/"}
                  onClick={() => {
                    logout();
                    handleSwitchDropDown(true);
                  }}
                >
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="nav-links"
                  to="/search"
                  onClick={() => handleSwitchDropDown(false)}
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  className="nav-links"
                  to="/register"
                  onClick={() => handleSwitchDropDown(false)}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  className="nav-links"
                  to="/login"
                  onClick={() => handleSwitchDropDown(false)}
                >
                  Log In
                  {/* <Landing landing={true}/> */}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {/* <div className="sidebar">
        <Link to="#" className="side-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div> */}
    </>
  );
}

export default Navbar;
