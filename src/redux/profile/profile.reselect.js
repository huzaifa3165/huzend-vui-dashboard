import { createSelector } from "reselect";

const selectProfile = (state) => state.profile;

export const selectCongratulations = createSelector(
  [selectProfile],
  (profile) => profile.congratulations
);
export const selectCongratulationsCourse = createSelector(
  [selectCongratulations],
  (congratulations) => congratulations.course
);
