import React from "react";

const TeachersConnect = ({ expanded, setExpanded }) => {
  const teachers = [
    {
      name: "Dr. John Doe",
      department: "Computer Science",
      imgSrc: "https://via.placeholder.com/50",
    },
    {
      name: "Dr. Jane Smith",
      department: "Mathematics",
      imgSrc: "https://via.placeholder.com/50",
    },
    {
      name: "Dr. Emily Johnson",
      department: "Physics",
      imgSrc: "https://via.placeholder.com/50",
    },
    {
      name: "Dr. Michael Brown",
      department: "Chemistry",
      imgSrc: "https://via.placeholder.com/50",
    },
    {
      name: "Dr. Alan Walker",
      department: "Economics",
      imgSrc: "https://via.placeholder.com/50",
    },
    {
      name: "Dr. Olivia Brown",
      department: "History",
      imgSrc: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div>
      <div
        className="teachers-connect"
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxHeight: expanded ? "350px" : "250px",
          overflowY: expanded ? "auto" : "hidden",
          transition: "max-height 0.3s ease-out",
        }}
      >
        <div className="search-bar mb-2">
          <input
            type="text"
            placeholder="Search Teachers..."
            className="form-control"
            style={{ borderRadius: "4px" }}
          />
        </div>
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className="teacher-card mb-3 d-flex align-items-center"
          >
            <img
              src={teacher.imgSrc}
              alt="Teacher"
              className="rounded-circle"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <div>
              <h5 className="mb-1">{teacher.name}</h5>
              <p className="text-muted">{teacher.department}</p>
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

export default TeachersConnect;
