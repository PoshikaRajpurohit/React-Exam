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
    case "ADD_ROOM_SUC":
      return {
         ...state, 
         isCreated: true, 
         isLoading: false };
    case "ADD_ROOM_REJ":

    case "DELETE_ROOM_REJ":
      return { 
        ...state, 
        errorMsg: action.payload, 
        isLoading: false };

    case "GET_ALL_ROOMS":
      return {
        ...state,
        rooms: action.payload,
        isLoading: false,
        isCreated: false,
        isUpdated: false,
      };
    case "GET_ROOM_SUC":
      return { 
        ...state, 
        room: action.payload, 
        isLoading: false };
    case "UPDATE_ROOM_SUC":
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
