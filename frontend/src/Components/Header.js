import "./../styles/header.css";
import { useState, useEffect } from "react";

function Header() {
  return (
    <div className="header">
      <button>Add Anime</button>
      <h1>My Anime List</h1>
      <form>
        <input type="text" placeholder="Jujutsu Kaisen"/>
          <input className="submit" type="submit" value="🔎" />
      </form>
    </div>
  );
}
export default Header;
