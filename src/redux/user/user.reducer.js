import { userTypes } from "./user.types";
import { initialUser } from "data";
const INITIAL_STATE = {
  currentUser: initialUser,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
