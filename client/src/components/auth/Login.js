import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Spinner,
  Alert,
  Form,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";
import { FiInfo, FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../../services/api";

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

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await loginUser({
        username: identifier,
        password,
      });
      setSuccess("Login successful!");
      setLoading(false);

      // Set the httpOnly cookie
      document.cookie = `accessToken=${response.data.accessToken}; httpOnly; path=/`;
      document.cookie = `refreshToken=${response.data.refreshToken}; httpOnly; path=/`;

      // Optionally, you can redirect the user to another page
      navigate("/profile");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate("/profile"); // Adjust navigation if needed
    // Optionally reset form fields here
    setIdentifier("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h2 className="text-center mb-4">Login</h2>
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
            <Form.Group controlId="formIdentifier" className="mb-3">
              <Form.Label>
                Email or Username
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>Your registered email or username.</Tooltip>
                  }
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  isInvalid={error && !identifier}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Please provide a valid email or username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>
                Password{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      Enter your password. Click the eye icon to toggle
                      visibility.
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  isInvalid={error && !password}
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formRememberMe" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Remember Me"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
              />
            </Form.Group>

            <div className="mb-3">
              <a
                href="#"
                className="text-decoration-none"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </a>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <Button variant="secondary" onClick={() => navigate("/")}>
                Back to Home
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          show={showConfirmation}
          onClose={handleConfirmationClose}
          message="Login successful! Redirecting to the profile page."
        />
      )}
    </div>
  );
};

export default Login;
