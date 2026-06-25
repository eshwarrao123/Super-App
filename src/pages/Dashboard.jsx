import { useNavigate } from "react-router-dom";
import ProfileCard  from "../components/ProfileCard";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget    from "../components/NewsWidget";
import NotesWidget   from "../components/NotesWidget";
import TimerWidget   from "../components/TimerWidget";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <main className="dashboard">
      {/* ── Left column: Profile + Weather + Timer ──────────────── */}
      <div className="dashboard__left">
        <ProfileCard />
        <WeatherWidget />
        <TimerWidget />
      </div>

      {/* ── Middle column: Notes ─────────────────────────────────── */}
      <div className="dashboard__middle">
        <NotesWidget />
      </div>

      {/* ── Right column: News ───────────────────────────────────── */}
      <div className="dashboard__right">
        <NewsWidget />
      </div>

      {/* ── Browse button — bottom-right corner ──────────────────── */}
      <button
        className="dashboard__browse-btn"
        onClick={() => navigate("/movies")}
        aria-label="Browse movies"
      >
        Browse
      </button>
    </main>
  );
};

export default Dashboard;

