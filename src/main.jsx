import { createRoot } from "react-dom/client";
import "./index.css";
import RoutesConfig from "./RoutesConfig.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RoutesConfig />
  </BrowserRouter>,
);
