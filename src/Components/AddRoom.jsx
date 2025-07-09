import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Container, Form } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";
import { useNavigate } from "react-router";
import { addNewRoomAsync } from "../Services/Action/RoomAction";
import { ToastContainer, toast } from "react-toastify";
import { uploadImage } from "../Services/UploadImage";
import "../App.css"
const AddRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isCreated, errorMsg } = useSelector((state) => state.RoomReducer);
  const { user ,loading } = useSelector(state => state.authReducer);
  const initialState = {
    id: "",
    number: "",
    desc: "",
    category: "",
    bed:"",
    price: "",
    image: "",
  };
  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,   
      [name]: "",
    }));
  };
  const validateForm = () => {
    const { number, desc, category,bed, price, image } = inputForm;
    const newErrors = {};
    if (!number) newErrors.title = "Room Number is required.";
    if (!desc) newErrors.desc = "Description is required.";
    if (!category) newErrors.category = "Category must be selected.";
    if (!bed) newErrors.category = "Bed Type must be selected.";
    if (!price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }
    if (!image) newErrors.image = "Image URL is required.";
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
    const id = generateUniqueId({ length: 6, useLetters: false });
    const newRoom = { ...inputForm, id };
    dispatch(addNewRoomAsync(newRoom));
  };
 
  useEffect(() => {
    if (isCreated) {
      setInputForm(initialState);
      setErrors({});
      toast.success("🎉 Room added successfully!");
      setTimeout(() => navigate("/"), 2500);
    }
  }, [isCreated, navigate]);
  

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Card className="add-product-card w-100" style={{ maxWidth: "600px" }}>
        <h3 className="text-center text-primary mb-4 fw-bold">Add a New Room</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Room Number</Form.Label>
            <Form.Control type="text" placeholder="Enter Room Number" name="number" value={inputForm.number} onChange={handleChanged}/>
            {errors.title && <small className="text-danger">{errors.title}</small>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter Room Description" name="desc" value={inputForm.desc} 
            onChange={handleChanged}/>
            {errors.desc && <small className="text-danger">{errors.desc}</small>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Price</Form.Label>
            <Form.Control type="number" placeholder="Enter Room Price" name="price" value={inputForm.price} onChange={handleChanged}/>
            {errors.price && <small className="text-danger">{errors.price}</small>}
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Category</Form.Label>
          <Form.Select name="category" value={inputForm.category} onChange={handleChanged}>
            <option value="">Select Category</option>
            <option value="AC">AC</option>
            <option value="NON AC">NON AC</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Luxury">Luxury</option>
          </Form.Select>
          {errors.category && (<small className="text-danger">{errors.category}</small>)}
        </Form.Group>     
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Bed Type</Form.Label>
          <Form.Select name="bed" value={inputForm.bed} onChange={handleChanged}>
            <option value="">Select Category</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
          </Form.Select>
          {errors.bed && (<small className="text-danger">{errors.bed}</small>)}
        </Form.Group>     
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Product Image </Form.Label>
            <Form.Control type="file" placeholder="Choose your file" name="image" onChange={handleFileUpload}/>
            {errors.image && <small className="text-danger">{errors.image}</small>}
          </Form.Group>
          
          <div className="text-center">
            <Button variant="primary" type="submit" className="px-5 py-2 rounded-pill fw-semibold">
              <span>Add Room</span>
            </Button>
          </div>
          {errorMsg && <p className="text-danger mt-3 text-center">{errorMsg}</p>}
        </Form>
      </Card>
    </Container>
  );
};
export default AddRoom