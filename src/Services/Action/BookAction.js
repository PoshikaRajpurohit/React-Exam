import { db } from "../../Firebase";
import {doc,setDoc,getDoc, collection, getDocs,} from "firebase/firestore";
    export const clearBooking = () => ({
      type: "CLEAR_Booking",
    });

    export const fetchBookingAsync = () => async (dispatch, getState) => {
      const { user } = getState().authReducer;
      if (!user) return;
      const BookRef = doc(db, "rooms", user.uid);
      const BookSnap = await getDoc(BookRef);
      if (BookSnap.exists()) {
        const BookRooms = BookSnap.data().items || [];
        dispatch({ type: "SET_BOOKING_ITEMS", payload: BookRooms });
      } else {
        dispatch({ type: "SET_BOOKING_ITEMS", payload: [] });
      }
    };



    export const BookingAsync = (room) => async (dispatch, getState) => {
      const { user } = getState().authReducer;
      if (!user) return;
      const BookRef = doc(db, "rooms", user.uid);
      const BookSnap = await getDoc(BookRef);
      let BookRooms = BookSnap.exists() ? BookSnap.data().items || [] : [];
      const existingIndex = BookRooms.findIndex((item) => item.id === room.id);
      if (existingIndex >= 0) {
        BookRooms[existingIndex].quantity += 1;
      }      else {
        BookRooms.push({
          ...room,
          quantity: 1,
          price: Number(room.price), 
        });
      }
    await setDoc(BookRef, { items: BookRooms });
      dispatch({ type: "SET_BOOKING_ITEMS", payload: BookRooms});
    };

    


   

    export const removeBookingAsync = (id) => async (dispatch, getState) => {
      const { user } = getState().authReducer;
      const BookRef = doc(db, "rooms", user.uid);
      const BookSnap = await getDoc(BookRef);
      if (!BookSnap.exists()) return;
      const BookRooms = roomSnap.data().items || [];
      const updatedItems = BookRooms.filter((item) => item.id !== id);
      await setDoc(BookRef, { items: updatedItems });
      dispatch({ type: "SET_BOOKING_ITEMS", payload: updatedItems });
    };


export const clearBookingAsync = (userId) => {
  return async (dispatch) => {
    try {
      const roomRef = doc(db, "rooms", userId);
      await setDoc(roomRef, { items: [] }); 
      dispatch({ type: "CLEAR_BOOKING_SUCCESS" });
    } catch (error) {
      console.error("Error clearing Booking:", error.message);
    }
  };
};