import React from "react";
import { createRoot } from "react-dom/client";
import MusicLibrary from "./MusicLibrary";
import "./index.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(<MusicLibrary token={null} />);
}