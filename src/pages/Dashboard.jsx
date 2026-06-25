import ProfileCard from "../components/ProfileCard";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <main className="dashboard">
      {/* ── Left column: Profile + Weather ─────────────────────── */}
      <div className="dashboard__left">
        <ProfileCard />
        <WeatherWidget />
      </div>

      {/* ── Right column: News ─────────────────────────────────── */}
      <div className="dashboard__right">
        <NewsWidget />
      </div>
    </main>
  );
};

export default Dashboard;
