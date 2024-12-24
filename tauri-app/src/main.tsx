import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import "@chinese-fonts/yozai/dist/Yozai-Medium/result.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
