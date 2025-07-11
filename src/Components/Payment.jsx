import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "../App.css";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingData = state?.bookingData;

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "upiId":
        setUpiId(value);
        break;
      case "cardNumber":
        setCardNumber(value);
        break;
      case "expiry":
        setExpiry(value);
        break;
      case "cvv":
        setCvv(value);
        break;
      default:
        break;
    }
  };

  const validatePayment = () => {
    const errs = {};
    if (paymentMethod === "upi" && !upiId.trim()) {
      errs.upiId = "UPI ID is required.";
    }
    if (paymentMethod === "card") {
      if (!cardNumber.trim()) errs.cardNumber = "Card number is required.";
      if (!expiry.trim()) errs.expiry = "Expiry date is required.";
      if (!cvv.trim()) errs.cvv = "CVV is required.";
    }
    return errs;
  };

  const handlePayment = () => {
    const validationErrors = validatePayment();
    if (!bookingData || !bookingData.totalPayable) {
      toast.error("Missing booking details. Please go back and try again.");
      return;
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please complete the payment form.");
      return;
    }

    toast.success("Payment successful!");
    navigate("/booking-success", {
      state: {
        bookingId: Date.now().toString(),
        ...bookingData,
      },
    });
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center py-5"
      style={{ minHeight: "100vh", backgroundColor: "#f4ede1" }}
    >
      <Card
        className="p-4 shadow-sm border-0"
        style={{
          maxWidth: "520px",
          width: "90%",
          borderRadius: "18px",
          backgroundColor: "#fff8f0",
        }}
      >
        <h3
          className="text-center mb-4"
          style={{ color: "#6c4e2a", fontFamily: "Georgia, serif", fontWeight: "bold" }}
        >
          Payment Gateway
        </h3>

        <p className="text-center fw-semibold" style={{ fontSize: "1.1rem", color: "#6c4e2a" }}>
          Amount to Pay: <span style={{ color: "#b0892b" }}>₹{bookingData?.totalPayable || 0}</span>
        </p>

        <Form className="mt-4">
          <Form.Group className="mb-4">
  <Form.Label className="fw-semibold text-muted">Select Payment Method</Form.Label>
  <div className="d-flex flex-column gap-2 mt-2">
    <Form.Check
      type="radio"
      label="UPI / Google Pay / PhonePe"
      value="upi"
      name="paymentMethod"
      id="upi"
      checked={paymentMethod === "upi"}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="custom-radio"
    />
    <Form.Check
      type="radio"
      label="Credit / Debit Card"
      value="card"
      name="paymentMethod"
      id="card"
      checked={paymentMethod === "card"}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="custom-radio"
    />
    <Form.Check
      type="radio"
      label="Net Banking"
      value="netbanking"
      name="paymentMethod"
      id="netbanking"
      checked={paymentMethod === "netbanking"}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="custom-radio"
    />
  </div>
</Form.Group>


          {paymentMethod === "upi" && (
            <Form.Group className="mb-3">
              <Form.Label>UPI ID</Form.Label>
              <Form.Control
                type="text"
                name="upiId"
                placeholder="e.g. name@upi"
                value={upiId}
                onChange={handleChanged}
                isInvalid={!!errors.upiId}
                className="themed-input"
              />
              <Form.Control.Feedback type="invalid">{errors.upiId}</Form.Control.Feedback>
            </Form.Group>
          )}

          {paymentMethod === "card" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  placeholder="Your card number"
                  value={cardNumber}
                  onChange={handleChanged}
                  isInvalid={!!errors.cardNumber}
                  className="themed-input"
                />
                <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expiry</Form.Label>
                <Form.Control
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleChanged}
                  isInvalid={!!errors.expiry}
                  className="themed-input"
                />
                <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="password"
                  name="cvv"
                  placeholder="***"
                  value={cvv}
                  onChange={handleChanged}
                  isInvalid={!!errors.cvv}
                  className="themed-input"
                />
                <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          <Button
            onClick={handlePayment}
            className="w-100 mt-3"
            style={{
              backgroundColor: "#b0892b",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.05rem",
            }}
          >
            Pay Now
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Payment;
