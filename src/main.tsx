import React from "react";
import ReactDOM from "react-dom/client";
import "./login.css";

import "bootstrap/dist/css/bootstrap.css";
import LogIn from "./logIn.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LogIn />
  </React.StrictMode>
);
