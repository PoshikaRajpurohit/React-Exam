import { db } from "../../Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const placeOrderAsync = (rooms, userId) => {
  return async (dispatch) => {
    try {
      const order = {
        userId,
        items: rooms,
        createdAt: Timestamp.now(),
        status: "Placed",
      };

      await addDoc(collection(db, "orders"), order);
      dispatch({ type: "PLACE_ORDER_SUCCESS", payload: order });
    } catch (error) {
      console.error("Order placement error:", error.message);
      dispatch({ type: "PLACE_ORDER_ERROR", payload: error.message });
    }
  };
};
