import { useEffect, useState } from "react";
import "./styles.css";
import categories, { getMovies } from "../../api";


export const Banner = ({ title }) => {
  const [movie, setMovie] = useState({});

  const fetchRandomMovie = async () => {
    try {
      const netflixOriginalCategory = categories.find(
        (category) => category.name === "netflixOriginals"
      );
      const data = await getMovies(netflixOriginalCategory.path);
      const moviesList = data?.results;

      const randomIndex = Math.floor(Math.random() * moviesList.length);
      setMovie(moviesList[randomIndex]);

    } catch (error) {
      console.log("bannerError", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
    console.log("movies", movie);
  }, []);

  const truncate = (str, num) => {
    return str?.length > num ? str.substr(0, num - 1) + "..." : str;
  };

  return (
    <header className="banner-container" style={{
      backgroundSize: "cover",
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      roundPosition: "center-center"
    }}>
      <div className="banner-content">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-button-container">
          <button className="banner-button">
            Assistir
          </button>
          <button className="banner-button">
            Minha Lista
          </button>
        </div>
        <div className="banner-description">
          <h3>{truncate(movie?.overview, 150)}</h3>
        </div>
      </div>
    </header>
  );
};