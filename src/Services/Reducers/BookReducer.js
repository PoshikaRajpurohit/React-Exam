const initialState = {
  loading: false,
  rooms: [],
  error: null,
};

const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOKING_LOADING":
      return { ...state, loading: true };

    case "SET_BOOKINGS":
      return { ...state, loading: false, rooms: action.payload };

    case "ADD_BOOKING":
      return { ...state, rooms: [...state.rooms, action.payload], loading: false };

    

    

    case "REMOVE_BOOKING":
      return {
        ...state,
        rooms: state.rooms.filter((item) => item.id !== action.payload),
      };

    case "BOOKING_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "CLEAR_BOOKINGS":
    case "CLEAR_BOOKINGS_SUCCESS":
      return {
        ...state,
        rooms: [],
        loading: false,
      };

    default:
      return state;
  }
};

export default BookingReducer;


