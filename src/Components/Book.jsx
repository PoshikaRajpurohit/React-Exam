import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { createBookingAsync } from "../Services/Action/MyBookingAction";
import "../App.css";

const BookingForm = () => {
  const { room } = useSelector((state) => state.RoomReducer);
  const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    specialRequest: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, checkIn, checkOut, phone } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!checkIn) newErrors.checkIn = "Check-in date is required.";
    if (!checkOut) newErrors.checkOut = "Check-out date is required.";
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      newErrors.checkOut = "Check-out must be after check-in.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors.");
      return;
    }

    if (!room || !room.price) {
      toast.error("Room details not found. Please select a room.");
      return;
    }

    dispatch(createBookingAsync(formData, room, room.price));
    navigate("/payment", {
      state: {
        bookingData: {
          userId: user?.uid,
          guestInfo: formData,
          number: room.number,
          totalPayable: room.price,
        },
      },
    });
  };

  return (
    <Container fluid className="booking-bg py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="p-4 shadow booking-card border-0" style={{ maxWidth: "550px", width: "90%", borderRadius: "18px", backgroundColor: "#fff8f0" }}>
        <h3 className="text-center mb-4 booking-title">Reservation Details</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="booking-label">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="booking-input"
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="booking-label">Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="booking-input"
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="booking-label">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              className="booking-input"
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="booking-label">Check-In</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)}
                  className="booking-input"
                />
                {errors.checkIn && <small className="text-danger">{errors.checkIn}</small>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="booking-label">Check-Out</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn}
                  className="booking-input"
                />
                {errors.checkOut && <small className="text-danger">{errors.checkOut}</small>}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="booking-label">Special Requests</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="specialRequest"
              placeholder="Any special instructions?"
              value={formData.specialRequest}
              onChange={handleChange}
              className="booking-input"
            />
          </Form.Group>

          <div className="text-end fw-semibold mt-3 mb-3" style={{ fontSize: "1rem", color: "#6c4e2a" }}>
            Total Payable: <span className="fw-bold">₹{room?.price || 0}</span>
          </div>

          <Button
            type="submit"
            className="w-100 booking-btn"
            style={{ backgroundColor: "#b0892b", border: "none", fontWeight: "bold", fontSize: "1.05rem" }}
          >
            Confirm Reservation
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default BookingForm;


