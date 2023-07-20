import { useEffect, useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../../api";

const Checkout = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [movie, setMovie] = useState(null);
    let { movieId } = useParams();
    const seatsSelected = searchParams.get("seatsSelected")?.split(",");
    console.log(seatsSelected);
    async function fetchMovie() {
        let { data, error } = await getMovieById(movieId);
        if (!error) {
            console.log(data);
            setMovie(data);
        } else {
            console.log(error);
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        alert("Booking Success");
        navigate("/");
    }
    useEffect(() => {
        fetchMovie();
    }, []);
    return (
        <div className="checkout-page">
            <div className="left-column">
                {movie && (
                    <>
                        <div className="movie-checkout-primary">
                            <h2 className="movie-checkout-title">
                                {movie.original_title}
                            </h2>
                            <div className="movie-checkout-image-container">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt=""
                                />
                            </div>
                            <div className="movie-checkout">
                                <p className="movie-checkout-overview">
                                    {movie.overview}
                                </p>
                                <p className="movie-checkout-tagline">
                                    {movie.tagline}...
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="right-column">
                <h2 className="booking-summary-title">Booking Summary</h2>
                <div className="booking-summary-row">
                    <p className="booking-summary-label">
                        Gold-C-11 ( {seatsSelected.length} Ticket )
                    </p>
                    <p className="booking-summary-price">
                        {" "}
                        Rs. {120 * seatsSelected.length}.00
                    </p>
                </div>
                <div className="booking-summary-row">
                    <p className="booking-summary-label">convenience fees</p>
                    <p className="booking-summary-price"> Rs. 30.00</p>
                </div>
                <div className="booking-summary-row">
                    <p className="booking-summary-label">seats Booked</p>
                    <p className="booking-summary-price">
                        {seatsSelected?.join(", ")}
                    </p>
                </div>
                <div className="booking-summary-row final">
                    <p className="booking-summary-label">Amount Payable</p>
                    <p className="booking-summary-price">
                        Rs {120 * seatsSelected.length + 30}.00
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="checkout-form">
                    <input
                        required
                        placeholder="enter you upi id"
                        type="text"
                    />
                    <button>Pay Now</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
