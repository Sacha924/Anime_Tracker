import "./../styles/header.css";
import { useState, useRef, useContext } from "react";
import { AnimeFilterContext } from "./AnimeFilter";
import Cookies from "js-cookie";

const URL = "http://localhost:3000/animes/";
const JWT_TOKEN = Cookies.get("JWTtoken");
const USERNAME = Cookies.get("Username");

function Header() {
  const nameRef = useRef(null);
  const lastEpisodeSeenRef = useRef(null);
  const coverURLRef = useRef(null);
  const currentSeasonRef = useRef(null);
  const numOfEpPerSeasonRef = useRef(null);
  const animeEpisodeLinkRef = useRef(null);
  const nameForSearchRef = useRef(null);
  const [formAddAnime, setFormAddAnime] = useState(false);

  const { setFilter } = useContext(AnimeFilterContext);

  const addAnime = async () => {
    const newAnime = {
      name: nameRef.current.value,
      lastEpisodeView: lastEpisodeSeenRef.current.value,
      currentSeason: currentSeasonRef.current.value,
      maxEpPerSeason: numOfEpPerSeasonRef.current.value,
      coverUrl: coverURLRef.current.value,
      animeLink: animeEpisodeLinkRef.current.value,
      userNameWhoAddIt: USERNAME,
    };
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
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
            setFormAddAnime(!formAddAnime);
          }}
        >
          Add Anime
        </button>

        <h1>My Anime List</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilter(nameForSearchRef.current.value.toLowerCase());
          }}
        >
          <input type="text" placeholder="Jujutsu Kaisen" ref={nameForSearchRef} />
          <input className="submit" type="submit" value="🔎" />
        </form>
      </div>
      {formAddAnime && (
        <div className="header-secondRow">
          <form onSubmit={addAnime} style={{ marginTop: "60px" }}>
            <div className="formField">
              <label> Name :</label>
              <input type="text" placeholder="One Piece" ref={nameRef} required />
            </div>
            <div className="formField">
              <label> Last Episode Seen :</label>
              <input type="number" placeholder="1" ref={lastEpisodeSeenRef} required />
            </div>
            <div className="formField">
              <label> Current Season :</label>
              <input type="text" placeholder="1" ref={currentSeasonRef} />
            </div>
            <div className="formField">
              <label> number of episodes per season :</label>
              <input type="text" placeholder="12" ref={numOfEpPerSeasonRef} />
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
