import { Calendar } from "lucide-react";

interface MovieCardProps {
  title: string;
  releaseDate: string;
  posterUrl: string;
}

export default function MovieCard({ title, releaseDate, posterUrl }: MovieCardProps) {
  const formattedDate = new Date(releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="movie-card group overflow-hidden h-[500px] flex flex-col animate-scale-in">
      <div className="relative overflow-hidden bg-secondary/30">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};