import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";

const FriendsOnline = () => {
  const [hoveredFriend, setHoveredFriend] = useState(null);

  const friendsOnline = [
    {
      name: "Tony Stark",
      imgSrc: "https://via.placeholder.com/50",
      details: "Genius, Billionaire, Playboy, Philanthropist.",
    },
    {
      name: "Peter Parker",
      imgSrc: "https://via.placeholder.com/50",
      details: "Friendly neighborhood Spider-Man.",
    },
    // {
    //   name: "Steve Rogers",
    //   imgSrc: "https://via.placeholder.com/50",
    //   details: "The first Avenger, Captain America.",
    // },
    {
      name: "Elizabeth Olsen",
      imgSrc: "https://via.placeholder.com/50",
      details: "Scarlet Witch with reality-warping powers.",
    },
  ];

  return (
    <div style={{ flex: "1 1 auto", overflowY: "auto", padding: "15px" }}>
      <h4 style={{ marginBottom: "15px" }}>Friends Online</h4>
      <div
        className="friends-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
          gap: "5px",
        }}
      >
        {friendsOnline.map((friend, index) => (
          <div
            key={index}
            className="friend-item"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
              padding: "10px",
              borderRadius: "8px",
              transition: "background-color 0.2s",
              backgroundColor:
                hoveredFriend === index ? "#f5f5f5" : "transparent",
              boxShadow:
                hoveredFriend === index
                  ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                  : "none",
              textAlign: "center",
            }}
            onMouseEnter={() => setHoveredFriend(index)}
            onMouseLeave={() => setHoveredFriend(null)}
          >
            <div
              style={{
                position: "relative",
                marginBottom: "10px",
              }}
            >
              <img
                src={friend.imgSrc}
                className="rounded-circle"
                alt={friend.name}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
              <FaCircle
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  color: "green",
                  fontSize: "10px",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>{friend.name}</span>
            </div>
            {hoveredFriend === index && (
              <div
                className="friend-hover-info"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translate(-50%, -10px)",
                  background: "#fff",
                  border: "1px solid #ddd",
                  padding: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  zIndex: 10,
                  width: "200px",
                  maxWidth: "100%",
                  fontSize: "14px",
                  borderRadius: "8px",
                  marginTop: "5px",
                }}
              >
                <p style={{ margin: 0 }}>{friend.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsOnline;
