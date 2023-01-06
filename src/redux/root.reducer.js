import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import profileReducer from "./profile/profile.reducer";
// import collectionsReducer from "./collections/collections.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
};

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  // cartReducer: cartReducer,
  // directoryReducer: directoryReducer,
  // collectionsReducer: collectionsReducer,
});
export default persistReducer(persistConfig, rootReducer);
