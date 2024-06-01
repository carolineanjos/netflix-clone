import { useEffect, useState } from "react";
import { getMovies } from "../../api";

import './styles.css';

const imageHost = "https://image.tmdb.org/t/p/original/";

export const Row = ({ title, path, isLarge }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      console.log("data", data);
      setMovies(data?.results);

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        {movies?.map((movie) => {
          return (
            <img
              className={!isLarge ? "movie-card" : "movie-card-large"}
              key={movie.id}
              src={`${imageHost}${isLarge ? movie.backdrop_path : movie.poster_path}`}
              alt={movie.title} />
          );
        })}
      </div>
    </div>
  );
};