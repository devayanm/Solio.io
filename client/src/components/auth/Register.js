import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Spinner,
  Alert,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  ProgressBar,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import { registerUser } from "../../services/api";

const ConfirmationModal = ({ show, onClose, message }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    avatar: null,
    coverImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    const { username, password, fullName, email, avatar } = formData;
    if (!username || !password || !fullName || !email) {
      setError("All fields are required.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (!avatar) {
      setError("Avatar file is required.");
      return false;
    }
    return true;
  };

  const calculatePasswordStrength = () => {
    const { password } = formData;
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return 100;
    } else if (password.length >= 6) {
      return 60;
    } else {
      return 30;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("username", formData.username);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("fullName", formData.fullName);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("avatar", formData.avatar);
      formDataToSubmit.append("coverImage", formData.coverImage);

      const response = await registerUser(formDataToSubmit);
      setSuccess("Registration successful! Redirecting to login...");
      setShowConfirmation(true);
      console.log(response);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Failed to register. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h2 className="text-center mb-4">Register</h2>
          {success && (
            <Alert variant="success" onClose={() => setSuccess("")} dismissible>
              {success}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>
                Username{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>Your unique username.</Tooltip>}
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your Username"
                value={formData.username}
                onChange={handleChange}
                required
                isInvalid={error && !formData.username}
              />
              <Form.Control.Feedback type="invalid">
                Username is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>
                Password{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      Password must be at least 8 characters long and include a
                      mix of uppercase letters, lowercase letters, and numbers.
                    </Tooltip>
                  }
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  isInvalid={error && formData.password.length < 8}
                  aria-describedby="passwordHelpBlock"
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  Password must be at least 8 characters long.
                </Form.Control.Feedback>
              </InputGroup>
              <ProgressBar
                className="mt-2"
                now={calculatePasswordStrength()}
                label={`${calculatePasswordStrength()}%`}
                variant={
                  calculatePasswordStrength() >= 100
                    ? "success"
                    : calculatePasswordStrength() >= 60
                    ? "warning"
                    : "danger"
                }
              />
              <Form.Text id="passwordHelpBlock" muted>
                Use a mix of uppercase, lowercase, and numbers.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formFullName" className="mb-3">
              <Form.Label>
                Full Name{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>Your full name as registered.</Tooltip>}
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                isInvalid={error && !formData.fullName}
              />
              <Form.Control.Feedback type="invalid">
                Full name is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>
                Email{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      Your valid email address for registration confirmation.
                    </Tooltip>
                  }
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                isInvalid={error && !formData.email}
              />
              <Form.Control.Feedback type="invalid">
                Valid email is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAvatar" className="mb-3">
              <Form.Label>
                Avatar{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>Upload your avatar image.</Tooltip>}
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                required
                isInvalid={error && !formData.avatar}
              />
              <Form.Control.Feedback type="invalid">
                Avatar file is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formCoverImage" className="mb-3">
              <Form.Label>
                Cover Image{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>Upload your cover image.</Tooltip>}
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100"
            >
              {loading ? <Spinner animation="border" /> : "Register"}
            </Button>
          </Form>
          <ConfirmationModal
            show={showConfirmation}
            onClose={handleConfirmationClose}
            message={success}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
