import React from "react";
import "../Styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { MdPermContactCalendar } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink exact to="/contacts" activeClassName="active">
            <div className="link-container">
              <MdPermContactCalendar className="icon" />
              <span>Contacts</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/charts" activeClassName="active">
            <div className="link-container">
              <BsGraphUpArrow className="icon" />
              <span>Charts</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
