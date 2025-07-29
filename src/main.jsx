import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  // Comment out to show the toast notification won't appear right away
  <StrictMode>
    <>
      <ToastContainer />
      <App />
    </>
  </StrictMode>
  // Comment out to show the toast notification won't appear right away
);
