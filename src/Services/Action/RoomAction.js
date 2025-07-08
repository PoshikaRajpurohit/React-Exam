import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";
import { db } from "../../Firebase";
export const loading = () => (
  { type: "LOADING" }
);
export const addRoomSuc = ()     =>
   (
    { type: "ADD_Room_SUC" });
export const addRoomRej = (err)  =>
   (
    { type: "ADD_Room_REJ",  payload: err }
  );
export const getAllRooms= (data) =>
   (
    { type: "GET_ALL_RoomS", payload: data }
  );
export const getRoomSuc = (data) =>
   (
    { type: "GET_Room_SUC", 
       payload: data }
      );
export const deleteRoomRej= (err)=>
   ({ type: "DELETE_Room_REJ", payload: err }
   );
export const updateRoomSuc= (data) =>
   ({ type: "UPDATE_Room_SUC", 
    payload: data }
  );
export const getAllRoomsAsync = () => async (dispatch) => {
  dispatch(loading());
  try {
    const snapshot = await getDocs(collection(db, "Rooms"));
    const data = snapshot.docs.map((rec) => rec.data());
    dispatch(getAllRooms(data));
  } catch (err) {
    dispatch(addRoomRej(err.message));
  }
};
export const addNewRoomAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await setDoc(doc(db, "Rooms", data.id), data);
    dispatch(addRoomSuc());
      dispatch(getAllRoomsAsync());
  } catch (err) {
    dispatch(addRoomRej(err.message));  
  }
};

export const deleteRoomAsync = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    await deleteDoc(doc(db, "Rooms", id));
    dispatch(getAllRoomsAsync()); 
  } catch (err) {
    dispatch(deleteRoomRej(err.message));
  }
};
export const getRoomAsync = (id) => async (dispatch) => {
  try {
    const docRef = doc(db, "rooms", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      dispatch({
        type: "GET_ROOM_SUCCESS",
        payload: { id: snapshot.id, ...snapshot.data() },
      });
    }
  } catch (error) {
    console.error("Error fetching room:", error);
  }
};
export const updateRoomAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await updateDoc(doc(db, "Rooms", data.id), data);
    dispatch(updateRoomSuc(data));    
  } catch (err) {
    dispatch(deleteRoomRej(err.message));
  }
};


