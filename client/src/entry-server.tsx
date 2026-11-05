import { renderToString } from "react-dom/server";
import App from "./App";
import { PATHS } from "@shared/site";

// Build-time only: use the exact same component tree and data as the client.
export function renderMenu() {
  return renderToString(<App ssrPath={PATHS.menu} />);
}
