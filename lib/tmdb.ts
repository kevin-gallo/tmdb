/**
 * TMDB API interaction module
 * Provides functions to fetch movie data from The Movie Database (TMDB) API.
 * @module tmdb
 * @author Harrie Kevin Gallo
 * @license MIT
 * @see {@link https://www.themoviedb.org/documentation/api|TMDB API Documentation}
 * @version 1.0.0
 * @return {Object} An object containing functions to interact with the TMDB API.
 */

export async function fetchMovies() {
    const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!baseUrl || !apiKey) {
        throw new Error("TMDB_BASE_URL and TMDB_API_KEY must be set in environment variables.");
    }

    const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const limit = 20; // Set the number of movies to return
        const movies = data.results.slice(0, limit).map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            posterUrl: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
        }));

        return movies;

    } catch (error) {
        console.error("Error fetching movies from TMDB:", error);
        throw error;
    }
}