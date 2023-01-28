import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    retrieveAllAnimes();
  }, []);

  const retrieveAllAnimes = async () => {
    const response = await fetch("http://localhost:3000/animes");
    const data = await response.json();
    setAnimeList(data);
  };

  const handleIncrement = (index) => {};

  const handleDecrement = (index) => {};

  return (
    <div className="App">
      <div>
        {animeList.map((anime, index) => (
          <div className="anime-card" key={index}>
            <h1>{anime.name}</h1>
            <p>{anime.lastEpisodeView}</p>
            <div className="img-container">
              <img src={anime.coverUrl} />
              <div className="img-btns-container">
                <button className="img-btn prev-btn" onClick={handleDecrement}>
                  -
                </button>
                <button className="img-btn next-btn" onClick={handleIncrement}>
                  +
                </button>
              </div>
            </div>
            <a href={anime.animeLink + (parseInt(anime.lastEpisodeView) + 1).toString().padStart(2, "0")}> Episode suivant ({parseInt(anime.lastEpisodeView) + 1})</a>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
