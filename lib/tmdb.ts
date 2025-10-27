/**
 * TMDB API interaction module
 * Provides functions to fetch movie data from The Movie Database (TMDB) API.
 * @module tmdb
 * @author Harrie Kevin Gallo
 * @license MIT
 * @see {@link https://www.themoviedb.org/documentation/api|TMDB API Documentation}
 * @version 1.0.0
 * @return {Array - Object || any[]} Array of objects containing movie details.
 */

export async function fetchMovies(page: number = 1): Promise<any[] | undefined> {
    const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!baseUrl || !apiKey) {
        console.error('TMDB_BASE_URL and TMDB_API_KEY must be set in environment variables. ')
        return []; // Return an empty array if baseUrl or apiKey is not set
    }

    const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

        const response = await fetch(url);
        if (!response.ok) {
            console.log('response status: ', response.status)
        }

        const data = await response.json();
        const movies = data.results.map((movie: any) => ({
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
    }
}

/**
 * @param query {string} query - The search term to filter movies.
 * @param page {number} [page=1] - The page number for pagination (default is 1).
 * @returns Array of movie objects matching the search query.
 */

export async function searchMovies( query: string, page: number = 1): Promise<any[] | undefined> {
    const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!baseUrl || !apiKey) {
        console.error('TMDB_BASE_URL and TMDB_API_KEY must be set in environment variables. ')
        return [];
    }

    const url = `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`;

    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

        const response = await fetch(url);
        if (!response.ok) {
            console.error('response status: ', response.status)
        }

        const data = await response.json();
        const movies = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            posterUrl: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
        }));

        return movies;

    } catch (error) {
        console.error("Error searching movies from TMDB:", error);
    }
}
