import { combineReducers } from "redux";
import RoomReducer from "./RoomReducer";
import BookingReducer from "./BookReducer";
import authReducer from "./AuthReducer";
import cartReducer from "./CartReducer";
import MybookingReducer from "./MyBookingReducer";




const rootReducer = combineReducers({
   RoomReducer,
   cartReducer,
   BookingReducer,
   authReducer,
   MybookingReducer

});

export default rootReducer;