import { profileTypes } from "./profile.types";

export const addCongratulations = (item) => {
  return {
    type: profileTypes.ADD_CONGRATULATIONS,
    payload: item,
  };
};
