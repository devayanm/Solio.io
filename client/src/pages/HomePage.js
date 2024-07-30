import React, { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/common/Navbar";
import FriendsOnline from "../components/social/FriendsOnline";

const Notifications = lazy(() => import("../components/social/Notifications"));
const Feed = lazy(() => import("../components/social/Feed"));
const AnonymousFeedback = lazy(() =>
  import("../components/social/AnonymousFeedback")
);
const TeachersConnect = lazy(() =>
  import("../components/social/TeachersConnect")
);
const Messaging = lazy(() => import("../components/social/Messaging"));

const HomePage = () => {
  const [teachersExpanded, setTeachersExpanded] = useState(false);
  const [messagingExpanded, setMessagingExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  const messages = [
    {
      name: "Natasha Romanoff",
      imgSrc: "https://via.placeholder.com/50",
      text: "Have you seen the latest assignment details?",
    },
    {
      name: "Bruce Banner",
      imgSrc: "https://via.placeholder.com/50",
      text: "Let's catch up later this week.",
    },
    {
      name: "Tony Stark",
      imgSrc: "https://via.placeholder.com/50",
      text: "Don't forget to review the project specs.",
    },
    {
      name: "Steve Rogers",
      imgSrc: "https://via.placeholder.com/50",
      text: "Can we reschedule our meeting?",
    },
    {
      name: "Wanda Maximoff",
      imgSrc: "https://via.placeholder.com/50",
      text: "Do you have the notes from last class?",
    },
    {
      name: "Clint Barton",
      imgSrc: "https://via.placeholder.com/50",
      text: "Check out the new assignment guidelines.",
    },
  ];

  return (
    <div className="container-fluid">
      <Navbar />
      <main
        className="d-flex flex-column flex-md-row mt-sm-4 mt-md-3 mt-lg-2"
        style={{ height: "calc(100vh - 60px)", overflow: "hidden" }}
      >
        {/* Left Sidebar */}
        <div
          className="sidebar bg-light p-3 d-none d-lg-flex flex-column"
          style={{
            flex: "1 1 25%",
            maxHeight: "100%",
            overflowY: "auto",
            borderRight: "1px solid #ddd",
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
              marginBottom: "1rem",
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
          <div style={{ marginBottom: "20px" }}>
            <h4>Teachers Connect</h4>
            <Suspense fallback={<div>Loading...</div>}>
              <TeachersConnect
                expanded={teachersExpanded}
                setExpanded={setTeachersExpanded}
              />
            </Suspense>
          </div>
        </div>

        {/* Center Content (Feed) */}
        <div
          className="content flex-fill p-3 mt-sm-5 mt-md-3 mt-lg-2"
          style={{
            flex: "1 1 50%",
            overflowY: "auto",
            maxHeight: "100%",
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Notifications />
            <Feed />
            <AnonymousFeedback />
          </Suspense>
        </div>

        {/* Right Sidebar */}
        <div
          className="sidebar bg-light p-3 d-none d-lg-flex flex-column"
          style={{
            flex: "1 1 25%",
            maxHeight: "100%",
            overflowY: "auto",
            borderLeft: "1px solid #ddd",
            position: "sticky",
            top: "60px",
          }}
        >
          {/* Friends Online */}
          <div style={{ marginBottom: "20px" }}>
            <FriendsOnline />
          </div>

          {/* Messaging */}
          <div>
            <h4>Messaging</h4>
            <Suspense fallback={<div>Loading...</div>}>
              <Messaging
                messages={messages}
                expanded={messagingExpanded}
                setExpanded={setMessagingExpanded}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
