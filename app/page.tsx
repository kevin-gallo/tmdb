'use client';

import { useState, useEffect } from "react";
import { fetchMovies } from "@/lib/tmdb";

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
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const fetchedMovies = await fetchMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
  }, []);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      setMovies([]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen px-6 pt-6 pb-20 md:px-20 relative overflow-hidden">
      {/* Floating Background Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ y: [10, -15, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      {/* Header */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <Header />
      </motion.div>

      {/* Search Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-16 relative z-10">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        <p className="text-base text-center text-muted-foreground mt-2">
          Search through millions of movies and discover your next favorite film
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
          {isLoading
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
    </div>
  );
}
