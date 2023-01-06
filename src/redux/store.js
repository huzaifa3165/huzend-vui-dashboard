import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "./root.reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
export let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
export let persistor = persistStore(store);

export default { store, persistor };
