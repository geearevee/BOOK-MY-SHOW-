import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../../api";
import startImage from "../../assets/star.png";
import heartWhite from "../../assets/heart_white.png";
import heart from "../../assets/heart.png";
import useAppContext from "../../useAppContext";
import {
    addToUsesFavorites,
    ifFavorite,
    removeFavoriteFromUser,
} from "../../databse";
const MovieDetail = () => {
    const navigate = useNavigate();
    let { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { user } = useAppContext();
    async function makeFavorite() {
        if (!user) return;
        console.log("make favorite");
        let result = await addToUsesFavorites(movie, user);
        if (result) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }
    async function removeFavorite() {
        if (!user) return;
        console.log("remove favorite");
        let result = await removeFavoriteFromUser(movie, user);
        if (result) {
            setIsFavorite(false);
        }
        // else {
        //     setIsFavorite(true);
        // }
    }
    async function fetchMovie() {
        let { data, error } = await getMovieById(movieId);
        if (!error) {
            console.log(data);
            setMovie(data);
        } else {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchMovie();
    }, []);
    useEffect(() => {
        if (user && movie) {
            ifFavorite(movie, user, (isFav) => {
                setIsFavorite(isFav);
            });
        }
    }, [user, movie]);
    return (
        <div className="movie-detail">
            {movie && (
                <>
                    <div
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                        }}
                        className="movie-details-primary"
                    >
                        <div className="movie-details-image-container">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt=""
                            />
                        </div>
                        <div className="movie-details">
                            <h2 className="movie-details-title">
                                {movie.original_title}
                            </h2>
                            <h3 className="movie-details-rating">
                                <img src={startImage} alt="star" />
                                {movie.vote_average}/10{" "}
                                <span className="movie-details-vote-count">
                                    {movie.vote_count} votes
                                </span>
                            </h3>
                            <p className="movie-details-in-theaters">
                                2D, MX4D, 4DX, ICE, 2D SCREEN X, IMAX 2D
                            </p>
                            <p className="movie-details-auxillary">
                                english{" "}
                                {movie["genres"]
                                    .map((genre) => genre.name)
                                    .join(", ")}{" "}
                                {movie.runtime} min.
                            </p>
                            <div className="book-and-favorite">
                                <button
                                    onClick={() =>
                                        navigate(`/movieBooking/${movieId}`)
                                    }
                                >
                                    Book ticket
                                </button>
                                {isFavorite ? (
                                    <img
                                        src={heart}
                                        alt="heart"
                                        onClick={removeFavorite}
                                    />
                                ) : (
                                    <img
                                        src={heartWhite}
                                        alt="not heart"
                                        className="heart"
                                        onClick={makeFavorite}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="movie-details-secondary">
                        <h1>About the movie</h1>
                        <p className="movie-details-overview">
                            {movie.overview}
                        </p>
                        <p className="movie-details-tagline">
                            {movie.tagline}...
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieDetail;
