import React from "react";

const Messaging = ({ messages, expanded, setExpanded }) => {
  return (
    <div>
      <div
        className="messaging"
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxHeight: expanded ? "300px" : "200px",
          overflowY: expanded ? "auto" : "hidden",
          transition: "max-height 0.3s ease-out",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="message-card mb-3 d-flex align-items-center"
          >
            <img
              src={message.imgSrc}
              alt="User"
              className="rounded-circle"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <div>
              <h5 className="mb-1">{message.name}</h5>
              <p className="text-muted">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-link" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default Messaging;
