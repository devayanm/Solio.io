import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
  ListGroup,
  ProgressBar,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  logoutUser,
} from "../../services/api";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaAward,
  FaBook,
} from "react-icons/fa";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("social");
  const [editing, setEditing] = useState(false);
  const [updatedFullName, setUpdatedFullName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedCity, setUpdatedCity] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [updatedCourse, setUpdatedCourse] = useState("");
  const [updatedDepartment, setUpdatedDepartment] = useState("");
  const [updatedYear, setUpdatedYear] = useState("");
  const [updatedGpa, setUpdatedGpa] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("No token found, please log in again.");
          return;
        }

        const response = await getCurrentUser();

        if (response.data) {
          setProfile(response.data);
          setUpdatedFullName(response.data.fullName);
          setUpdatedEmail(response.data.email);
          setUpdatedPhone(response.data.contactInfo?.phone);
          setUpdatedCity(response.data.contactInfo?.address?.city);
          setUpdatedBio(response.data.bio);
          setUpdatedCourse(response.data.course);
          setUpdatedDepartment(response.data.department);
          setUpdatedYear(response.data.year);
          setUpdatedGpa(response.data.gpa);
        } else {
          setError("Failed to load profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile. Please try again later.");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProfile = {
        fullName: updatedFullName,
        email: updatedEmail,
        contactInfo: {
          phone: updatedPhone,
          address: { city: updatedCity },
        },
        bio: updatedBio,
        course: updatedCourse,
        department: updatedDepartment,
        year: updatedYear,
        gpa: updatedGpa,
      };

      const response = await updateAccountDetails(updatedProfile);

      // Assuming response.data contains the updated user data
      if (response.data) {
        setProfile(response.data); // Update the profile state
        setEditing(false); // Exit editing mode
        setError(""); // Clear any existing error
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again later.");
    }
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    try {
      if (!avatarFile) {
        setError("No file selected for avatar.");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await updateUserAvatar(formData);
      if (response.data) {
        setProfile(response.data);
        setError("");
      } else {
        setError("Failed to update avatar.");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      setError("Failed to update avatar. Please try again later.");
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  const renderSocialSection = () => (
    <Row>
      <Col md={4} className="text-center mb-4 mb-md-0">
        <Image
          src={profile.avatar}
          roundedCircle
          fluid
          alt="Profile Picture"
          className="mb-3"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        {editing ? (
          <div>
            <Form.Group>
              <Form.Label>Change Avatar</Form.Label>
              <Form.Control type="file" onChange={handleAvatarChange} />
            </Form.Group>
            <Button
              variant="primary"
              className="mt-2 mb-2"
              onClick={handleAvatarUpload}
            >
              Upload Avatar
            </Button>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedFullName}
                onChange={(e) => setUpdatedFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={updatedCity}
                onChange={(e) => setUpdatedCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                value={updatedBio}
                onChange={(e) => setUpdatedBio(e.target.value)}
              />
            </Form.Group>
          </div>
        ) : (
          <div>
            <h3 className="mb-0">{profile.fullName}</h3>
            <p className="text-muted mb-1">
              <FaEnvelope /> {profile.email}
            </p>
            <p className="text-muted mb-1">
              <FaPhone /> {profile.contactInfo?.phone}
            </p>
            <p className="text-muted mb-1">
              <FaMapMarkerAlt /> {profile.contactInfo?.address?.city}
            </p>
            <p className="mt-3">{profile.bio}</p>
          </div>
        )}
        <Button variant="danger" className="mb-2" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="primary" className="mb-2" onClick={handleEditToggle}>
          <FaEdit /> {editing ? "Cancel" : "Edit Profile"}
        </Button>
        {editing && (
          <Button
            variant="success"
            className="mt-2"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        )}
      </Col>
      <Col md={8}>
        <div className="d-flex justify-content-around mb-3">
          <div className="text-center">
            <strong>{profile.postsNumber}</strong>
            <p>Posts</p>
          </div>
          <div className="text-center">
            <Button variant="link" className="p-0 stats-button">
              <strong>{profile.followers}</strong>
              <p>Followers</p>
            </Button>
          </div>
          <div className="text-center">
            <Button variant="link" className="p-0 stats-button">
              <strong>{profile.following}</strong>
              <p>Following</p>
            </Button>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {profile.posts && profile.posts.length > 0 ? (
            profile.posts.map((post) => (
              <div key={post.id} className="p-2" style={{ width: "33.33%" }}>
                <Image
                  src={post.imageUrl}
                  fluid
                  alt="Post Image"
                  style={{ objectFit: "cover", width: "100%", height: "100px" }}
                />
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </Col>
    </Row>
  );

  const renderAcademicSection = () => (
    <Row>
      <Col md={4} className="text-center mb-4 mb-md-0">
        <Image
          src={profile.avatar}
          roundedCircle
          fluid
          alt="Profile Picture"
          className="mb-3"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        {editing ? (
          <div>
            <Form.Group>
              <Form.Label>Student ID</Form.Label>
              <Form.Control type="text" value={profile.studentId} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                value={updatedCourse}
                onChange={(e) => setUpdatedCourse(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={updatedDepartment}
                onChange={(e) => setUpdatedDepartment(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                value={updatedYear}
                onChange={(e) => setUpdatedYear(e.target.value)}
              />
            </Form.Group>
          </div>
        ) : (
          <div>
            <h3 className="mb-0">{profile.studentId}</h3>
            <p className="text-muted mb-1">
              <FaUserGraduate /> {profile.course}
            </p>
            <p className="text-muted mb-1">
              <FaChalkboardTeacher /> {profile.department}
            </p>
            <p className="text-muted mb-1">
              <FaCalendarAlt /> {profile.year}
            </p>
          </div>
        )}
      </Col>
      <Col md={8}>
        <h4>Academic Details</h4>
        {editing ? (
          <Form.Group>
            <Form.Label>GPA</Form.Label>
            <Form.Control
              type="text"
              value={updatedGpa}
              onChange={(e) => setUpdatedGpa(e.target.value)}
            />
          </Form.Group>
        ) : (
          <p>
            <strong>GPA:</strong> {profile.gpa}
          </p>
        )}
        <h5>Enrolled Courses</h5>
        <ListGroup variant="flush">
          {editing ? (
            <Form.Group>
              <Form.Label>Courses</Form.Label>
              <Form.Control
                as="textarea"
                value={updatedCourse}
                onChange={(e) => setUpdatedCourse(e.target.value)}
              />
            </Form.Group>
          ) : (
            profile.courses &&
            profile.courses.length > 0 &&
            profile.courses.map((course, index) => (
              <ListGroup.Item key={index}>
                <FaBook className="me-2" />
                {course}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
        <h5 className="mt-4">Achievements</h5>
        <ListGroup variant="flush">
          {editing ? (
            <Form.Group>
              <Form.Label>Achievements</Form.Label>
              <Form.Control
                as="textarea"
                value={profile.achievements.join("\n")}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    achievements: e.target.value.split("\n"),
                  }))
                }
              />
            </Form.Group>
          ) : (
            profile.achievements &&
            profile.achievements.length > 0 &&
            profile.achievements.map((achievement, index) => (
              <ListGroup.Item key={index}>
                <FaAward className="me-2" />
                {achievement}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
        <h5 className="mt-4">Attendance</h5>
        {editing ? (
          <Form.Group>
            <Form.Label>Attendance</Form.Label>
            <Form.Control
              type="number"
              value={profile.attendance}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  attendance: e.target.value,
                }))
              }
            />
          </Form.Group>
        ) : (
          <ProgressBar
            now={profile.attendance}
            label={`${profile.attendance}%`}
          />
        )}
      </Col>
    </Row>
  );

  const navigateSections = (direction) => {
    const sections = ["social", "academic"];
    const currentIndex = sections.indexOf(activeSection);
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = sections.length - 1;
    if (newIndex >= sections.length) newIndex = 0;
    setActiveSection(sections[newIndex]);
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

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm border-0 rounded-3">
        <Row className="mb-4 align-items-center">
          {/* Navigation Buttons */}
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0"
          >
            <Button
              variant="light"
              className="rounded-circle p-2 m-2"
              onClick={handleBack}
            >
              <IoArrowBackOutline size={24} />
            </Button>
            <Button
              variant="light"
              onClick={handleHome}
              className="rounded-circle p-2 m-2"
            >
              <IoHomeOutline size={24} />
            </Button>
            <Button
              variant="light"
              onClick={handleForward}
              className="rounded-circle p-2 m-2"
            >
              <IoArrowForwardOutline size={24} />
            </Button>
          </Col>

          {/* Profile Heading */}
          <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
            <h2>Profile</h2>
          </Col>

          {/* Other Buttons */}
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center justify-content-md-end"
          >
            <ButtonGroup className="me-2">
              <Button
                className="m-1"
                variant={
                  activeSection === "social" ? "primary" : "outline-primary"
                }
                onClick={() => setActiveSection("social")}
              >
                Social
              </Button>
              <Button
                className="m-1"
                variant={
                  activeSection === "academic" ? "primary" : "outline-primary"
                }
                onClick={() => setActiveSection("academic")}
              >
                Academic
              </Button>
              <Button className="m-1" variant="outline-secondary">
                <IoMdSettings />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>

        {activeSection === "social"
          ? renderSocialSection()
          : renderAcademicSection()}
      </Card>
    </Container>
  );
};

export default Profile;
