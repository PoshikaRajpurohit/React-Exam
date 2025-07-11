import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Button, Container, Dropdown, Badge } from "react-bootstrap";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../../Services/Action/AuthAction";
import { fetchBookingsAsync } from "../../Services/Action/MyBookingAction";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.png";

const Header = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { bookings } = useSelector((state) => state.MybookingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchBookingsAsync(user.uid, false)); // Fetch only this user's bookings
    }
  }, [user?.uid, dispatch]);

  const handleLogout = () => {
    dispatch(signOutAsync());
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "white", padding: "1rem 2rem", width: "100%" }}>
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "#b79b5c", fontWeight: "bold", fontSize: "1.5rem", letterSpacing: "2px" }}>
          <img src={logo} alt="Logo" height="40" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="taj-navbar-nav" />
        <Navbar.Collapse id="taj-navbar-nav">
          <Nav className="mx-auto" style={{ gap: "1.5rem", fontWeight: "500", color: "#a58f63" }}>
            <Nav.Link href="#">DESTINATIONS</Nav.Link>
            <Nav.Link href="#">HOTELS</Nav.Link>

            {/* Bookings with badge */}
            <Nav.Link as={Link} to="/book" className="position-relative d-flex align-items-center gap-1">
              Bookings
              {Array.isArray(bookings) && bookings.length > 0 && (
                <Badge pill bg="warning" text="dark"
                  style={{ fontSize: "0.7rem", position: "absolute", top: "-6px", right: "-16px", backgroundColor: "#b0892b" }}>
                  {bookings.length}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link href="#">OFFERS</Nav.Link>
            <NavDropdown title="MEMBERSHIPS" id="membership-dropdown">
              <NavDropdown.Item href="#">Taj InnerCircle</NavDropdown.Item>
              <NavDropdown.Item href="#">Epicure</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="MORE" id="more-dropdown">
              <NavDropdown.Item href="#">Weddings</NavDropdown.Item>
              <NavDropdown.Item href="#">Meetings</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            <Dropdown className="hover-dropdown">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle variant="white" id="user-dropdown" style={{ color: "#a58f63", fontWeight: "500" }}>
                    <FaUserCircle className="me-1" />
                    {user.displayName || user.email}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/sign-up">New Customer? Sign Up</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link as={Link} to="/sign-in" style={{ color: "#a58f63", fontWeight: "500" }}>
                  Login
                </Nav.Link>
              )}
            </Dropdown>

            <Nav.Link as={Link} to="/add" style={{ color: "#a58f63", fontWeight: "500" }}>
              Add Room
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
