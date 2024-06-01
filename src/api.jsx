const API_KEY = "860a4477d6c95bca17367dd503797769";

const categories = [
  {
    name: "trending",
    title: "Em alta",
    path: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
    isLarge: true,
  },
  {
    name: "netflixOriginals",
    title: "Originais Netflix",
    path: `/discover/movie?api_key=${API_KEY}`,
    isLarge: false,

  },
  {
    name: "TopRated",
    title: "Populares",
    path: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    isLarge: false,
  },
  {
    name: "comedy",
    title: "Comédias",
    path: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    isLarge: false,
  },
  {
    name: "romances",
    title: "Romances",
    path: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    isLarge: false,
  },
  {
    name: "crimes",
    title: "Crimes",
    path: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
    isLarge: false,
  },
];

export const getMovies = async (path) => {
  try {
    let url = `https://api.themoviedb.org/3${path}`;

    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
};


export default categories;