import "./../styles/AnimeFrames.css";
import { useState, useEffect, useRef, useContext } from "react";
import { AnimeFilterContext } from "./AnimeFilter";

const URL = "http://localhost:3000/animes/";

function AnimeFrames() {
  const nameRef = useRef(null);
  const lastEpisodeSeenRef = useRef(null);
  const coverURLRef = useRef(null);
  const animeEpisodeLinkRef = useRef(null);
  const [animeList, setAnimeList] = useState([]);
  const [formModifyAnime, setFormModifyAnime] = useState(false);

  const { filter } = useContext(AnimeFilterContext);

  useEffect(() => {
    retrieveAllAnimes();
  }, [filter]);

  const retrieveAllAnimes = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    const filteredData = filter !== "" ? data.filter((anime) => anime.name.toLowerCase().includes(filter)) : data;
    setAnimeList(filteredData);
  };

  const handleEpisodeChange = async (id, value) => {
    const anime = await fetch(`${URL}${id}`);
    const data = await anime.json();
    const newAnime = { ...data, lastEpisodeView: parseInt(data.lastEpisodeView) + value };
    await fetch(`${URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnime),
    });
    retrieveAllAnimes();
  };

  const moreAnime = async (id) => {};

  const modifyAnime = async (id) => {
    const updatedAnime = {
      name: nameRef.current.value,
      lastEpisodeView: lastEpisodeSeenRef.current.value,
      coverUrl: coverURLRef.current.value,
      animeLink: animeEpisodeLinkRef.current.value,
    };
    await fetch(`${URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAnime),
    });

    setFormModifyAnime(false);
  };

  const deleteAnime = async (id) => {
    if (window.confirm("Are you sure you want to delete this anime?")) {
      const animeToDelete = await fetch(`${URL}${id}`);
      await fetch(`${URL}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animeToDelete),
      });
      retrieveAllAnimes();
    }
  };

  return (
    <div className="App">
      <div>
        {animeList.map((anime, index) => (
          <div key={index}>
            <div className="anime-content">
              <div>
                <button className="watch-more-button" onClick={() => moreAnime(anime._id)}>
                  ▶ Watch More
                </button>
              </div>
              <div className="anime-card">
                <h1>{anime.name}</h1>
                <p>{anime.lastEpisodeView}</p>
                <div className="img-container">
                  <button className="img-btn prev-btn" onClick={() => handleEpisodeChange(anime._id, -1)}>
                    -
                  </button>
                  <img src={anime.coverUrl} />

                  <button className="img-btn next-btn" onClick={() => handleEpisodeChange(anime._id, 1)}>
                    +
                  </button>
                </div>
                <a href={anime.animeLink + (parseInt(anime.lastEpisodeView) + 1).toString().padStart(2, "0")}> Episode suivant ({parseInt(anime.lastEpisodeView) + 1})</a>
              </div>
              <div>
                <button className="modify-button" onClick={() => setFormModifyAnime(anime._id)}>
                  MODIFY
                </button>

                <button className="delete-button" onClick={() => deleteAnime(anime._id)}>
                  DELETE
                </button>
                {formModifyAnime === anime._id && (
                  <form className="formModify" onSubmit={() => modifyAnime(anime._id)}>
                    <input type="text" name="name" placeholder="name" defaultValue={anime.name} ref={nameRef} />
                    <input type="text" name="lastEpisodeView" placeholder="lastEpisodeView" defaultValue={anime.lastEpisodeView} ref={lastEpisodeSeenRef} />
                    <input type="text" name="coverUrl" placeholder="coverUrl" defaultValue={anime.coverUrl} ref={coverURLRef} />
                    <input type="text" name="animeLink" placeholder="animeLink" defaultValue={anime.animeLink} ref={animeEpisodeLinkRef} />
                    <button className ="modifyButton" type="submit">Modify</button>
                    <button className ="cancelModify" onClick={() => setFormModifyAnime("")}>Cancel</button>
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
