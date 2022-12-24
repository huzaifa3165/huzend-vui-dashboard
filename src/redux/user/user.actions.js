import { userTypes } from "./user.types";

export const setCurrentUser = (user) => {
  console.log(userTypes.SET_CURRENT_USER);
  return {
    type: userTypes.SET_CURRENT_USER,
    payload: user,
  };
};
