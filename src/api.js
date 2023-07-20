const API_KEY = "07863069e273489cb378459a7868514e";
export async function getMovies() {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`;
    try {
        let result = await fetch(url);
        result = await result.json();
        return { data: result, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export async function getGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    try {
        let result = await fetch(url);
        result = await result.json();
        return { data: result, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export async function getMovieByGenre(genreId) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    try {
        let result = await fetch(url);
        result = await result.json();
        return { data: result, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export async function getMovieById(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    try {
        let result = await fetch(url);
        result = await result.json();
        return { data: result, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}
export async function getMoviesByQuery(query) {
    // https://api.themoviedb.org/3/search/movie?query=war&include_adult=false&language=en-US&page=1
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    try {
        let result = await fetch(url);
        result = await result.json();
        return { data: result, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}
