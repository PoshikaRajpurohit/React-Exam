import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRoomsAsync, deleteRoomAsync } from "../Services/Action/RoomAction";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../App.css";

const Home = () => {
  const { rooms = [], loading } = useSelector((state) => state.RoomReducer);
  const { user, loading: authLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/sign-in");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(getAllRoomsAsync());
    }
  }, [dispatch, rooms.length]);

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRoomAsync(id));
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete room.");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
      <Container fluid className="py-5">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-3 mx-3">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <Col xs={12} md={4} key={room.id}>
                  <Card className="hotel-card h-100 position-relative card-hover-group">
                    <div className="room-img-wrap" onClick={() => handleView(room.id)} style={{ cursor: "pointer" }}>
                      <Card.Img src={room.image} alt={room.title} className="product-img" />
                    </div>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div onClick={() => handleView(room.id)} style={{ cursor: "pointer" }}>
                        <Card.Title className="room-number">{room.number}</Card.Title>
                        <Card.Text className="text-muted small mb-1">{room.desc}</Card.Text>
                        <Card.Text className="text-muted small mb-1"><strong>Category:-</strong>{room.category}</Card.Text>
                        <Card.Text className="text-muted small mb-1"><strong>BedType:-</strong>
                        {room.bed}</Card.Text>
                        <div className="fw-bold text-success mb-2">₹{room.price}</div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                       
                            <Button variant="outline-success" size="sm" onClick={() => handleEdit(room.id)} className="px-3 py-2">
                              <FaEdit />
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(room.id)} className="px-3 py-2">
                              <FaTrash />
                            </Button>
                          
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No rooms available</p>
            )}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Home;

