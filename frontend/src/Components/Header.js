import "./../styles/header.css";
import { useState, useEffect } from "react";

function Header() {
  const [formAddAnime, setFormAddAnime] = useState(false);

  const searchForAnimes = async () => {
    // UTILISATION DE USEREF ? TENTER D ABORD SANS VOIR SI JE PEUX ACCEDER A LA VALUE SANS
  };

  const addAnime = async () => {
    setFormAddAnime(false);
  };

  return (
    <div className="header">
      <div className="header-firstRow">
        <button
          onClick={() => {
            setFormAddAnime(true);
          }}
        >
          Add Anime
        </button>

        <h1>My Anime List</h1>
        <form onSubmit={searchForAnimes}>
          <input type="text" placeholder="Jujutsu Kaisen" />
          <input className="submit" type="submit" value="🔎" />
        </form>
      </div>
      {formAddAnime && (
        <div className="header-secondRow">
          <form onSubmit={addAnime} style={{ marginTop: "60px" }}>
            <div className="formField">
              <label> Name :</label>
              <input type="text" placeholder="One Piece" />
            </div>
            <div className="formField">
              <label> Last Episode Seen :</label>
              <input type="number" placeholder="1" />
            </div>
            <div className="formField">
              <label> Cover URL :</label>
              <input type="text" />
            </div>
            <div className="formField">
              <label> Anime Episode Link :</label>
              <input type="text" />
            </div>
            <input className="submit" type="submit" value="Add" />
          </form>
        </div>
      )}

    </div>
  );
}
export default Header;
