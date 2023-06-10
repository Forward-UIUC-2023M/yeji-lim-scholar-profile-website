import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { NavItems } from "./NavItems";
import { SidebarItems } from "../Sidebar/SidebarItems";
import { Navigate, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  //   const [change, setChange] = useState(false);
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <nav className="NavbarItems">
        <Link to="#" className="side-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <Link to="/">
          <HiIcons.HiLightBulb className="navbar-logo"/>
        </Link>
        <ul className="navbar-menu">
          {NavItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
          {auth ? (
            <>
              <li>
                <Link className="nav-links" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="nav-links" onClick={logout} to={"/"}>
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="nav-links" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="nav-links" to="/login">
                  Log In
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

      {/* <nav className={sidebar ? "side-menu-active" : "side-menu"}>
        <ul className="side-menu-items" onClick={showSidebar}>
          <li className="side-toggle">
            <Link to="#" classnName="side-bars">
              <AiIcons.AiOutlineClose className="close" />
            </Link>
          </li>
          {SidebarItems.map((sideItem, sideIndex) => {
            return (
              <li key={sideIndex}>
                <a className={sideItem.cName} href={sideItem.url}>
                  {sideItem.icon}
                  <span>{sideItem.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav> */}
    </>
  );
}

export default Navbar;
