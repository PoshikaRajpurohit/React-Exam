import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Spinner,
  Modal,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { fetchBookingsAsync, clearBookingsAsync } from "../Services/Action/BookAction";
import "../App.css";

const BookRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rooms = [], loading: bookingLoading } = useSelector((state) => state.BookingReducer);
  const { user, loading: authLoading } = useSelector((state) => state.authReducer);

  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/sign-in");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchBookingsAsync());
    }
  }, [dispatch, user]);

  const handlePlaceBooking = async () => {
    if (user?.uid && rooms.length > 0) {
      await dispatch(clearBookingsAsync(user.uid));
      toast.success("Room(s) booked successfully!");
      setShowOrderModal(true);
    } else {
      toast.error("No rooms booked or user not logged in!");
    }
  };

  const handleModalClose = () => {
    setShowOrderModal(false);
    navigate("/");
  };

  const totalAmount = rooms.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = rooms.reduce((acc, item) => acc + item.quantity * 100, 0);
  const platformFee = 4;
  const finalAmount = totalAmount - totalDiscount + platformFee;

  return (
    <div className="cart-container py-5">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Container>
        {authLoading || bookingLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : rooms.length > 0 ? (
          <Row>
            <Col md={8}>
              {rooms.map((room) => (
                <Card className="p-4 shadow-sm border-0 mb-4" key={room.id}>
                  <Row>
                    <Col md={4}>
                      <Image src={room.image} fluid className="rounded" />
                    </Col>
                    <Col md={8}>
                      <h5 className="fw-bold text-uppercase">Type:-{room.category}</h5>
                      <p className="fw-bold">{room.desc}</p>
                      <div className="text-danger small fw-semibold mb-2">
                        ⚠️ Last {room.quantity || 2} Rooms Available
                      </div>
                      <div className="text-muted small mb-1">
                        <h6>Room Size:-{room.size}sqft </h6>
                       <h6> Bed Type:-{room.bedType}</h6> 
                        <h6>Capacity:- Up to {room.capacity} guests</h6>
                      </div>
                      <hr />
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>

            <Col md={4}>
              <Card className="p-3 shadow-sm border-0" style={{ backgroundColor: "#faf7f2" }}>
                <h6 className="text-uppercase text-secondary fw-semibold mb-2">Your Stay</h6>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Room 1:</span>
                  <span className="text-muted">1 Adult</span>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between mb-2">
                  <span>Price</span>
                  <span className="fw-semibold">₹{totalAmount}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount</span>
                  <span>- ₹{totalDiscount}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-2">
                  <span>Total Amount</span>
                  <span>₹{finalAmount}</span>
                </div>
                <p className="text-muted small mb-3">*Inclusive of all Taxes</p>
                <Button
                  className="w-100 bg-warning border-0 text-white fw-bold"
                  onClick={handlePlaceBooking}
                >
                  BOOK NOW
                </Button>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="text-center">
              <h3 className="mt-2 fw-semibold">No rooms booked yet!</h3>
              <p className="text-muted mb-4">Explore and book your stay now.</p>
              <Button
                variant="primary"
                className="px-5 py-2 fw-semibold"
                onClick={() => navigate("/")}
              >
                Explore Rooms
              </Button>
            </Col>
          </Row>
        )}
      </Container>

      <Modal show={showOrderModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmed 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="fw-semibold">Your booking has been confirmed successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookRoom;

