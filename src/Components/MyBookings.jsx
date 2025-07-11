import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "../App.css";

const MyBookings = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const snap = await getDocs(collection(db, "bookings", user.uid, "reservations"));
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(list);
    } catch (err) {
      console.error("Error fetching bookings", err);
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookingId, firebaseDocId) => {
    try {
      await deleteDoc(doc(db, "bookings", user.uid, "reservations", firebaseDocId));
      setBookings((prev) => prev.filter((b) => b.id !== firebaseDocId));
      toast.success("Booking removed successfully!");
    } catch (err) {
      console.error("Remove failed", err);
      toast.error("Failed to remove booking.");
    }
  };

  useEffect(() => {
    if (user?.uid) fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return <p className="text-center mt-5">You have no bookings yet.</p>;
  }

  return (
    <Container className="py-4">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <h3 className="mb-4 text-center" style={{ color: "#b89d5b", fontWeight: "bold" }}>
        My Bookings
      </h3>
      <Row>
        {bookings.map((booking) => (
          <Col md={6} lg={4} key={booking.id}>
            <Card className="mb-4 shadow-sm border-0" style={{ background: "#fffdf7", borderRadius: "15px" }}>
              <Card.Body>
                <Card.Title style={{ color: "#a67c2d" }}>Booking ID: {booking.bookingId}</Card.Title>
                <Card.Text style={{ fontSize: "0.95rem", color: "#5c4b27" }}>
                  <strong>Guest:</strong> {booking.guestInfo.name} <br />
                  <strong>Check-In:</strong> {booking.guestInfo.checkIn} <br />
                  <strong>Check-Out:</strong> {booking.guestInfo.checkOut} <br />
                  <strong>Total:</strong> ₹{booking.totalPayable}
                </Card.Text>
                <div className="d-grid">
                  <Button
  className="taj-remove-btn"
  onClick={() => handleRemove(booking.bookingId, booking.id)}
>
  Remove Booking
</Button>

                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyBookings;
