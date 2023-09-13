import { useState, useEffect } from "react";
import useAppContext from "../../useAppContext";
import { getUserFavorites } from "../../databse";
import { getMovieById } from "../../api";
import MovieCard from "../components/MovieCard";
import favimg from "../../assets/nofav.png";
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const { user } = useAppContext();
  useEffect(() => {
    try {
      (async function () {
        if (favorites.length > 0) {
          let moviesArray = [];
          for (const favorite of favorites) {
            console.log("look here", favorite);
            let { data, error } = await getMovieById(favorite);
            if (!error) {
              moviesArray.push(data);
            }
          }
          setMovies(moviesArray);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [favorites]);
  useEffect(() => {
    try {
      (async function () {
        if (user) {
          let result = await getUserFavorites(user);
          if (result) {
            setFavorites(result);
          }
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="favorites-page">
      {movies.length > 0 ? (
        movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })
      ) : (
        <img src={favimg} className="nofavimg" />
      )}
    </div>
  );
};

export default Favorites;
