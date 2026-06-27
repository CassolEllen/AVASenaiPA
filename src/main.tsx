import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ProvaLockProvider } from "./context/ProvaLockContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ProvaLockProvider>
        <App />
      </ProvaLockProvider>
    </BrowserRouter>
  </StrictMode>
);