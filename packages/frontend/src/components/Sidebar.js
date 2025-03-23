//import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // State to track the collapse of each section
  // const [isNavOpen, setIsNavOpen] = useState({
  //   profile: false,
  //   settings: false,
  //   messages: false,
  // });

  // const handleToggle = (section) => {
  //   setIsNavOpen((prevState) => ({
  //     ...prevState,
  //     [section]: !prevState[section],
  //   }));
  // };

  return (
    <div
      className="col-md-3 bg-light p-4"
      style={{ height: "calc(100vh - 200px)", overflowY: "auto" }}
    >
      <h4>Navigation</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/image" className="nav-link">
            Image Detection
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/face-detection" className="nav-link">
            Face Detection
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/generate-text" className="nav-link">
            Ved ChitChat
          </Link>
        </li>

        {/* Messages Section */}
        {/* <li className="nav-item">
          <button
            className="nav-link btn btn-link d-flex justify-content-between"
            onClick={() => handleToggle("messages")}
            aria-expanded={isNavOpen.messages ? "true" : "false"}
          >
            Messages
            <span
              className={`ml-2 ${
                isNavOpen.messages ? "fa fa-angle-up" : "fa fa-angle-down"
              }`}
            />
          </button>
          <div className={`collapse ${isNavOpen.messages ? "show" : ""}`}>
            <ul className="nav flex-column ml-3">
              <li className="nav-item">
                <Link to="/messages/inbox" className="nav-link">
                  Inbox
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/messages/sent" className="nav-link">
                  Sent
                </Link>
              </li>
            </ul>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
