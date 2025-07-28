import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App.js";       // ✅ now points to App.js
import "./src/App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
