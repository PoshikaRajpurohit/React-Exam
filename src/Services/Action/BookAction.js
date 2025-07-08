import { db } from "../../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const clearBookings = () => ({
  type: "CLEAR_BOOKINGS",
});

export const fetchBookingsAsync = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "BOOKING_LOADING" });

      const { user } = getState().authReducer;
      const docRef = doc(db, "roomBookings", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const rooms = data.items || []; 
        dispatch({ type: "SET_BOOKINGS", payload: rooms });
      } else {
        dispatch({ type: "SET_BOOKINGS", payload: [] });
      }
    } catch (error) {
      dispatch({ type: "BOOKING_ERROR", payload: error.message });
    }
  };
};
export const bookRoomAsync = (room) => async (dispatch, getState) => {
  const { user } = getState().authReducer;
  if (!user) return;
  const bookingRef = doc(db, "roomBookings", user.uid);
  const bookingSnap = await getDoc(bookingRef);
  let rooms = bookingSnap.exists() ? bookingSnap.data().rooms || [] : [];
  const existingIndex = rooms.findIndex((item) => item.id === room.id);

  if (existingIndex >= 0) {
    rooms[existingIndex].quantity += 1;
  } else {
    rooms.push({
      ...room,
      quantity: 1,
      price: Number(room.price),
    });
  }

  await setDoc(bookingRef, { rooms });
  dispatch({ type: "SET_BOOKINGS", payload: rooms });
};

export const incrementBookingQtyAsync = (id) => async (dispatch, getState) => {
  const { user } = getState().authReducer;
  const bookingRef = doc(db, "roomBookings", user.uid);
  const bookingSnap = await getDoc(bookingRef);
  if (!bookingSnap.exists()) return;
  const rooms = bookingSnap.data().rooms || [];
  const index = rooms.findIndex((item) => item.id === id);

  if (index >= 0) {
    rooms[index].quantity += 1;
    await setDoc(bookingRef, { rooms });
    dispatch({ type: "SET_BOOKINGS", payload: rooms });
  }
};

export const decrementBookingQtyAsync = (id) => async (dispatch, getState) => {
  const { user } = getState().authReducer;
  const bookingRef = doc(db, "roomBookings", user.uid);
  const bookingSnap = await getDoc(bookingRef);
  if (!bookingSnap.exists()) return;
  let rooms = bookingSnap.data().rooms || [];
  const index = rooms.findIndex((item) => item.id === id);

  if (index >= 0) {
    if (rooms[index].quantity > 1) {
      rooms[index].quantity -= 1;
    } else {
      rooms.splice(index, 1);
    }
    await setDoc(bookingRef, { rooms });
    dispatch({ type: "SET_BOOKINGS", payload: rooms });
  }
};

export const removeRoomFromBookingAsync = (id) => async (dispatch, getState) => {
  const { user } = getState().authReducer;
  const bookingRef = doc(db, "roomBookings", user.uid);
  const bookingSnap = await getDoc(bookingRef);
  if (!bookingSnap.exists()) return;
  const rooms = bookingSnap.data().rooms || [];
  const updatedRooms = rooms.filter((item) => item.id !== id);
  await setDoc(bookingRef, { rooms: updatedRooms });
  dispatch({ type: "SET_BOOKINGS", payload: updatedRooms });
};

export const clearBookingsAsync = (userId) => {
  return async (dispatch) => {
    try {
      const bookingRef = doc(db, "roomBookings", userId);
      await setDoc(bookingRef, { rooms: [] });
      dispatch({ type: "CLEAR_BOOKINGS_SUCCESS" });
    } catch (error) {
      console.error("Error clearing bookings:", error.message);
    }
  };
};