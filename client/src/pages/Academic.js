import React, { useState, useEffect } from "react";
import { Card, ListGroup, Table, Spinner } from "react-bootstrap";

const Academic = () => {
  const [courses, setCourses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching data
    setTimeout(() => {
      setCourses([
        { id: 1, name: "Data Structures", code: "CS201" },
        { id: 2, name: "Operating Systems", code: "CS301" },
        { id: 3, name: "Database Systems", code: "CS401" },
      ]);

      setSchedule([
        {
          day: "Monday",
          course: "Data Structures",
          time: "9:00 AM - 11:00 AM",
        },
        {
          day: "Wednesday",
          course: "Operating Systems",
          time: "10:00 AM - 12:00 PM",
        },
        {
          day: "Friday",
          course: "Database Systems",
          time: "1:00 PM - 3:00 PM",
        },
      ]);

      setGrades([
        { course: "Data Structures", grade: "A" },
        { course: "Operating Systems", grade: "B+" },
        { course: "Database Systems", grade: "A-" },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Academic Dashboard</h2>

      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <Card>
            <Card.Header>Courses</Card.Header>
            <ListGroup variant="flush">
              {courses.map((course) => (
                <ListGroup.Item key={course.id}>
                  {course.name} ({course.code})
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <Card>
            <Card.Header>Schedule</Card.Header>
            <ListGroup variant="flush">
              {schedule.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item.day}: {item.course} ({item.time})
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>

        <div className="col-lg-4 col-md-12 mb-4">
          <Card>
            <Card.Header>Grades Overview</Card.Header>
            <ListGroup variant="flush">
              {grades.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item.course}: {item.grade}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-4">
          <Card>
            <Card.Header>Academic Resources</Card.Header>
            <Card.Body>
              <Card.Text>
                <ul>
                  <li>
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Library Resources
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lecture Notes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Online Tutorials
                    </a>
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Academic;
