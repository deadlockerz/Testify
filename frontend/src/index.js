import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for ReactDOM
import "./index.css";
import AppWrapper from "./router/Router"; // Assuming AppWrapper is the root component
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AppWrapper />  {/* Use AppWrapper directly here */}
    </GoogleOAuthProvider>
  </React.StrictMode>
);
