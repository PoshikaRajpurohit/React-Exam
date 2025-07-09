import React from "react";
import { Navbar, Nav, NavDropdown, Button, Container, Dropdown, Badge } from "react-bootstrap";
import "./Header.css"
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../../Services/Action/AuthAction";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/Images/logo.png" ;
const Header = () => {
  const { user } = useSelector(state => state.authReducer);
  const dispatch =useDispatch()
  const handleLogout = () => {
    dispatch(signOutAsync());
    clearCart()
  };
  return (
    <Navbar expand="lg" style={{ backgroundColor: "white", padding: "1rem 2rem" ,width:"100%"}}>
      <Container fluid >      
        <Navbar.Brand href="/" style={{ color: "#b79b5c", fontWeight: "bold", fontSize: "1.5rem", letterSpacing: "2px" }}>
              <img src={logo} alt={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="taj-navbar-nav" />
        <Navbar.Collapse id="taj-navbar-nav">
          <Nav className="mx-auto" style={{ gap: "1.5rem", fontWeight: "500", color: "#a58f63" }}>
            <Nav.Link href="#">DESTINATIONS</Nav.Link>
            <Nav.Link href="#">HOTELS</Nav.Link>           
            <Nav.Link as={Link} to="/book">Bookings</Nav.Link>
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
                <Dropdown.Toggle variant="white" id="user-dropdown"style={{ color: "#a58f63", fontWeight: "500" }}>
                  <FaUserCircle className="me-1" />
                  {user.displayName || user.email }
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/sign-up">
                    New Customer? Sign Up
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/sign-in" style={{ color: "#a58f63", fontWeight: "500" }}>
                Login
              </Nav.Link>
            )}
        </Dropdown>
            <Nav.Link href="/add" style={{ color: "#a58f63", fontWeight: "500" }}>
              Add Room
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;