const initialState = {
  rooms: [],
  bookings: [],
  loading: false,
  error: null,
  bookingSuccess: false,
};

const MybookingReducer =(state = initialState, action)=> {
  switch (action.type) {
    case "BOOKING_CREATED_SUCCESS":
      return { ...state, bookingSuccess: true, error: null };
    case "BOOKING_CREATED_FAILED":
      return { ...state, error: action.payload, bookingSuccess: false };
      case "FETCH_BOOKINGS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_BOOKINGS_SUCCESS":
      return { ...state, bookings: action.payload, loading: false };
    case "FETCH_BOOKINGS_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
export default MybookingReducer
