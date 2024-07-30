import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Spinner,
  Alert,
  Form,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FiInfo, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password, rememberMe);
      navigate("/");
    } catch (error) {
      setError("Failed to login. Please check your credentials and try again.");
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
          <h2 className="text-center mb-4">Login</h2>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>
                Email{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>Your registered email address.</Tooltip>}
                >
                  <span className="info-icon">
                    <FiInfo />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-describedby="emailHelpBlock"
                  isInvalid={error && !email}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
              <Form.Text id="emailHelpBlock" muted>
                We'll never share your email with anyone else.
              </Form.Text>
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
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-describedby="passwordHelpBlock"
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
              <Form.Text id="passwordHelpBlock" muted>
                Ensure your password is strong and secure.
              </Form.Text>
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
    </div>
  );
};

export default Login;
