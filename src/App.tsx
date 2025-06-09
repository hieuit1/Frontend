import React from "react";
import AppRouter from "./routers/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "./assets/styles/index.css";

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
        <AppRouter />
      </GoogleOAuthProvider>
    </LocalizationProvider>
  );
};

export default App;
