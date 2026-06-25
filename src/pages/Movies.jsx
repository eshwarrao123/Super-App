import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { searchMovies, fetchMovieDetails } from "../services/apiServices";
import CATEGORIES from "../data/categories";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import avatarImg from "../assets/page3boy.png";
import "./Movies.css";

// ── Search keyword map: category id → OMDB search term ───────────────────────
const CATEGORY_SEARCH_MAP = {
  action:   "action hero",
  drama:    "drama 2022",
  romance:  "romance love",
  thriller: "thriller suspense",
  western:  "western cowboy",
  horror:   "horror scary",
  fantasy:  "fantasy magic",
  music:    "music concert",
  fiction:  "science fiction space",
};

const Movies = () => {
  const navigate       = useNavigate();
  const user           = useStore((s) => s.user);
  const selectedCats   = useStore((s) => s.categories);

  const [categoryMovies, setCategoryMovies] = useState({});  // { catId: [movie,...] }
  const [loadingCats,    setLoadingCats]    = useState({});  // { catId: bool }
  const [modalMovieId,   setModalMovieId]   = useState(null);
  const [modalData,      setModalData]      = useState(null);
  const [modalLoading,   setModalLoading]   = useState(false);

  // ── Fetch all selected categories in parallel ─────────────────────────────
  useEffect(() => {
    if (selectedCats.length === 0) return;

    // Mark all as loading
    const initLoading = Object.fromEntries(selectedCats.map((id) => [id, true]));
    setLoadingCats(initLoading);

    // Fire all requests simultaneously
    const requests = selectedCats.map(async (catId) => {
      try {
        const keyword = CATEGORY_SEARCH_MAP[catId] ?? catId;
        const movies  = await searchMovies(keyword);
        return [catId, movies.slice(0, 8)];
      } catch {
        return [catId, []];
      }
    });

    Promise.all(requests).then((results) => {
      const moviesMap   = Object.fromEntries(results);
      const loadingDone = Object.fromEntries(selectedCats.map((id) => [id, false]));
      setCategoryMovies(moviesMap);
      setLoadingCats(loadingDone);
    });
  }, [selectedCats]);

  // ── Modal: open + fetch full details ─────────────────────────────────────
  const handleCardClick = useCallback(async (imdbID) => {
    setModalMovieId(imdbID);
    setModalData(null);
    setModalLoading(true);
    try {
      const details = await fetchMovieDetails(imdbID);
      setModalData(details);
    } catch {
      setModalData(null);
    } finally {
      setModalLoading(false);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalMovieId(null);
    setModalData(null);
  }, []);

  // ── Label map for display ─────────────────────────────────────────────────
  const labelMap = Object.fromEntries(
    CATEGORIES.map((c) => [c.id, c.label])
  );

  return (
    <div className="movies-page">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="movies-page__header">
        <button
          className="movies-page__logo"
          onClick={() => navigate("/dashboard")}
          aria-label="Go back to dashboard"
        >
          Super app
        </button>

        <div className="movies-page__avatar-wrap">
          <img
            src={avatarImg}
            alt={user.name || "User avatar"}
            className="movies-page__avatar"
          />
        </div>
      </header>

      {/* ── Hero heading ─────────────────────────────────────────────────── */}
      <h1 className="movies-page__heading">
        Entertainment according to your choice
      </h1>

      {/* ── Category rows ────────────────────────────────────────────────── */}
      <div className="movies-page__categories">
        {selectedCats.length === 0 ? (
          <p className="movies-page__empty">
            No categories selected. Go back and pick some!
          </p>
        ) : (
          selectedCats.map((catId) => {
            const movies  = categoryMovies[catId] ?? [];
            const loading = loadingCats[catId] ?? true;
            const label   = labelMap[catId] ?? catId;

            return (
              <section key={catId} className="movies-section">
                <h2 className="movies-section__title">{label}</h2>

                <div className="movies-section__row">
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="movie-card movie-card--skeleton" />
                      ))
                    : movies.length === 0
                    ? <p className="movies-section__empty">No movies found.</p>
                    : movies.map((movie) => (
                        <MovieCard
                          key={movie.imdbID}
                          movie={movie}
                          onClick={handleCardClick}
                        />
                      ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {modalMovieId && (
        <MovieModal
          movie={modalData}
          loading={modalLoading}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Movies;
