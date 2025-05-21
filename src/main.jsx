import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ThemeProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </ThemeProvider>
  </UserProvider>
);
