


import React from "react";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import BookAStayDropdown from "./BookingPael";

const Header = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "white", padding: "1rem 2rem" }}>
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand href="/" style={{ color: "#b79b5c", fontWeight: "bold", fontSize: "1.5rem", letterSpacing: "2px" }}>
              TAJ
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="taj-navbar-nav" />
        <Navbar.Collapse id="taj-navbar-nav">
          <Nav className="mx-auto" style={{ gap: "1.5rem", fontWeight: "500", color: "#a58f63" }}>
            <Nav.Link href="#">DESTINATIONS</Nav.Link>
            <Nav.Link href="#">HOTELS</Nav.Link>
            <Nav.Link href="#">DINING</Nav.Link>
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
            <Nav.Link href="#" style={{ color: "#a58f63", fontWeight: "500" }}>
              LOGIN / JOIN
            </Nav.Link>
            <Nav.Link href="/add" style={{ color: "#a58f63", fontWeight: "500" }}>
              Add Room
            </Nav.Link>
            <Button variant="warning" style={{ backgroundColor: "#b79b5c", border: "none", fontWeight: "bold" }}>
             {/* <BookAStayDropdown/> */}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

// import React, { useState, useRef } from "react";
// import {
//   Dropdown,
//   Form,
//   InputGroup,
//   Row,
//   Col,
//   Button
// } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import { FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";
// import "react-datepicker/dist/react-datepicker.css";

// const BookAStayDropdown = () => {
//   const [show, setShow] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000));
//   const [guests, setGuests] = useState("1 Adult, 0 Child - 1 Room");
//   const dropdownRef = useRef();

//   // Toggle manually
//   const toggleDropdown = () => setShow(!show);
//   const closeDropdown = () => setShow(false);

//   return (
//     <div style={{ position: "relative", display: "inline-block" }} ref={dropdownRef}>
//       <Button
//         onClick={toggleDropdown}
//         style={{
//           backgroundColor: "#b79b5c",
//           border: "none",
//           fontWeight: "bold"
//         }}
//       >
//         BOOK A STAY
//       </Button>

//       {show && (
//         <div
//           style={{
//             position: "absolute",
//             top: "110%",
//             right: 0,
//             zIndex: 1000,
//             backgroundColor: "white",
//             padding: "1rem",
//             border: "1px solid #ddd",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//             width: "360px",
//             borderRadius: "6px"
//           }}
//         >
//           <div className="d-flex justify-content-between align-items-center mb-2">
            
//             <Button
//               size="sm"
//               variant="light"
//               onClick={closeDropdown}
//               style={{ color: "#b79b5c", fontWeight: "bold", border: "none" }}
//             >
//               CLOSE ✕
//             </Button>
//           </div>

//           {/* Destination Search */}
//           <Form.Group className="mb-3">
//             <InputGroup>
//               <InputGroup.Text>
//                 <FaSearch />
//               </InputGroup.Text>
//               <Form.Control placeholder="Find a Hotel or Destination" />
//             </InputGroup>
//           </Form.Group>

//           {/* Date Range */}
//           <Form.Group className="mb-3">
//             <InputGroup>
//               <InputGroup.Text>
//                 <FaCalendarAlt />
//               </InputGroup.Text>
//               <Row className="w-100">
//                 <Col>
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(date) => setStartDate(date)}
//                     dateFormat="dd MMM yyyy"
//                     className="form-control"
//                   />
//                 </Col>
//                 <Col>
//                   <DatePicker
//                     selected={endDate}
//                     onChange={(date) => setEndDate(date)}
//                     dateFormat="dd MMM yyyy"
//                     className="form-control"
//                   />
//                 </Col>
//               </Row>
//             </InputGroup>
//           </Form.Group>

//           {/* Guests */}
//           <Form.Group>
//             <InputGroup>
//               <InputGroup.Text>
//                 <FaUser />
//               </InputGroup.Text>
//               <Form.Select
//                 value={guests}
//                 onChange={(e) => setGuests(e.target.value)}
//               >
//                 <option>1 Adult, 0 Child - 1 Room</option>
//                 <option>2 Adults, 1 Child - 1 Room</option>
//                 <option>2 Adults, 2 Children - 2 Rooms</option>
//               </Form.Select>
//             </InputGroup>
//           </Form.Group>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookAStayDropdown;