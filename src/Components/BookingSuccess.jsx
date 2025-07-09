import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "./BookingSuccess.css";

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingId = state?.bookingId || "N/A";

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center p-5 shadow-lg success-card">
        <FaCheckCircle size={60} className="text-success mb-3" />
        <h2 className="text-success">Booking Confirmed!</h2>
        <p className="mt-3 fs-5">Thank you for your reservation.</p>
        <p className="mb-4">
          <strong>Booking ID:</strong> <span className="text-primary">{bookingId}</span>
        </p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Card>
    </Container>
  );
};

export default BookingSuccess;
