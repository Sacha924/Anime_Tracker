import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import AnimeFrames from "./Components/AnimeFrames";
import Header from "./Components/Header";
import AnimeFilter from "./Components/AnimeFilter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AnimeFilter>
      <Header />
      <AnimeFrames />
    </AnimeFilter>
  </React.StrictMode>
);
