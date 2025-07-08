import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { uploadImage } from "../Services/UploadImage";
import { getRoomAsync, updateRoomAsync } from "../Services/Action/RoomAction";
import "../App.css";

const EditRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { room, isUpdated } = useSelector((state) => state.RoomReducer);

  const initialState = {
    id: "",
    name: "",
    desc: "",
    category: "",
    capacity: "",
    price: "",
    image: "",
    floor: "",
    bedType: "",
    size: "",
    view: "",
    rating: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getRoomAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (room) {
      setInputForm(room);
    }
  }, [room]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Room updated successfully!");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [isUpdated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
        setInputForm({ ...inputForm, [name]: value });
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const {
      name,
      desc,
      category,
      price,
      image,
      bedType,
      capacity,
      view,
      rating,
    } = inputForm;
    const newErrors = {};
    if (!name) newErrors.name = "Room name is required.";
    if (!desc) newErrors.desc = "Description is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!view) newErrors.view = "Please select view.";
    if (!rating) newErrors.rating = "Please select rating.";
    if (!capacity) newErrors.capacity = "Capacity is required.";
    if (!bedType) newErrors.bedType = "Please select bed type.";
    if (!price || isNaN(price) || Number(price) <= 0)
      newErrors.price = "Valid price required.";
    if (!image) newErrors.image = "Image is required.";
    return newErrors;
  };

  const handleFileUpload = async (e) => {
    try {
      const uploaded = await uploadImage(e.target.files[0]);
      setInputForm((prev) => ({
        ...prev,
        image: uploaded,
      }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed.");
      setErrors((prev) => ({
        ...prev,
        image: "Image upload failed. Try again.",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors.");
      return;
    }
    dispatch(updateRoomAsync(inputForm));
    toast.success("Room updated successfully!");
    navigate("/");
  };

  return (
    <Container className="py-4">
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      <Card className="p-4 shadow-sm border-0 bg-light rounded-4">
        <h4 className="mb-4">Edit Room</h4>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  name="name"
                  value={inputForm.name}
                  onChange={handleChange}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="desc"
                  value={inputForm.desc}
                  onChange={handleChange}
                />
                {errors.desc && <small className="text-danger">{errors.desc}</small>}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  value={inputForm.price}
                  onChange={handleChange}
                />
                {errors.price && <small className="text-danger">{errors.price}</small>}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={inputForm.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option>AC</option>
                  <option>NON-AC</option>
                  <option>Deluxe</option>
                  <option>Luxury</option>
                </Form.Select>
                {errors.category && (
                  <small className="text-danger">{errors.category}</small>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Floor</Form.Label>
                <Form.Control
                  name="floor"
                  value={inputForm.floor}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Bed Type</Form.Label>
                <Form.Select
                  name="bedType"
                  value={inputForm.bedType}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Queen</option>
                  <option>King</option>
                  <option>Twin</option>
                </Form.Select>
                
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  name="capacity"
                  value={inputForm.capacity}
                  onChange={handleChange}
                />
                {errors.capacity && (
                  <small className="text-danger">{errors.capacity}</small>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>View</Form.Label>
                <Form.Select
                  name="view"
                  value={inputForm.view}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Sea</option>
                  <option>City</option>
                  <option>Garden</option>
                </Form.Select>
                {errors.view && (
                  <small className="text-danger">{errors.view}</small>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  name="rating"
                  value={inputForm.rating}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Select>
                {errors.rating && (
                  <small className="text-danger">{errors.rating}</small>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
                {errors.image && (
                  <small className="text-danger">{errors.image}</small>
                )}
              </Form.Group>
              {inputForm.image && (
                <img
                  src={inputForm.image}
                  alt="Preview"
                  className="mt-2 rounded"
                  width={150}
                />
              )}
            </Col>
          </Row>

          <div className="text-end">
            <Button type="submit" className="px-5">
              Update Room
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditRoom;
