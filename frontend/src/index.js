import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Login from "./Components/Login";
import AnimeFrames from "./Components/AnimeFrames";
import Header from "./Components/Header";
import AnimeFilter from "./Components/AnimeFilter";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/app"
          element={
            <AnimeFilter>
              <Header />
              <AnimeFrames />
            </AnimeFilter>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
