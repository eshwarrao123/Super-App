import { useEffect, useCallback } from "react";

const PLACEHOLDER_POSTER =
  "https://via.placeholder.com/300x445/1a1a2e/ffffff?text=No+Poster";

const MovieModal = ({ movie, loading, onClose }) => {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent background scroll
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const poster =
    movie?.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : PLACEHOLDER_POSTER;

  return (
    <div
      className="movie-modal__overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Movie details"
      onClick={onClose}
    >
      <div
        className="movie-modal"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        {/* Close button */}
        <button
          className="movie-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {loading ? (
          <div className="movie-modal__loading">
            <span className="movie-modal__spinner" />
            <p>Loading details…</p>
          </div>
        ) : !movie ? (
          <div className="movie-modal__loading">
            <p>Could not load movie details.</p>
          </div>
        ) : (
          <div className="movie-modal__content">
            {/* Poster */}
            <div className="movie-modal__poster-wrap">
              <img
                src={poster}
                alt={movie.Title}
                className="movie-modal__poster"
                onError={(e) => { e.target.src = PLACEHOLDER_POSTER; }}
              />
            </div>

            {/* Details */}
            <div className="movie-modal__details">
              <h2 className="movie-modal__title">{movie.Title}</h2>

              <div className="movie-modal__badges">
                {movie.Rated && movie.Rated !== "N/A" && (
                  <span className="movie-modal__badge">{movie.Rated}</span>
                )}
                {movie.Year && movie.Year !== "N/A" && (
                  <span className="movie-modal__badge">{movie.Year}</span>
                )}
                {movie.Runtime && movie.Runtime !== "N/A" && (
                  <span className="movie-modal__badge">{movie.Runtime}</span>
                )}
              </div>

              {movie.Genre && movie.Genre !== "N/A" && (
                <p className="movie-modal__genre">{movie.Genre}</p>
              )}

              {/* Rating */}
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="movie-modal__rating">
                  <span className="movie-modal__star">★</span>
                  <span className="movie-modal__rating-val">
                    {movie.imdbRating}
                  </span>
                  <span className="movie-modal__rating-max">/10 IMDb</span>
                </div>
              )}

              {/* Plot */}
              {movie.Plot && movie.Plot !== "N/A" && (
                <p className="movie-modal__plot">{movie.Plot}</p>
              )}

              {/* Meta rows */}
              <dl className="movie-modal__meta">
                {movie.Director && movie.Director !== "N/A" && (
                  <>
                    <dt>Director</dt>
                    <dd>{movie.Director}</dd>
                  </>
                )}
                {movie.Actors && movie.Actors !== "N/A" && (
                  <>
                    <dt>Cast</dt>
                    <dd>{movie.Actors}</dd>
                  </>
                )}
                {movie.Released && movie.Released !== "N/A" && (
                  <>
                    <dt>Released</dt>
                    <dd>{movie.Released}</dd>
                  </>
                )}
                {movie.Language && movie.Language !== "N/A" && (
                  <>
                    <dt>Language</dt>
                    <dd>{movie.Language}</dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
