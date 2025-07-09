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

  const handleSubmit = async (e) => {
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
    <Container className="py-5">
      <Card className="p-4 shadow-sm booking-card">
        <h2 className="mb-4">Booking Information</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name"/>
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email"/>
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10-digit phone number"/>
                {errors.phone && <small className="text-danger">{errors.phone}</small>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Check-In Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="checkIn" value={formData.checkIn} onChange={handleChange} 
                min={new Date().toISOString().slice(0, 16)}/>
                {errors.checkIn && <small className="text-danger">{errors.checkIn}</small>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Check-Out Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="checkOut" value={formData.checkOut} onChange={handleChange} min={formData.checkIn}/>
                {errors.checkOut && <small className="text-danger">{errors.checkOut}</small>}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Special Requests (Optional)</Form.Label>
            <Form.Control as="textarea" rows={3} name="specialRequest" value={formData.specialRequest} onChange={handleChange} 
            placeholder="Any special instructions?"/>
          </Form.Group>

          <div className="booking-total fw-bold fs-5 mt-3">
            Total Payable: ₹{room?.price || 0}
          </div>

          <Button type="submit" className="btn btn-warning text-white fw-bold mt-3">
            Confirm Booking
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default BookingForm;

