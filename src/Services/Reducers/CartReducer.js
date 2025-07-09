const initialState = {
  loading: false,
  cartItems: [],
  error: null,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_LOADING":
      return { ...state, loading: true };

    case "SET_CART_ITEMS":
      return { ...state, loading: false, cartItems: action.payload };

    case "ADD_TO_CART":
      return { ...state, cartItems: [...state.cartItems, action.payload], loading: false };

   

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case "CART_ERROR":
      return { ...state, loading: false, error: action.payload };
      case "CLEAR_CART":
  return {
    ...state,
    cartItems: [],
  };
    case "CLEAR_CART_SUCCESS":
  return {
    ...state,
    cartItems: [],
    loading: false,
  };

    default:
      return state;
  }
};
export default cartReducer

