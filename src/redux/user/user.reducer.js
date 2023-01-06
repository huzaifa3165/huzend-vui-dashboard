import { userTypes } from "./user.types";
import { initialUser } from "data";
const INITIAL_STATE = {
  currentUser: initialUser,
  universal: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SET_UNIVERSAL:
      return {
        ...state,
        universal: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
