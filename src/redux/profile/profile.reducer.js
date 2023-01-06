import { profileTypes } from "./profile.types";

const INITIAL_STATE = {
  congratulations: { course: null },
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case profileTypes.ADD_CONGRATULATIONS:
      return {
        ...state,
        congratulations: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
