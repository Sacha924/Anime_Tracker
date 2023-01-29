import "./../styles/AnimeFrames.css";
import { useState, useEffect } from "react";
const URL = "http://localhost:3000/animes/";

function AnimeFrames() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    retrieveAllAnimes();
  }, []);

  const retrieveAllAnimes = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setAnimeList(data);
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
  const modifyAnime = async (id) => {};

  const deleteAnime = async (id) => {
    const animeToDelete = await fetch(`${URL}${id}`);
    await fetch(`${URL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animeToDelete),
    });
    retrieveAllAnimes();
  };

  return (
    <div className="App">
      <div>
        {animeList.map((anime, index) => (
          <div className="anime-content">
            <div>
              <button className="watch-more-button" onClick={() => moreAnime(anime._id)}>
              ▶ Watch More
              </button>
            </div>
            <div className="anime-card" key={index}>
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
              <button className="modify-button" onClick={() => modifyAnime(anime._id)}>
                MODIFY
              </button>
              <button className="delete-button" onClick={() => deleteAnime(anime._id)}>
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AnimeFrames;
