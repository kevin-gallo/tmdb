'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchMovies, searchMovies } from "@/lib/tmdb";

// Components
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { Header } from "@/components/Header";
import MovieCardLoader from "@/components/MovieCardLoader";

// Animation
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] as any }, // 👈 cast to any
  },
};

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const isSearching = query.trim().length > 0;

  const loadMovies = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const fetchedMovies = isSearching ? await searchMovies(query, page) : await fetchMovies(page);
      if (fetchedMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => {
          const combined = [...prevMovies, ...fetchedMovies];
          const unique = Array.from(new Map(combined.map(m => [m.id, m])).values());
          return unique;
        });

        setPage((prevPage) => prevPage + 1);
      }

    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, isSearching, query]);



  // ✅ Initial popular movies load
  useEffect(() => {
    if (!isSearching && movies.length === 0) {
      loadMovies();
    }
  }, [isSearching, loadMovies]);

  // ✅ Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current || isLoading || movies.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // only trigger when element is fully visible and user has scrolled down
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMovies();
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px", // no early trigger
        threshold: 1.0, // only fire when loader is fully visible
      }
    );
    
    observer.observe(loaderRef.current);

    return () => observer.disconnect();

  }, [hasMore, isLoading, loadMovies]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setMovies([]);
    setHasMore(true);

    if (newQuery.trim() === "") {
      (async () => {
        setIsLoading(true);
        try {
          const popularMovies = await fetchMovies(1);
          setMovies(popularMovies);
        } catch (error) {
          console.error("Failed to load popular movies:", error);
        } finally {
          setIsLoading(false);
        }
      })();
      return;
    }

    setIsLoading(true);

    (async () => {
      try {
        const searchedMovies = await searchMovies(newQuery, 1);
        setMovies(searchedMovies);
        if (searchedMovies.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to search movies:", error);
      } finally {
        setIsLoading(false);
      }
    }) ();
  };

  const isInitialLoad = movies.length === 0 && isLoading;

  return (
    <>
       {/* Header */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="sticky top-0 z-50">
        <Header />
      </motion.div>
      <div className="min-h-screen px-6 pt-6 pb-20 md:px-20 relative">

      {/* Search Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-16 relative z-10">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        <p className="text-base text-center text-muted-foreground mt-2">
          {isSearching
            ? `Results for “${query}”`
            : "Search through millions of movies and discover your next favorite film"}
        </p>
      </motion.div>

      {/* Results Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {isLoading ? "Loading..." : `Found ${movies.length} movies`}
          </h2>
        </div>

      {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {isInitialLoad
            ? Array.from({ length: 8 }).map((_, i) => (
                <motion.div key={i} variants={fadeIn} initial="hidden" animate="visible">
                  <MovieCardLoader />
                </motion.div>
              ))
            : movies.map((movie) => (
                <motion.div
                  key={movie.id}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MovieCard
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    posterUrl={movie.posterUrl}
                  />
                </motion.div>
              ))}
        </div>
      </motion.div>

      {/* Infinite Scroll Loader */}
      <div ref={loaderRef} className="mt-12 mb-24">
        {!isInitialLoad && isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <MovieCardLoader key={`loader-${i}`} />
            ))}
          </div>
        )}
        {!hasMore && (
          <p className="text-muted-foreground text-center mt-6">
            No movies found. 🎬
          </p>
        )}
      </div>
    </div>
    </>
  );
}
