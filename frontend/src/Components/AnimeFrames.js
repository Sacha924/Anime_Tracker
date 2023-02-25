import "./../styles/AnimeFrames.css";
import { useState, useEffect, useRef, useContext } from "react";
import { AnimeFilterContext } from "./AnimeFilter";
import Cookies from "js-cookie";

const URL = "http://localhost:3000/animes/";
const JWT_TOKEN = Cookies.get("JWTtoken");

function AnimeFrames() {
  // UseRef Statements
  const nameRef = useRef(null);
  const lastEpisodeSeenRef = useRef(null);
  const currentSeasonRef = useRef(null);
  const numOfEpPerSeasonRef = useRef(null);
  const coverURLRef = useRef(null);
  const animeEpisodeLinkRef = useRef(null);
  // UseState Statements
  const [animeList, setAnimeList] = useState([]);
  const [formModifyAnime, setFormModifyAnime] = useState(false);
  const [message, setMessage] = useState("▶ Watch More");
  const [list, setList] = useState(null);
  // UseContext Statement
  const { filter } = useContext(AnimeFilterContext);

  const retrieveAllAnimes = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    const filteredData = filter !== "" ? data.filter((anime) => anime.name.toLowerCase().includes(filter)) : data;
    setAnimeList(filteredData);
  };

  useEffect(() => {
    retrieveAllAnimes();
  }, [filter]);

  const handleEpisodeChange = async (id, value) => {
    const anime = await fetch(`${URL}${id}`);
    const data = await anime.json();
    let newAnime = {};
    if (data.maxEpPerSeason === data.lastEpisodeView && value === 1) newAnime = { ...data, lastEpisodeView: 1, currentSeason: data.currentSeason + 1 };
    else if (data.currentSeason !== null && 1 === data.lastEpisodeView && value === -1) newAnime = { ...data, lastEpisodeView: data.maxEpPerSeason, currentSeason: data.currentSeason - 1 };
    else if (data.currentSeason === null && 1 === data.lastEpisodeView && value === -1) newAnime = { ...data };
    else newAnime = { ...data, lastEpisodeView: parseInt(data.lastEpisodeView) + value };

    await fetch(`${URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      body: JSON.stringify(newAnime),
    });
    retrieveAllAnimes();
  };

  const moreAnime = async (id) => {
    if (list === null) {
      const newList = [];
      const anime = await fetch(`${URL}${id}`);
      const data = await anime.json();
      for (let i = -5; i <= 6; i++) {
        if (i !== 1) {
          const numEp = (parseInt(data.lastEpisodeView) + i).toString().padStart(2, "0");
          newList.push(
            <li key={i}>
              <a href={data.animeLink + numEp}> Episode {numEp} </a>
            </li>
          );
        }
      }
      setList(newList);
      setMessage("❌ Close This");
    } else {
      setList(null);
      setMessage("▶ Watch More");
    }
  };

  const modifyAnime = async (id, e) => {
    e.preventDefault();
    const updatedAnime = {
      name: nameRef.current.value,
      lastEpisodeView: lastEpisodeSeenRef.current.value,
      currentSeason: currentSeasonRef.current.value,
      maxEpPerSeason: numOfEpPerSeasonRef.current.value,
      coverUrl: coverURLRef.current.value,
      animeLink: animeEpisodeLinkRef.current.value,
    };
    await fetch(`${URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      body: JSON.stringify(updatedAnime),
    });

    setFormModifyAnime(false);
    retrieveAllAnimes();
  };

  const deleteAnime = async (id) => {
    if (window.confirm("Are you sure you want to delete this anime?")) {
      const animeToDelete = await fetch(`${URL}${id}`);
      await fetch(`${URL}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify(animeToDelete),
      });
    }
    retrieveAllAnimes();
  };

  const getAnimeLink = async (id) => {
    const anime = await fetch(`${URL}${id}`);
    const data = await anime.json();
    let link = data.animeLink;
    const animeName = link.split("/")[4].split("/")[0];

    if (![null, 1].includes(data.currentSeason)) {
      link = link.replace(`/${animeName}/`, `/${animeName}-${data.currentSeason}/`);
      link += `saison-${data.currentSeason}-`;
    }

    const animeLink = link + (parseInt(data.lastEpisodeView) + 1).toString().padStart(2, "0") + "-vostfr/";
    console.log(animeLink);
    return animeLink;
  };

  const handleNewEpClick = async (id) => {
    const link = await getAnimeLink(id);
    window.location.href = link;
  };

  return (
    <div className="App">
      <div>
        {animeList.map((anime, index) => (
          <div key={index}>
            <div className="anime-content">
              <div>
                <button className="watch-more-button" onClick={() => moreAnime(anime._id)}>
                  {message}
                </button>
                <ul className="listeEpisodesSupplementaire">{list}</ul>
              </div>
              <div className="anime-card">
                <h1>{anime.name}</h1>
                <p>
                  {anime.currentSeason != null && "Season " + anime.currentSeason + " "}
                  {"Episode " + anime.lastEpisodeView}
                  {anime.maxEpPerSeason != null && "/" + anime.maxEpPerSeason}
                </p>
                <div className="img-container">
                  <button className="img-btn prev-btn" onClick={() => handleEpisodeChange(anime._id, -1)}>
                    -
                  </button>
                  <img src={anime.coverUrl} />

                  <button className="img-btn next-btn" onClick={() => handleEpisodeChange(anime._id, 1)}>
                    +
                  </button>
                </div>
                {anime.lastEpisodeView === anime.maxEpPerSeason ? (
                  "You saw the last episode of this season"
                ) : (
                  <a href="#" onClick={() => handleNewEpClick(anime._id)} target="_blank">
                    Episode suivant ({parseInt(anime.lastEpisodeView) + 1})
                  </a>
                )}
              </div>
              <div>
                <button className="modify-button" onClick={() => setFormModifyAnime(anime._id)}>
                  MODIFY
                </button>

                <button className="delete-button" onClick={() => deleteAnime(anime._id)}>
                  DELETE
                </button>
                {formModifyAnime === anime._id && (
                  <form className="formModify" onSubmit={(e) => modifyAnime(anime._id, e)}>
                    <input type="text" name="name" placeholder="name" defaultValue={anime.name} ref={nameRef} />
                    <input type="text" name="lastEpisodeView" placeholder="lastEpisodeView" defaultValue={anime.lastEpisodeView} ref={lastEpisodeSeenRef} />
                    <input type="text" placeholder="1" defaultValue={anime.currentSeason} ref={currentSeasonRef} />
                    <input type="text" placeholder="12" defaultValue={anime.maxEpPerSeason} ref={numOfEpPerSeasonRef} />
                    <input type="text" name="coverUrl" placeholder="coverUrl" defaultValue={anime.coverUrl} ref={coverURLRef} />
                    <input type="text" name="animeLink" placeholder="animeLink" defaultValue={anime.animeLink} ref={animeEpisodeLinkRef} />
                    <button className="modifyButton" type="submit">
                      Modify
                    </button>
                    <button className="cancelModify" onClick={() => setFormModifyAnime("")}>
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AnimeFrames;
