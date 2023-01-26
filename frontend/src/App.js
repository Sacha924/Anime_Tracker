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
      <p> yo le gang</p>
      <div>
        {animeList.map((anime) => (
          <div>
            <h1>{anime.name}</h1>
            <p>{anime.lastEpisodeView}</p>
            <p>{anime.coverUrl}</p>
            <p>{anime.animeLink}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
