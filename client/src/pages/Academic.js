import React, { useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  Spinner,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  courses as mockCourses,
  departments as mockDepartments,
  years as mockYears,
  schedules as mockSchedules,
  grades as mockGrades,
} from "../mockdata";
import {
  IoHomeOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Academic = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    userId: "",
    course: "",
    department: "",
    year: "",
  });
  const [loginError, setLoginError] = useState("");
  const [grades, setGrades] = useState([]);
  const [selectedGradesYear, setSelectedGradesYear] = useState("");
  const [selectedGradesSemester, setSelectedGradesSemester] = useState("");
  const [selectedGradesType, setSelectedGradesType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Assuming loading state is for initial mock data fetch
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      userDetails.userId &&
      userDetails.course &&
      userDetails.department &&
      userDetails.year
    ) {
      setFormSubmitted(true);
      setLoginError("");
    } else {
      setLoginError("Please fill in all required fields.");
    }
  };

  const handleGradesSubmit = () => {
    const filteredGrades = mockGrades.find(
      (item) =>
        item.course === userDetails.course &&
        item.department === userDetails.department &&
        item.year === selectedGradesYear
    );
    setGrades(filteredGrades ? filteredGrades.data : []);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  const handleHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!formSubmitted) {
    return (
      <Container className="py-5">
        <div className="d-flex justify-content-between mb-4">
          <div>
            <Button
              variant="light"
              className="rounded-circle p-2 mr-2"
              onClick={handleBack}
            >
              <IoArrowBackOutline size={24} />
            </Button>
            <Button
              variant="light"
              onClick={handleForward}
              className="rounded-circle p-2 mr-2"
            >
              <IoArrowForwardOutline size={24} />
            </Button>
          </div>
          <div>
            <Button
              variant="light"
              onClick={handleHome}
              className="rounded-circle p-2 "
            >
              <IoHomeOutline size={24} />
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-sm p-4">
          <Card.Body>
            <div className="text-center mb-4">
              <h3 className="text-uppercase text-muted">Student Information</h3>
            </div>

            <Form onSubmit={handleFormSubmit} className="px-md-4">
              <Form.Group controlId="name" className="mb-3">
                <Form.Label className="fw-bold">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="rounded-3"
                  isInvalid={!userDetails.name && loginError}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="fw-bold">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  placeholder="example@example.com"
                  className="rounded-3"
                  isInvalid={!userDetails.email && loginError}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="userId" className="mb-3">
                <Form.Label className="fw-bold">User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  value={userDetails.userId}
                  onChange={handleInputChange}
                  placeholder="12345678"
                  className="rounded-3"
                  isInvalid={!userDetails.userId && loginError}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your User ID.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="course" className="mb-3">
                <Form.Label className="fw-bold">Course</Form.Label>
                <Form.Control
                  as="select"
                  name="course"
                  value={userDetails.course}
                  onChange={handleInputChange}
                  className="rounded-3"
                  isInvalid={!userDetails.course && loginError}
                >
                  <option value="">-- Select Course --</option>
                  {mockCourses.map((course) => (
                    <option key={course.id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a course.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="department" className="mb-3">
                <Form.Label className="fw-bold">Department</Form.Label>
                <Form.Control
                  as="select"
                  name="department"
                  value={userDetails.department}
                  onChange={handleInputChange}
                  className="rounded-3"
                  isInvalid={!userDetails.department && loginError}
                >
                  <option value="">-- Select Department --</option>
                  {mockDepartments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a department.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="year" className="mb-4">
                <Form.Label className="fw-bold">Year</Form.Label>
                <Form.Control
                  as="select"
                  name="year"
                  value={userDetails.year}
                  onChange={handleInputChange}
                  className="rounded-3"
                  isInvalid={!userDetails.year && loginError}
                >
                  <option value="">-- Select Year --</option>
                  {mockYears.map((year) => (
                    <option key={year.id} value={year.name}>
                      {year.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a year.
                </Form.Control.Feedback>
              </Form.Group>

              {loginError && (
                <Alert
                  variant="danger"
                  className="d-flex align-items-center mb-4"
                >
                  <FaExclamationTriangle className="me-2" />
                  {loginError}
                </Alert>
              )}

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fs-5 rounded-pill shadow-sm hover-shadow"
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const filteredSchedule = mockSchedules.find(
    (item) =>
      item.course === userDetails.course &&
      item.department === userDetails.department &&
      item.year === userDetails.year
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-start mb-4">
        <Button
          variant="outline-secondary"
          onClick={handleBack}
          className="mr-2"
        >
          <IoArrowBackOutline /> Back
        </Button>
        <Button
          variant="outline-secondary"
          onClick={handleForward}
          className="mr-2"
        >
          <IoArrowForwardOutline /> Forward
        </Button>
        <Button variant="outline-secondary" onClick={handleHome}>
          <IoHomeOutline /> Home
        </Button>
      </div>

      <h2 className="text-center mb-4">Academic Dashboard</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm rounded">
            <Card.Header className="bg-primary text-white">
              Schedule & Course Details
            </Card.Header>
            <ListGroup variant="flush">
              {filteredSchedule ? (
                filteredSchedule.data.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <div>
                      <strong>{item.day}</strong>: {item.subject}
                    </div>
                    <div>Time: {item.time}</div>
                    <div>Teacher: {item.teacher}</div>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No schedule available.</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm rounded">
            <Card.Header className="bg-success text-white">
              Academic Resources
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <ul>
                  <li>
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      Library Resources
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      Lecture Notes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      Online Tutorials
                    </a>
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm rounded">
            <Card.Header className="bg-info text-white">
              Grades Overview
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="gradesYear">
                  <Form.Label>Select Year</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedGradesYear}
                    onChange={(e) => setSelectedGradesYear(e.target.value)}
                  >
                    <option value="">-- Select Year --</option>
                    {mockYears.map((year) => (
                      <option key={year.id} value={year.name}>
                        {year.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="gradesSemester">
                  <Form.Label>Select Semester</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedGradesSemester}
                    onChange={(e) => setSelectedGradesSemester(e.target.value)}
                  >
                    <option value="">-- Select Semester --</option>
                    <option value="1st">1st Semester</option>
                    <option value="2nd">2nd Semester</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="gradesType">
                  <Form.Label>Select Grade Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedGradesType}
                    onChange={(e) => setSelectedGradesType(e.target.value)}
                  >
                    <option value="">-- Select Type --</option>
                    <option value="internal">Internal</option>
                    <option value="external">External</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleGradesSubmit}
                  className="mt-3"
                >
                  View Grades
                </Button>
              </Form>
              {grades.length > 0 && (
                <div className="mt-3">
                  <h5>Grades</h5>
                  <ul>
                    {grades.map((grade, index) => (
                      <li key={index}>
                        {grade.subject}: {grade.grade}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm rounded">
            <Card.Header className="bg-info text-white">
              Additional Academic Information
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      <strong>University Fest Details</strong>
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      <strong>Study Notes and Guides</strong>
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      <strong>Departmental Announcements</strong>
                    </a>
                  </li>
                  {/* Add more links or sections as needed */}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Academic;
