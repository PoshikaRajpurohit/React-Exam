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
    <Container className="py-5">
      <Card className="p-4 shadow-sm payment-card">
        <h2 className="mb-4">Payment</h2>
        <p className="payment-summary">
          <strong>Amount to Pay:</strong> ₹{bookingData?.totalPayable || 0}
        </p>
        <Form className="payment-methods">
         <Form.Group className="mb-3 payment-methods">
  <div className="form-check">
    <Form.Check type="radio" label="UPI / Google Pay / PhonePe" value="upi" name="paymentMethod" checked={paymentMethod === "upi"} 
    onChange={(e) => setPaymentMethod(e.target.value)}/>
  </div>
  <div className="form-check">
    <Form.Check type="radio" label="Credit / Debit Card" value="card" name="paymentMethod" checked={paymentMethod === "card"} 
    onChange={(e) => setPaymentMethod(e.target.value)}/>
  </div>
  <div className="form-check">
    <Form.Check type="radio" label="Net Banking" value="netbanking" name="paymentMethod" checked={paymentMethod === "netbanking"} 
    onChange={(e) => setPaymentMethod(e.target.value)}/>
  </div>
</Form.Group>

          {paymentMethod === "upi" && (
            <Form.Group className="mb-3">
              <Form.Label>Enter UPI ID</Form.Label>
              <Form.Control type="text" name="upiId" placeholder="e.g. name@upi" value={upiId} onChange={handleChanged} 
              isInvalid={!!errors.upiId}/>
              <Form.Control.Feedback type="invalid">
                {errors.upiId}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          {paymentMethod === "card" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" name="cardNumber" placeholder="Your card number" value={cardNumber} onChange={handleChanged} 
                isInvalid={!!errors.cardNumber}/>
                <Form.Control.Feedback type="invalid">
                  {errors.cardNumber}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Expiry</Form.Label>
                <Form.Control type="text" name="expiry" placeholder="MM/YY" value={expiry} onChange={handleChanged} isInvalid={!!errors.expiry}/>
                <Form.Control.Feedback type="invalid">
                  {errors.expiry}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="password" name="cvv" placeholder="***" value={cvv} onChange={handleChanged} isInvalid={!!errors.cvv}/>
                <Form.Control.Feedback type="invalid">
                  {errors.cvv}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          <Button onClick={handlePayment} className="btn btn-success fw-bold">
            Pay Now
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Payment;

