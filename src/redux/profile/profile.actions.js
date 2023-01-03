import { cartType } from "./profile.types";

export const toggleCartHidden = () => {
  return {
    type: cartType.TOGGLE_CART_HIDDEN,
  };
};
export const addToCart = (item) => {
  return {
    type: cartType.ADD_ITEM,
    payload: item,
  };
};
export const removeFromCart = (item) => {
  return {
    type: cartType.REMOVE_ITEM,
    payload: item,
  };
};

export const decrementFromCart = (item) => {
  return {
    type: cartType.DECREMENT_ITEM,
    payload: item,
  };
};
