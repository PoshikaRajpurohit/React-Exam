import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {Container,Row,Col,Image,Spinner,Button,ListGroup,Badge,} from "react-bootstrap";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { getRoomAsync } from "../Services/Action/RoomAction";
import { bookRoomAsync } from "../Services/Action/BookAction";
const ViewRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms } = useSelector((state) => state.RoomReducer);
  useEffect(() => {
    dispatch(getRoomAsync(id));
  }, [dispatch, id]);
  const handleBook = () => {
    dispatch(bookRoomAsync(rooms));
    navigate("/book");
  };
  const handleMore = () => {
  navigate("/checkout", { state: { rooms } }); 
};

  if ( !rooms) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <Container className="py-4">
      <Row className="gx-5 gy-4">     
        <Col xs={12} md={4} className="text-center">
          <Link to="/" className="btn btn-outline-secondary mb-3"> <FaArrowLeft/>  Back to Home</Link>
          <Image src={rooms.image} alt={rooms.title} fluid className="border mb-3 " 
          style={{ height: "auto", objectFit: "contain",width:'450px'}}/>
          <div className="d-flex w-100 gap-2 px-2">
            <Button variant="warning" className="w-50 text-white fw-bold" onClick={handleBook}>
              <FaShoppingCart /> Book Now
            </Button>
            <Button variant="danger" className="w-50 fw-bold" onClick={handleMore}>
              MORE
            </Button>
          </div>
        </Col>
        <Col xs={12} md={8} className="mt-5">
          <h3 className="text-start mt-4">{rooms.number}</h3>
          <p className="text-muted text-start">{rooms.category}</p>
          <p className="text-muted text-start">{rooms.desc}</p>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Badge bg="success">4.1 ★</Badge>
            <span className="text-muted">(42,000+ Ratings)</span>
          </div>
          <h4 className="text-success text-start">
            ₹{rooms.price}{" "}
            
          </h4>
          <ListGroup variant="flush" className="my-3 text-start">
            <ListGroup.Item>
              <strong>Best Available Rate- Room Only</strong>
            </ListGroup.Item>
            <p>Enjoy our standard 24-hour cancellation policy. No prepaid deposit required. WiFi included.</p>


            <ListGroup.Item>Accommodation on room only basis</ListGroup.Item>
            <ListGroup.Item>Inclusive of standard Wi-Fi</ListGroup.Item>
            <ListGroup.Item>
              Applicable taxes extra
            </ListGroup.Item>
          </ListGroup>
          
          <Row className="g-2 mt-3">
            {[...Array(4)].map((_, i) => (
              <Col key={i} xs={3} sm={2}>
                <Image src={rooms.image} fluid className="border" style={{ height: "60px", objectFit: "contain" }}/>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewRoom;

