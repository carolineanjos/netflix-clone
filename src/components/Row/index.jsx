import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { getMovies } from "../../api";
import { FixedSizeList as List } from "react-window";
import './styles.css';


const imageHost = "https://image.tmdb.org/t/p/original/";

export const Row = ({ title, path, isLarge }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  const handleOnClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          setTrailerUrl(url);
        })
        .catch((error) => {
          console.log("errorMovieTrailer", error);
        });
    }

  };

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      setMovies(() => data?.results);

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  const Column = ({ index, style }) => (
    <div style={!isLarge ? style : { ...style, width: "416px" }}>
      <img
        className={!isLarge ? "movie-card" : "movie-card-large"}
        onClick={() => handleOnClick(movies[index])}
        key={movies[index].id}
        src={`${imageHost}${isLarge ? movies[index].backdrop_path : movies[index].poster_path}`}
        alt={movies[index].title}
      />
    </div>
  );

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        <List
          className="list-container"
          height={isLarge ? 300 : 180}
          itemCount={movies?.length}
          itemSize={isLarge ? 416 : 100}
          layout="horizontal"
          width={1400}
        >
          {Column}
        </List>
      </div>
      {trailerUrl && <ReactPlayer url={trailerUrl} playing={true} />}
    </div>
  );
};