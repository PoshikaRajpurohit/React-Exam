import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../Firebase";
import { setUserFromFirebase, authCheckDone } from "./Action/AuthAction";
import { fetchBookingAsync, clearBookingAsync } from "./Action/BookAction";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserFromFirebase(user));
        dispatch(fetchBookingAsync());
      } else {
        dispatch(setUserFromFirebase(null));
        dispatch(clearBookingAsync ());
      }

      dispatch(authCheckDone()); 
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;




