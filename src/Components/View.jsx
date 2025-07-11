import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRoomAsync } from "../Services/Action/RoomAction";
import {Container,Row,Col, Image,Spinner,Button,ListGroup,Badge, Card,} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import "../App.css"
const ViewRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { room, Loading } = useSelector((state) => state.RoomReducer);

  useEffect(() => {
    dispatch(getRoomAsync(id));
  }, [dispatch, id]);

  const handleBookNow = () => {
    navigate("/booking-form");
  };

  if (Loading || !room) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-sm bg-light rounded-4 room-detail-card">
        <Card.Body>
          <Row className="gx-5 gy-4">
            <Col xs={12} md={4} className="text-center">
              <Link to="/" className="btn back-home-btn mb-3">
                <FaArrowLeft /> Back to Home
              </Link>
              <Image src={room.image} alt={room.number} fluid className="border mb-3" style={{ maxHeight: "400px", objectFit: "contain" }}/>
              <Button  className="w-100 fw-bold booking-btn" onClick={handleBookNow}>
                Book Now
              </Button>
            </Col>
            <Col xs={12} md={8}>
              <h3 className="text-start room-title">{room.number}</h3>
              <p className="text-muted text-start room-category">{room.category}</p>
              <p className="text-muted text-start room-desc">{room.desc}</p>
              <p className="text-muted text-start room-desc">Bed Type:-{room.bed}</p>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="success">4.1 ★</Badge>
                <span className="text-muted">(42,000+ Ratings)</span>
              </div>
              <h4 className="text-success text-start room-price">
                ₹{room.price}{" "}
                <small className="text-muted text-decoration-line-through">
                  ₹{Math.floor(room.price * 2)}
                </small>{" "}
                <span className="text-danger">50% off</span>
              </h4>
              <ListGroup variant="flush" className="my-3 text-start">
                <ListGroup.Item>
                  <strong>
                    Memorable Stays - 20% Savings on Breakfast Inclusive Stays
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  20% Savings on Breakfast-inclusive Stays
                </ListGroup.Item>
                <ListGroup.Item>
                  Daily Breakfast at Designated Dining Venue
                </ListGroup.Item>
                <ListGroup.Item>
                  20% Savings on Food & Beverages at Restaurants during the
                  Stay
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewRoom;

