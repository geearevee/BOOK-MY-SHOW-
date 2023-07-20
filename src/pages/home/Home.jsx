import MovieCard from "../components/MovieCard";
import useAppContext from "../../useAppContext";
const Home = () => {
    const { movies } = useAppContext();
    return (
        <div className="home">
            {movies.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
            })}
        </div>
    );
};

export default Home;
