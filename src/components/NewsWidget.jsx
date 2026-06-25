import { useEffect, useState, useRef, useCallback, memo } from "react";
import { fetchTopHeadlines } from "../services/apiServices";

const AUTOPLAY_DELAY = 3000;    // 3 s between slides
const TRANSITION_MS  = 450;     // match CSS transition duration

// ─── Slide directions ───────────────────────────────────────────────────────
const DIR = { NEXT: "next", PREV: "prev" };

// ─── Format date helper (unchanged logic) ───────────────────────────────────
const formatArticleDate = (iso) => {
  if (!iso) return "—";
  const d  = new Date(iso);
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const yyyy = d.getFullYear();
  let h = d.getHours();
  const m  = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${mm}-${dd}-${yyyy} | ${h}:${m} ${ampm}`;
};

// ─── Single slide card (memoised to prevent re-renders of stable slides) ────
const NewsSlide = memo(({ article, className }) => (
  <div className={`news-widget__slide ${className}`} aria-live="polite">
    <div className="news-widget__img-wrap">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="news-widget__img"
        loading="lazy"
        onError={(e) => { e.target.style.display = "none"; }}
      />
    </div>

    <div className="news-widget__body">
      <h2 className="news-widget__title">{article.title}</h2>
      <p  className="news-widget__date">{formatArticleDate(article.publishedAt)}</p>
      <p  className="news-widget__desc">
        {article.description ?? article.content ?? "No description available."}
      </p>
    </div>
  </div>
));

NewsSlide.displayName = "NewsSlide";

// ─── Main component ─────────────────────────────────────────────────────────
const NewsWidget = () => {
  const [articles, setArticles]     = useState([]);
  const [current,  setCurrent]      = useState(0);
  const [direction, setDirection]   = useState(DIR.NEXT);
  const [animating, setAnimating]   = useState(false);
  const [loading,  setLoading]      = useState(true);
  const [error,    setError]        = useState(null);

  const intervalRef  = useRef(null);
  const hoverRef     = useRef(false);   // tracks hover without re-render
  const lockRef      = useRef(false);   // prevents overlapping transitions

  // ── Fetch articles once ──────────────────────────────────────────────────
  useEffect(() => {
    fetchTopHeadlines("general")
      .then((data) => {
        const valid = data.filter((a) => a.urlToImage && a.title);
        setArticles(valid);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load news.");
        setLoading(false);
      });
  }, []);

  // ── Preload the next image to eliminate flicker ──────────────────────────
  useEffect(() => {
    if (articles.length < 2) return;
    const nextIdx = (current + 1) % articles.length;
    const img = new Image();
    img.src = articles[nextIdx].urlToImage ?? "";
  }, [current, articles]);

  // ── Core navigate function ───────────────────────────────────────────────
  const navigate = useCallback((nextIdx, dir = DIR.NEXT) => {
    if (lockRef.current || articles.length === 0) return;
    lockRef.current = true;
    setDirection(dir);
    setAnimating(true);

    // After transition completes, swap the slide and unlock
    setTimeout(() => {
      setCurrent(nextIdx);
      setAnimating(false);
      lockRef.current = false;
    }, TRANSITION_MS);
  }, [articles.length]);

  // ── Autoplay timer ───────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    if (articles.length === 0) return;
    intervalRef.current = setInterval(() => {
      if (hoverRef.current) return;        // paused on hover — skip tick
      setCurrent((prev) => {
        const next = (prev + 1) % articles.length;
        navigate(next, DIR.NEXT);
        return prev;                       // actual update happens in navigate
      });
    }, AUTOPLAY_DELAY);
  }, [articles.length, navigate]);

  // Start timer when articles arrive; clean up on unmount
  useEffect(() => {
    if (articles.length === 0) return;
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [articles, startTimer]);

  // ── Dot click ────────────────────────────────────────────────────────────
  const goTo = useCallback((idx) => {
    const dir = idx > current ? DIR.NEXT : DIR.PREV;
    navigate(idx, dir);
    startTimer();          // restart autoplay from this point
  }, [current, navigate, startTimer]);

  // ── Keyboard navigation ──────────────────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowRight") {
      const next = (current + 1) % articles.length;
      navigate(next, DIR.NEXT);
      startTimer();
    } else if (e.key === "ArrowLeft") {
      const prev = (current - 1 + articles.length) % articles.length;
      navigate(prev, DIR.PREV);
      startTimer();
    }
  }, [current, articles.length, navigate, startTimer]);

  // ── Hover pause ──────────────────────────────────────────────────────────
  const handleMouseEnter = () => { hoverRef.current = true;  };
  const handleMouseLeave = () => { hoverRef.current = false; };

  // ── Guard states ─────────────────────────────────────────────────────────
  if (loading) return <div className="news-widget news-widget--loading"><p>Loading news…</p></div>;
  if (error)   return <div className="news-widget news-widget--error"><p>{error}</p></div>;
  if (articles.length === 0) return <div className="news-widget news-widget--empty"><p>No news available.</p></div>;

  const visibleCount = Math.min(articles.length, 8);

  // CSS animation class names based on state
  const slideClass = animating
    ? `news-widget__slide--exit-${direction}`
    : `news-widget__slide--enter-${direction}`;

  return (
    <div
      className="news-widget"
      role="region"
      aria-label="News carousel"
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {/* ── Viewport clip container ──────────────────────────────────── */}
      <div className="news-widget__viewport">
        <NewsSlide
          key={current}          // key forces remount → fresh animation state
          article={articles[current]}
          className={slideClass}
        />
      </div>

      {/* ── Pagination dots ──────────────────────────────────────────── */}
      <div className="news-widget__dots" aria-label="News pagination" role="tablist">
        {Array.from({ length: visibleCount }).map((_, i) => (
          <button
            key={i}
            role="tab"
            className={`news-widget__dot${i === current % visibleCount ? " news-widget__dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to article ${i + 1}`}
            aria-selected={i === current % visibleCount}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
