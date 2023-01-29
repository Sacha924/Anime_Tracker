import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import AnimeFrames from "./Components/AnimeFrames";
import Header from "./Components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <AnimeFrames />
  </React.StrictMode>
);
