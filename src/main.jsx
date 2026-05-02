import { createRoot } from "react-dom/client";
import "./index.css";
import RoutesConfig from "./RoutesConfig.jsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <BrowserRouter>
      <RoutesConfig />
    </BrowserRouter>
  </ThemeProvider>,
);
