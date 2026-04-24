import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

console.log('super long string to see if prettier formats this or not bc it doessdfgsdfgsdfgsdfgsdfg sfgsfg sdfg sdfg sdfg sdfg sdfg sdfgsometimes do weird things with long strings that are not template literals');

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element '#root' not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
