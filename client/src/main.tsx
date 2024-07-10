import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/main.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { AuthProvider } from "./hooks/AuthContext";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
