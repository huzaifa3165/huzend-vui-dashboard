import { cartType } from "./profile.types";
import { addItemToCart, decrementFromCartFunc } from "./profile.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartType.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case cartType.ADD_ITEM:
      return {
        ...state,

        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case cartType.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
      };
    case cartType.DECREMENT_ITEM:
      return {
        ...state,
        cartItems: decrementFromCartFunc(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
