/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movieDetail/${movie.id}`} className="movie-card">
            <img
                className="movie-card-img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="movie_details">
                <p>{movie.original_title}</p>
                <p>{movie.vote_average}</p>
            </div>
        </Link>
    );
};

export default MovieCard;
