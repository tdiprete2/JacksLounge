import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
// Keep the real menu visible while React attaches navigation handlers.
// Other routes (and development) continue to use client rendering.
if (root.dataset.prerendered === window.location.pathname) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
