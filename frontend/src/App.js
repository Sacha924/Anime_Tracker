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

  return (
    <div className="App">
      <div>
        {animeList.map((anime, index) => (
          <div className="anime-card" key={index}>
            <h1>{anime.name}</h1>
            <p>{anime.lastEpisodeView}</p>
            <img src={anime.coverUrl} />
            <a href={anime.animeLink + (parseInt(anime.lastEpisodeView) + 1).toString()}> Episode suivant ({parseInt(anime.lastEpisodeView) + 1})</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
