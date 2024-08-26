import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {
  FaUser,
  FaHome,
  FaBook,
  FaSignInAlt,
  FaUserPlus,
  FaSearch,
} from "react-icons/fa";

const Header = () => {
  return (
    <>
      {/* Desktop Top Bar */}
      <Navbar
        bg="light"
        expand="lg"
        sticky="top"
        className="py-3 d-none d-lg-flex"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <Container>
          {/* Left-aligned Nav Links */}
          <Nav className="mr-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              activeClassName="active"
              className="text-primary"
            >
              <FaHome className="mr-2" />
              Feed
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/academic"
              activeClassName="active"
              className="text-primary"
            >
              <FaBook className="mr-2" />
              Academic
            </Nav.Link>
          </Nav>

          {/* Centered Brand */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="mx-auto text-center font-weight-bold"
            style={{
              color: "#007bff",
              fontSize: "1.5rem",
            }}
          >
            Solio.io
          </Navbar.Brand>

          {/* Right-aligned Nav Links */}
          <Nav className="ml-auto">
            <Nav.Link
              as={NavLink}
              to="/login"
              activeClassName="active"
              className="text-primary"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/register"
              activeClassName="active"
              className="text-primary"
            >
              <FaUserPlus className="mr-2" />
              Sign Up
            </Nav.Link>
            <NavDropdown
              title={<FaUser className="text-primary" />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Mobile Bottom Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          background: "#f8f9fa",
          color: "#007bff",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px",
          boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.3)",
          zIndex: 9999,
        }}
        className="d-lg-none"
      >
        <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
          <FaHome style={{ fontSize: "24px" }} />
        </Link>
        <Link
          to="/academic"
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          <FaBook style={{ fontSize: "24px" }} />
        </Link>
        <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          <FaSignInAlt style={{ fontSize: "24px" }} />
        </Link>
        <Link
          to="/register"
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          <FaUserPlus style={{ fontSize: "24px" }} />
        </Link>
        <Link
          to="/profile"
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          <FaUser style={{ fontSize: "24px" }} />
        </Link>
      </div>

      {/* Mobile Top Bar with Brand */}
      <Navbar
        bg="light"
        expand="lg"
        className="d-lg-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 9999,
        }}
      >
        <Container>
          {/* Centered Brand */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="mx-auto text-center font-weight-bold"
            style={{
              color: "#007bff",
              fontSize: "1.5rem",
            }}
          >
            Solio.io
          </Navbar.Brand>
          {/* Search Icon for Mobile */}
          <Link
            to="/search"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            <FaSearch style={{ fontSize: "24px" }} />
          </Link>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
