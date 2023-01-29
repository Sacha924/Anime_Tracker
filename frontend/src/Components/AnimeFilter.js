import React, { useState } from "react";

const AnimeFilter = ({ children }) => {
  const [filter, setFilter] = useState("");

  return (
    <AnimeFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </AnimeFilterContext.Provider>
  );
};

export const AnimeFilterContext = React.createContext({});
export default AnimeFilter;
