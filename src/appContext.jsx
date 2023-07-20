import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { getMovies, getGenres } from "./api";
export const appContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextWrapper = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [genres, setGenres] = useState([]);
    const value = {
        movies,
        setMovies,
        user,
        setUser,
        genres,
        setGenres,
    };

    async function fetchMovies() {
        const { data, error } = await getMovies();
        if (!error) {
            setMovies(data["results"]);
        }
    }
    async function fetchGenres() {
        const { data, error } = await getGenres();
        if (!error) {
            setGenres(data["genres"]);
        }
    }
    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);
    return <appContext.Provider value={value}>{children}</appContext.Provider>;
};
AppContextWrapper.prototype = {
    children: React.ReactNode,
};

export default AppContextWrapper;
