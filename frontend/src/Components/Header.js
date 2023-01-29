import "./../styles/header.css";
import { useState, useRef } from "react";

const URL = "http://localhost:3000/animes/";

function Header() {
  const nameRef = useRef(null);
  const lastEpisodeSeenRef = useRef(null);
  const coverURLRef = useRef(null);
  const animeEpisodeLinkRef = useRef(null);
  const [formAddAnime, setFormAddAnime] = useState(false);

  const searchForAnimes = async () => {
    // UTILISATION DE USEREF ? TENTER D ABORD SANS VOIR SI JE PEUX ACCEDER A LA VALUE SANS
    
  };

  const addAnime = async () => {
    const newAnime = {
      name: nameRef.current.value,
      lastEpisodeView: lastEpisodeSeenRef.current.value,
      coverUrl: coverURLRef.current.value,
      animeLink: animeEpisodeLinkRef.current.value,
    };
    console.log(JSON.stringify(newAnime));
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnime),
    });
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
              <input type="text" placeholder="One Piece" ref={nameRef} />
            </div>
            <div className="formField">
              <label> Last Episode Seen :</label>
              <input type="number" placeholder="1" ref={lastEpisodeSeenRef} />
            </div>
            <div className="formField">
              <label> Cover URL :</label>
              <input type="text" ref={coverURLRef} />
            </div>
            <div className="formField">
              <label> Anime Episode Link :</label>
              <input type="text" ref={animeEpisodeLinkRef} />
            </div>
            <input className="submit" type="submit" value="Add" />
          </form>
        </div>
      )}
    </div>
  );
}
export default Header;
