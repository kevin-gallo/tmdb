import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const isMounted = useRef(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const delay = setTimeout(() => {
      if(query.trim() === "") {
        onSearch("");
      }
    }, 1000);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto animate-fade-in my-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="search-input pr-14"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-glow"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;