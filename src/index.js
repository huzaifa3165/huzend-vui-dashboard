import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <VisionUIControllerProvider>
          <App />
        </VisionUIControllerProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
