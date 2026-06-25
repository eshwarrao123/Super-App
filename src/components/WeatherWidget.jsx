import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../services/apiServices";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());

  // Tick clock every second
  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    fetchCurrentWeather("London")
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 401) {
          setError("Weather API key is invalid or not yet activated.");
        } else {
          setError("Failed to load weather. Please try again later.");
        }
        setLoading(false);
      });
  }, []);

  const formatDate = (d) => {
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    const yyyy = d.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  };

  const formatTime = (d) => {
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };

  // Use OpenWeatherMap's official icon CDN
  const getIconUrl = (iconCode) =>
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-widget">
      {/* ── Pink date/time bar ──────────────────────────────────── */}
      <div className="weather-widget__bar">
        <span className="weather-widget__date">{formatDate(now)}</span>
        <span className="weather-widget__time">{formatTime(now)}</span>
      </div>

      {/* ── Stats body ──────────────────────────────────────────── */}
      <div className="weather-widget__body">
        {loading && (
          <p className="weather-widget__status">Loading weather…</p>
        )}

        {error && (
          <p className="weather-widget__status weather-widget__status--error">
            ⚠ {error}
          </p>
        )}

        {!loading && !error && weather && (
          <>
            {/* Icon + condition */}
            <div className="weather-widget__icon-col">
              {weather.weather?.[0]?.icon ? (
                <img
                  src={getIconUrl(weather.weather[0].icon)}
                  alt={weather.weather[0].description}
                  className="weather-widget__icon-img"
                />
              ) : (
                <span className="weather-widget__icon">🌤</span>
              )}
              <span className="weather-widget__condition">
                {weather.weather?.[0]?.description ?? "—"}
              </span>
            </div>

            <div className="weather-widget__divider" />

            {/* Temperature + Pressure */}
            <div className="weather-widget__temp-col">
              <span className="weather-widget__temp">
                {Math.round(weather.main?.temp ?? 0)}°C
              </span>
              <div className="weather-widget__stat">
                <span className="weather-widget__stat-icon">🌡</span>
                <div>
                  <span className="weather-widget__stat-value">
                    {weather.main?.pressure ?? "—"} mbar
                  </span>
                  <small>Pressure</small>
                </div>
              </div>
            </div>

            <div className="weather-widget__divider" />

            {/* Wind + Humidity */}
            <div className="weather-widget__extra-col">
              <div className="weather-widget__stat">
                <span className="weather-widget__stat-icon">💨</span>
                <div>
                  <span className="weather-widget__stat-value">
                    {weather.wind?.speed ?? "—"} km/h
                  </span>
                  <small>Wind</small>
                </div>
              </div>
              <div className="weather-widget__stat">
                <span className="weather-widget__stat-icon">💧</span>
                <div>
                  <span className="weather-widget__stat-value">
                    {weather.main?.humidity ?? "—"}%
                  </span>
                  <small>Humidity</small>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
