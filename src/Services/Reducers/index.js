import { combineReducers } from "redux";
import RoomReducer from "./RoomReducer";
import BookingReducer from "./BookReducer";
import authReducer from "./AuthReducer";




const rootReducer = combineReducers({
   RoomReducer,
   BookingReducer,
   authReducer,

});

export default rootReducer;