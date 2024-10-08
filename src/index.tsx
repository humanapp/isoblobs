import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppStateProvider } from "./state/Context";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>
);
