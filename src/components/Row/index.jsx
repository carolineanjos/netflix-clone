import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { getMovies } from "../../api";
import { FixedSizeList as List } from "react-window";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import './styles.css';


const imageHost = "https://image.tmdb.org/t/p/original/";

export const Row = ({ title, path, isLarge }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const ref = useRef();

  const movieCardWidth = isLarge ? 416 : 110;
  const listWidth = 1470;


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


  const maxScrollPosition = (movies.length * movieCardWidth) - listWidth;

  const toScroll = (scrollOffset) => {
    const newScrollPosition = scrollPosition + scrollOffset;

    if (newScrollPosition < 0) {
      setScrollPosition(0);
      ref.current.scrollTo(0);

      setIsLeftDisabled(true);
      setIsRightDisabled(false);

    } else if (newScrollPosition > maxScrollPosition) {
      setScrollPosition(maxScrollPosition);
      ref.current.scrollTo(maxScrollPosition);

      setIsLeftDisabled(false);
      setIsRightDisabled(true);

    } else {
      setScrollPosition(newScrollPosition);
      ref.current.scrollTo(newScrollPosition);

      setIsLeftDisabled(false);
      setIsRightDisabled(false);
    }


  };

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        {!isLeftDisabled &&
          <button
            onClick={() => toScroll(-1000)}
            className={isLarge ? "arrow-left-button-large-cards" : "arrow-left-button-cards"}
          >
            <MdKeyboardArrowLeft size={isLarge ? 90 : 70} />
          </button>
        }
        <List
          className="list-container"
          height={isLarge ? 300 : 200}
          itemCount={movies?.length}
          itemSize={movieCardWidth}
          layout="horizontal"
          width={listWidth}
          ref={ref}
          scrollToItem={scrollPosition / listWidth}
        >
          {Column}
        </List>
        {!isRightDisabled &&
          <button
            onClick={() => toScroll(1000)}
            className={isLarge ?
              ("arrow-left-button-large-cards" && "arrow-right-button-large-cards") :
              ("arrow-left-button-cards" && "arrow-right-button-cards")}

          >
            <MdKeyboardArrowRight size={isLarge ? 90 : 70} />
          </button>
        }
      </div>
      {trailerUrl && <ReactPlayer url={trailerUrl} playing={true} />}
    </div>
  );
};