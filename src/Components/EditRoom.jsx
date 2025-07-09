import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {getRoomAsync,updateRoomAsync} from "../Services/Action/RoomAction";
import { ToastContainer, toast } from "react-toastify";
import { uploadImage } from "../Services/UploadImage";
import "../App.css"
const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const { room, isUpdated, errorMsg } = useSelector((state) => state.RoomReducer);
  const initialState = {
    id: "",
    number: "",
    desc: "",
    category: "",
    bed:" ",
    price: "",
    image: "",
  };
  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState(''); 
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
     if (e.target.files) {
      setFileName(e.target.files.name);
    } else {
      setFileName('No file chosen');
    }
  };
  const validateForm = () => {
    const { number, desc, category, bed,price, image } = inputForm;
    const newErrors = {};
    if (!number) newErrors.title = "Room Number is required.";
    if (!desc) newErrors.desc = "Description is required.";
    if (!category) newErrors.category = "Category must be selected.";
    if (!bed) newErrors.category = "Bed Type must be selected.";
    if (!price) newErrors.price = "Price is required.";
    else if (isNaN(price) || Number(price) <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!image) newErrors.image = "Image URL is required.";
    return newErrors;
  };
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      try {
        const image = await uploadImage(file);
        setInputForm((prev) => ({ ...prev, image }));
        toast.success("Image uploaded successfully!");
      } catch (err) {
        toast.error("Image upload failed!");
      }
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    toast.error("Please fix the form errors before submitting.");
    return;
  }
  setSubmitted(true); 
  dispatch(updateRoomAsync({ ...inputForm, id }));
};

  useEffect(() => {
    if (id) dispatch(getRoomAsync(id));
  }, [id, dispatch]);
  useEffect(() => {
    if (room) setInputForm(room);
  }, [room]);
   useEffect(() => {
  if (submitted && isUpdated) {
    toast.success(" Room updated successfully!");
    setTimeout(() => navigate("/"), 2000);
  }
}, [submitted, isUpdated, navigate]);

  return (
    <Container className="edit-container mt-5 p-4 shadow rounded bg-white" style={{ width: "700px" }}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <h2 className="text-primary fw-bold text-center mb-4">Edit Room</h2>
      <Form onSubmit={handleSubmit}>  
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Room Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Room Number" name="number" value={inputForm.number} onChange={handleChanged}/>
          {errors.title && <small className="text-danger">{errors.title}</small>}
        </Form.Group>   
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter Product Description" name="desc" value={inputForm.desc} 
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
          {errors.category && (<small className="text-danger">{errors.category}</small>)}
        </Form.Group>     
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Room Image URL</Form.Label>
          <Form.Control type="file" placeholder="Enter Image URL" name="image"  onChange={handleFileUpload}/>
          {inputForm.image && (
          <Form.Text className="text-muted">
          Current Image: <a href={inputForm.image} target="_blank" rel="noreferrer">{inputForm.image.split('/').pop()}</a>
          </Form.Text>
          )}
          {errors.image && <small className="text-danger">{errors.image}</small>}
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" className="px-5 py-2 rounded-pill fw-semibold">
            Update Room
          </Button>
        </div>
        {errorMsg && <p className="text-danger mt-3 text-center">{errorMsg}</p>}
      </Form>
    </Container>
  );
};
export default EditRoom;

