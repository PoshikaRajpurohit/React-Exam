import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
export const FETCH_BOOKINGS_REQUEST = "FETCH_BOOKINGS_REQUEST";
export const FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS";
export const FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE";

export const fetchBookingsAsync = (userId, isAdmin) => async (dispatch) => {
  dispatch({ type: FETCH_BOOKINGS_REQUEST });

  try {
    let bookings = [];

    if (isAdmin) {
      const usersSnap = await getDocs(collection(db, "bookings"));
      for (const userDoc of usersSnap.docs) {
        const reservationsSnap = await getDocs(collection(db, "bookings", userDoc.id, "reservations"));
        reservationsSnap.forEach((doc) => {
          bookings.push({ ...doc.data(), userId: userDoc.id });
        });
      }
    } else {
      const snap = await getDocs(collection(db, "bookings", userId, "reservations"));
      bookings = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    dispatch({ type: FETCH_BOOKINGS_FAILURE, payload: error.message });
  }
};
export const createBookingAsync = (formData, cartItems, finalAmount) => {
  return async (dispatch, getState) => {
    const { user } = getState().authReducer;

    if (!user || !user.uid) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const bookingRef = collection(db, "bookings", user.uid, "reservations");

      await addDoc(bookingRef, {
        guestInfo: formData,
        rooms: cartItems,
        totalPayable: finalAmount,
        createdAt: new Date().toISOString(),
        bookingId: Date.now().toString(),
      });

      toast.success("Booking successful!");
      dispatch({ type: "BOOKING_CREATED_SUCCESS" });
    } catch (error) {
      console.error("Booking save error:", error);
      toast.error("Failed to save booking.");
      dispatch({ type: "BOOKING_CREATED_FAILED", payload: error.message });
    }
  };
};
