import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CityProvider } from "../src/components/CityContext";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <CityProvider>
    <App />
  </CityProvider>
);
