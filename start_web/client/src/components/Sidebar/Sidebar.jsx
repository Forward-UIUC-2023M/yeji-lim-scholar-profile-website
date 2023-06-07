import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { SidebarItems } from "./SidebarItems";
import "./Sidebar.css";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <nav className={sidebar ? "side-menu-active" : "side-menu"}>
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
    </nav>
  );
}

export default Sidebar;
