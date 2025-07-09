import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";
import { db } from "../../Firebase";
export const loading = () => (
  { type: "LOADING" }
);
export const addRoomSuc = ()     =>
   (
    { type: "ADD_ROOM_SUC" });
export const addRoomRej = (err)  =>
   (
    { type: "ADD_ROOM_REJ",  payload: err }
  );
export const getAllRooms= (data) =>
   (
    { type: "GET_ALL_ROOMS", payload: data }
  );
export const getRoomSuc = (data) =>
   (
    { type: "GET_ROOM_SUC", 
       payload: data }
      );
export const deleteRoomRej= (err)=>
   ({ type: "DELETE_ROOM_REJ", payload: err }
   );
export const updateRoomSuc= (data) =>
   ({ type: "UPDATE_ROOM_SUC", 
    payload: data }
  );
export const getAllRoomsAsync = () => async (dispatch) => {
  dispatch(loading());
  try {
    const snapshot = await getDocs(collection(db, "rooms"));
    const data = snapshot.docs.map((rec) => rec.data());
    dispatch(getAllRooms(data));
  } catch (err) {
    dispatch(addRoomRej(err.message));
  }
};
export const addNewRoomAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await setDoc(doc(db, "rooms", data.id), data);
    dispatch(addRoomSuc());
      dispatch(getAllRoomsAsync());
  } catch (err) {
    dispatch(addRoomRej(err.message));
   
  }
};
export const deleteRoomAsync = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    await deleteDoc(doc(db, "rooms", id));
    dispatch(getAllRoomsAsync()); 
  } catch (err) {
    dispatch(deleteRoomRej(err.message));
  }
};
export const getRoomAsync = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const res = await getDoc(doc(db, "rooms", id));
    dispatch(getRoomSuc(res.data()));
  } catch (err) {
    dispatch(deleteRoomRej(err.message));
  }
};
export const updateRoomAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await updateDoc(doc(db, "rooms", data.id), data);
    dispatch(updateRoomSuc(data));    
  } catch (err) {
    dispatch(deleteRoomRej(err.message));
  }
};

