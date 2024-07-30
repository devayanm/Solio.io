import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Spinner,
  Alert,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  ProgressBar,
  InputGroup,
} from "react-bootstrap";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";

const Register = () => {
  const [formData, setFormData] = useState({
    collegeId: "",
    password: "",
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { collegeId, password, name, email } = formData;
    if (!collegeId || !password || !name || !email) {
      setError("All fields are required.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
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
    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError("Failed to register. Please try again.");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h2 className="text-center mb-4">Register</h2>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCollegeId" className="mb-3">
              <Form.Label>
                College ID{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      Your unique college identification number.
                    </Tooltip>
                  }
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                name="collegeId"
                placeholder="Enter your College ID"
                value={formData.collegeId}
                onChange={handleChange}
                required
                isInvalid={error && !formData.collegeId}
              />
              <Form.Control.Feedback type="invalid">
                College ID is required.
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
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>
                Name{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      Your full name as registered in the college.
                    </Tooltip>
                  }
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                isInvalid={error && !formData.name}
              />
              <Form.Control.Feedback type="invalid">
                Name is required.
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
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="secondary" onClick={() => navigate("/")}>
                Back to Home
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
