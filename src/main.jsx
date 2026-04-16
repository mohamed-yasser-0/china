import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./app.jsx";
import { ThemeProvider } from "./theme/theme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
