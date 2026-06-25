import { memo } from "react";

const PLACEHOLDER_POSTER =
  "https://via.placeholder.com/300x445/1a1a2e/ffffff?text=No+Poster";

const MovieCard = memo(({ movie, onClick }) => {
  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_POSTER;

  return (
    <div
      className="movie-card"
      onClick={() => onClick(movie.imdbID)}
      role="button"
      tabIndex={0}
      aria-label={`${movie.Title} (${movie.Year})`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(movie.imdbID);
      }}
    >
      <div className="movie-card__img-wrap">
        <img
          src={poster}
          alt={movie.Title}
          className="movie-card__img"
          loading="lazy"
          onError={(e) => {
            e.target.src = PLACEHOLDER_POSTER;
          }}
        />
      </div>
    </div>
  );
});

MovieCard.displayName = "MovieCard";
export default MovieCard;
