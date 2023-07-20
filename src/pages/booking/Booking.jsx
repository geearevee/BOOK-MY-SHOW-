import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import theaterImage from "../../assets/theater.png";
const Booking = () => {
    const navigate = useNavigate();
    const [seats, setSeats] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    let { movieId } = useParams();
    function handleCheckoutClick() {
        navigate(
            `/checkout/${movieId}?seatsSelected=${selectedSeats.join(",")}`
        );
    }
    function handleSeatClick(seat) {
        if (seat.status === "booked") return;
        if (seat.status === "selected") {
            let newSeats = seats.filter(
                (currentSeat) => currentSeat.seatNo !== seat.seatNo
            );
            newSeats.push({
                ...seat,
                status: "available",
            });
            newSeats = newSeats.sort((a, b) => a.seatNo - b.seatNo);
            setSelectedSeats((prevSelected) => {
                return prevSelected.filter((item) => item !== seat.seatNo);
            });
            setSeats(newSeats);
        } else {
            let newSeats = seats.filter(
                (currentSeat) => currentSeat.seatNo !== seat.seatNo
            );
            newSeats.push({
                ...seat,
                status: "selected",
            });
            newSeats = newSeats.sort((a, b) => a.seatNo - b.seatNo);
            setSelectedSeats((prevSelected) => [...prevSelected, seat.seatNo]);
            setSeats(newSeats);
        }
    }
    useEffect(() => {
        let initialSeats = [];
        for (let i = 0; i < 60; i++) {
            initialSeats.push({
                seatNo: i + 1,
                status: "available",
            });
            setSeats(initialSeats);
        }
    }, []);
    // useEffect(()=> {

    // },[selectedSeats])
    return (
        <>
            <div className="movie-booking">
                <div className="movie-booking-letters">
                    <p>A</p>
                    <p>B</p>
                    <p>C</p>
                    <p>D</p>
                    <p>E</p>
                    <p>F</p>
                </div>
                <div className="movie-booking-seats">
                    {seats &&
                        seats.map((seat, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`seat ${seat.status}`}
                                    onClick={() => handleSeatClick(seat)}
                                >
                                    {seat.seatNo}
                                </div>
                            );
                        })}
                </div>
            </div>
            <img className="theater-image" src={theaterImage} alt="theater" />
            {selectedSeats.length > 0 && (
                <button
                    className="proceed_checkout"
                    onClick={handleCheckoutClick}
                >
                    Proceed to checkout
                </button>
            )}
        </>
    );
};

export default Booking;
