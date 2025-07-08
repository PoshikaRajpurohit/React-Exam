import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRoomsAsync, deleteRoomAsync } from "../Services/Action/RoomAction";
import { useNavigate } from "react-router";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { bookRoomAsync } from "../Services/Action/BookAction";
import "../App.css";

const Home = () => {
  const { rooms = [], loading } = useSelector((state) => state.RoomReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-in");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(getAllRoomsAsync());
    }
  }, [dispatch, rooms.length]);

  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRoomAsync(id));
      toast.success("Room deleted successfully!");
    } catch {
      toast.error("Failed to delete room.");
    }
  };

  const handleBook = (room) => {
    if (!user) {
      toast.warn("Please sign in to book a room.");
      setTimeout(() => navigate("/sign-in"), 2000);
      return;
    }
    dispatch(bookRoomAsync(room, user));
    toast.success("Room Booked!");
    setTimeout(() => navigate("/book"), 1500);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
      <Container fluid className="py-5 px-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : rooms.length > 0 ? (
          <Row className="g-4">
            {rooms.map((room) => (
              <Col xs={12} md={6}  key={room.id}>
                <Card className="shadow-sm border-3 h-100">
                  <div className="position-relative">
                    <Card.Img variant="top" src={room.image} alt={room.name} style={{ height: "250px", objectFit: "cover" }} />
                    <div className="position-absolute top-0 end-0 m-2 d-flex flex-column">
                      <Button variant="outline-success" size="sm" className="mb-2" onClick={() => handleEdit(room.id)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(room.id)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="text-uppercase fw-bold fs-6">
                        {room.name}, #{room.number}
                      </Card.Title>
                      <Card.Text className="text-muted small mb-2">{room.category}</Card.Text>
                      <Card.Text className="text-muted small">
                        {room.size} • {room.bedType} • Up to {room.capacity} guests
                      </Card.Text>
                      <Card.Text className="fw-bold text-success fs-5">₹{room.price}</Card.Text>
                    </div>
                    <Button
                      className="bg-warning border-0 text-white fw-bold mt-3"
                      onClick={() => handleBook(room)}
                    >
                      BOOK NOW
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            <Col className="text-center">
              <h3 className="mt-4 fw-semibold">No rooms available</h3>
              <p className="text-muted">Please add rooms to get started.</p>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Home;

