import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import Feed from "../components/social/Feed";
import AnonymousFeedback from "../components/social/AnonymousFeedback";
import TeachersConnect from "../components/social/TeachersConnect";
import Messaging from "../components/social/Messaging";
import Notifications from "../components/social/Notifications";
import FeedbackModal from "../components/social/FeedbackModal";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [hoveredFriend, setHoveredFriend] = useState(null);
  const [teachersExpanded, setTeachersExpanded] = useState(false);
  const [messagingExpanded, setMessagingExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    navigate("/search");
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <main
        className="d-flex flex-column flex-md-row"
        style={{ height: "calc(100vh - 60px)", overflow: "hidden" }}
      >
        {/* Left Sidebar */}
        <div
          className="sidebar bg-light p-3 d-none d-md-block"
          style={{
            flex: "1 1 25%",
            maxHeight: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search Bar */}
          <div
            onClick={handleSearchClick}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f1f1f1",
              borderRadius: "25px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              width: "100%",
              maxWidth: "500px",
              margin: "auto",
            }}
          >
            <FaSearch
              style={{
                color: "#555",
                marginRight: "0.5rem",
              }}
            />
            <span
              style={{
                color: "#555",
                flex: 1,
              }}
            >
              Search
            </span>
          </div>

          {/* Teachers Connect */}
          <div className="m-2">
            <h4>Teachers Connect</h4>
            <div
              className="teachers-connect"
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
                background: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                maxHeight: teachersExpanded ? "none" : "200px",
                overflowY: teachersExpanded ? "auto" : "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              {/* Teachers list */}
              <div className="search-bar mb-2">
                <input
                  type="text"
                  placeholder="Search Teachers..."
                  className="form-control"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div className="teacher-card mb-3 d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Teacher"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div>
                  <h5 className="mt-0 mb-1">Dr. John Doe</h5>
                  <p style={{ fontSize: "14px" }}>
                    Department of Computer Science
                  </p>
                </div>
              </div>
              <div className="teacher-card mb-3 d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Teacher"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div>
                  <h5 className="mt-0 mb-1">Dr. Jane Smith</h5>
                  <p style={{ fontSize: "14px" }}>Department of Mathematics</p>
                </div>
              </div>
              <div className="teacher-card mb-3 d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Teacher"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div>
                  <h5 className="mt-0 mb-1">Dr. Emily Johnson</h5>
                  <p style={{ fontSize: "14px" }}>Department of Physics</p>
                </div>
              </div>
              <div className="teacher-card mb-3 d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Teacher"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div>
                  <h5 className="mt-0 mb-1">Dr. Michael Brown</h5>
                  <p style={{ fontSize: "14px" }}>Department of Chemistry</p>
                </div>
              </div>
              {/* Additional teacher entries can be added similarly */}
              {teachersExpanded && (
                <>
                  <div className="teacher-card mb-3 d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Teacher"
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h5 className="mt-0 mb-1">Dr. Alan Walker</h5>
                      <p style={{ fontSize: "14px" }}>
                        Department of Economics
                      </p>
                    </div>
                  </div>
                  <div className="teacher-card mb-3 d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Teacher"
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h5 className="mt-0 mb-1">Dr. Olivia Brown</h5>
                      <p style={{ fontSize: "14px" }}>Department of History</p>
                    </div>
                  </div>
                  {/* Additional teachers can be added here */}
                </>
              )}
            </div>
            <button
              className="btn btn-primary mt-2"
              onClick={() => setTeachersExpanded(!teachersExpanded)}
              style={{ width: "100%" }}
            >
              {teachersExpanded ? "Show Less" : "Show More"}
            </button>
          </div>

          {/* Quick Links */}
          {/* <div
            className="mb-4"
            style={{ flex: "1 1 auto", overflow: "hidden" }}
          >
            <h2>Quick Links</h2>
            <ul
              className="list-group"
              style={{ overflowY: "auto", maxHeight: "200px" }}
            >
              <li className="list-group-item">
                <a href="#">Upcoming Events</a>
              </li>
              <li className="list-group-item">
                <a href="#">Training & Placement</a>
              </li>
              <li className="list-group-item">
                <a href="#">Student Resources</a>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Center Content (Feed) */}
        <div
          className="content flex-fill p-3"
          style={{
            flex: "1 1 50%",
            overflowY: "auto",
            maxHeight: "100%",
            scrollbarWidth: "none" /* Hide scrollbar for Firefox */,
            msOverflowStyle:
              "none" /* Hide scrollbar for Internet Explorer and Edge */,
          }}
        >
          <Notifications />
          <Feed />
          <AnonymousFeedback />
        </div>

        {/* Right Sidebar */}
        <div
          className="sidebar bg-light p-3 d-none d-md-block"
          style={{
            flex: "1 1 25%",
            maxHeight: "100%",
            overflowY: "auto",
            position: "sticky",
            top: "60px",
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid #ddd",
          }}
        >
          <div
            className="mb-4"
            style={{
              flex: "1 1 auto",
              overflowY: "auto",
              maxHeight: "200px",
            }}
          >
            <h2>Friends Online</h2>
            <ul className="list-unstyled">
              {[
                {
                  name: "Tony Stark",
                  imgSrc: "https://via.placeholder.com/50",
                  details: "Additional details about Tony Stark",
                },
                {
                  name: "Peter Parker",
                  imgSrc: "https://via.placeholder.com/50",
                  details: "Additional details about Peter Parker",
                },
                {
                  name: "Steve Rogers",
                  imgSrc: "https://via.placeholder.com/50",
                  details: "Additional details about Steve Rogers",
                },
                {
                  name: "Elizabeth Olsen",
                  imgSrc: "https://via.placeholder.com/50",
                  details: "Additional details about Elizabeth Olsen",
                },
              ].map((friend, index) => (
                <li
                  key={index}
                  className="friend-item mb-3"
                  style={{
                    position: "relative",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredFriend(index)}
                  onMouseLeave={() => setHoveredFriend(null)}
                >
                  <img
                    src={friend.imgSrc}
                    className="rounded-circle"
                    alt={friend.name}
                    style={{
                      marginRight: "10px",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <div className="friend-details">
                    <h5 className="mt-0 mb-1" style={{ fontSize: "14px" }}>
                      {friend.name}
                    </h5>
                    <p style={{ fontSize: "12px" }}>Online</p>
                  </div>
                  {hoveredFriend === index && (
                    <div
                      className="friend-hover-info"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        background: "#fff",
                        border: "1px solid #ddd",
                        padding: "10px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        zIndex: 10,
                        width: "200px",
                        maxWidth: "100%",
                        fontSize: "14px",
                      }}
                    >
                      <p>{friend.details}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Messaging */}
          <div>
            <h2>Messaging</h2>
            <div
              className="messaging"
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
                background: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                maxHeight: messagingExpanded ? "none" : "200px",
                overflowY: messagingExpanded ? "auto" : "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              {/* Messages list */}
              <div className="message-item mb-3 d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div>
                  <h5 className="mt-0 mb-1">Natasha Romanoff</h5>
                  <p style={{ fontSize: "14px" }}>
                    Have you seen the latest assignment details?
                  </p>
                </div>
              </div>
              <div className="message-item mb-3 d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div>
                  <h5 className="mt-0 mb-1">Bruce Banner</h5>
                  <p style={{ fontSize: "14px" }}>
                    Let's catch up later this week.
                  </p>
                </div>
              </div>
              <div className="message-item mb-3 d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div>
                  <h5 className="mt-0 mb-1">Tony Stark</h5>
                  <p style={{ fontSize: "14px" }}>
                    Don't forget to review the project specs.
                  </p>
                </div>
              </div>
              <div className="message-item mb-3 d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div>
                  <h5 className="mt-0 mb-1">Steve Rogers</h5>
                  <p style={{ fontSize: "14px" }}>
                    Can we reschedule our meeting?
                  </p>
                </div>
              </div>
              {/* Additional message entries can be added similarly */}
              {messagingExpanded && (
                <>
                  <div className="message-item mb-3 d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="User"
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h5 className="mt-0 mb-1">Wanda Maximoff</h5>
                      <p style={{ fontSize: "14px" }}>
                        Do you have the notes from last class?
                      </p>
                    </div>
                  </div>
                  <div className="message-item mb-3 d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="User"
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h5 className="mt-0 mb-1">Clint Barton</h5>
                      <p style={{ fontSize: "14px" }}>
                        Check out the new assignment guidelines.
                      </p>
                    </div>
                  </div>
                  {/* Additional messages can be added here */}
                </>
              )}
            </div>
            <button
              className="btn btn-primary mt-2"
              onClick={() => setMessagingExpanded(!messagingExpanded)}
              style={{ width: "100%" }}
            >
              {messagingExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </main>
      <FeedbackModal show={modalShow} handleClose={() => setModalShow(false)} />
    </div>
  );
};

export default HomePage;
