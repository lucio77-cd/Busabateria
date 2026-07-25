import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contextos/AuthContext";
import App from "./App";
import "./estilos/globals.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
