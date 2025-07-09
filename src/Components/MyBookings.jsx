import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

const MyBookings = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snap = await getDocs(collection(db, "bookings", user.uid, "reservations"));
        const list = snap.docs.map((doc) => doc.data());
        setBookings(list);
      } catch (err) {
        console.error("Error fetching bookings", err);
      } finally {
        setLoading(false);
      }
    };
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
      <h3 className="mb-4">My Bookings</h3>
      <Row>
        {bookings.map((booking) => (
          <Col md={6} lg={4} key={booking.bookingId}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Booking ID: {booking.bookingId}</Card.Title>
                <Card.Text>
                  <strong>Guest:</strong> {booking.guestInfo.name}<br />
                  <strong>Check-In:</strong> {booking.guestInfo.checkIn}<br />
                  <strong>Check-Out:</strong> {booking.guestInfo.checkOut}<br />
                  <strong>Total:</strong> ₹{booking.totalPayable}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default MyBookings;