import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "./BookingSuccess.css";

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingId = state?.bookingId || "N/A";

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f4ede1" }}
    >
      <Card
        className="text-center p-5 shadow-lg border-0"
        style={{
          maxWidth: "520px",
          width: "90%",
          borderRadius: "20px",
          backgroundColor: "#fff8f0",
        }}
      >
        <FaCheckCircle size={70} className="mb-4" style={{ color: "#28a745" }} />
        <h2 style={{ color: "#6c4e2a", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
          Booking Confirmed!
        </h2>
        <p className="mt-3 fs-5" style={{ color: "#5a4634" }}>
          Thank you for your reservation. We look forward to hosting you.
        </p>
        <p className="mb-4" style={{ color: "#5a4634" }}>
          <strong>Booking ID:</strong>{" "}
          <span style={{ color: "#b0892b", fontWeight: "600" }}>{bookingId}</span>
        </p>
        <Button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#b0892b",
            border: "none",
            padding: "10px 30px",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Go to Home
        </Button>
      </Card>
    </Container>
  );
};

export default BookingSuccess;
