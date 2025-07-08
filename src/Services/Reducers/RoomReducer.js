const initialState = {
  rooms: [], 
  room: null,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  errorMsg: "",
};


const RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, 
        isLoading: true, 
        errorMsg: "" };
    case "ADD_Room_SUC":
      return {
         ...state, 
         isCreated: true, 
         isLoading: false };
    case "ADD_Room_REJ":

    case "DELETE_Room_REJ":
      return { 
        ...state, 
        errorMsg: action.payload, 
        isLoading: false };

   
    case "GET_Room_SUC":
      return { 
        ...state, 
        rooms: action.payload, 
        isLoading: false };
    case "GET_ALL_RoomS":
  return {
    ...state,
    rooms: action.payload, 
    isLoading: false,
    isCreated: false,
    isUpdated: false,
  };

case "UPDATE_Room_SUC":
  return {
    ...state,
    rooms: state.rooms.map((p) =>
      p.id === action.payload.id ? action.payload : p
    ),
    room: null,
    isUpdated: true,
    isLoading: false,
  };

    default:
      return state;
  }
};
export default RoomReducer;
