import { useState, useEffect, useRef, useCallback } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
const MAX_H = 99;
const MAX_M = 59;
const MAX_S = 59;

// ─── SVG circular progress ring ──────────────────────────────────────────────
const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const Ring = ({ progress }) => {
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  return (
    <svg className="timer-ring" viewBox="0 0 160 160" aria-hidden="true">
      {/* Track */}
      <circle
        cx="80" cy="80" r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="8"
      />
      {/* Progress arc */}
      <circle
        cx="80" cy="80" r={RADIUS}
        fill="none"
        stroke="#f0717a"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 80 80)"
        style={{ transition: "stroke-dashoffset 0.9s linear" }}
      />
    </svg>
  );
};

// ─── Spin button (▲ / ▼) ─────────────────────────────────────────────────────
const SpinBtn = ({ direction, onClick, disabled }) => (
  <button
    className={`timer__spin timer__spin--${direction}`}
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "up" ? "Increase" : "Decrease"}
  >
    {direction === "up" ? "▲" : "▼"}
  </button>
);

// ─── Main component ───────────────────────────────────────────────────────────
const TimerWidget = () => {
  // Input values (what the user sets before starting)
  const [inputH, setInputH] = useState(5);
  const [inputM, setInputM] = useState(9);
  const [inputS, setInputS] = useState(0);

  // Countdown state
  const [remaining, setRemaining]   = useState(null);  // null = not started
  const [totalSecs,  setTotalSecs]  = useState(0);
  const [running,    setRunning]    = useState(false);
  const [done,       setDone]       = useState(false);

  const intervalRef = useRef(null);

  // Derived: seconds left
  const secondsLeft = remaining ?? (inputH * 3600 + inputM * 60 + inputS);
  const progress    = totalSecs > 0 ? secondsLeft / totalSecs : 1;

  // Display digits
  const displayH = Math.floor(secondsLeft / 3600);
  const displayM = Math.floor((secondsLeft % 3600) / 60);
  const displayS = secondsLeft % 60;
  const pad = (n) => String(n).padStart(2, "0");

  // ── Timer tick ───────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    setRemaining((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current);
        setRunning(false);
        setDone(true);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  // Start autoplay when running changes
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, tick]);

  // Auto-hide done notification
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 4000);
    return () => clearTimeout(t);
  }, [done]);

  // ── Controls ─────────────────────────────────────────────────────────────
  const handleStart = () => {
    const total = inputH * 3600 + inputM * 60 + inputS;
    if (total === 0) return;
    setTotalSecs(total);
    setRemaining(total);
    setDone(false);
    setRunning(true);
  };

  const handlePause  = () => setRunning(false);
  const handleResume = () => setRunning(true);

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(null);
    setDone(false);
  };

  const notStarted = remaining === null;
  const paused     = !running && remaining !== null && remaining > 0;
  const finished   = remaining === 0;

  // ── Spin helpers (only allowed when not running) ─────────────────────────
  const spin = (setter, max) => ({
    up:   () => setter((v) => (v < max ? v + 1 : 0)),
    down: () => setter((v) => (v > 0 ? v - 1 : max)),
  });
  const hSpin = spin(setInputH, MAX_H);
  const mSpin = spin(setInputM, MAX_M);
  const sSpin = spin(setInputS, MAX_S);

  return (
    <div className="timer-widget" role="timer" aria-label="Countdown timer">

      {/* Done notification banner */}
      {done && (
        <div className="timer-widget__done" role="alert">
          ⏰ Time&apos;s up!
        </div>
      )}

      <div className="timer-widget__body">
        {/* ── Left: ring + digital display ─────────────────────────── */}
        <div className="timer-widget__ring-wrap">
          <Ring progress={progress} />
          <span className="timer-widget__digital" aria-live="polite">
            {pad(displayH)}:{pad(displayM)}:{pad(displayS)}
          </span>
        </div>

        {/* ── Right: spin inputs + action button ───────────────────── */}
        <div className="timer-widget__controls">
          {/* Column headers */}
          <div className="timer__col-headers">
            <span>Hours</span>
            <span>Minutes</span>
            <span>Seconds</span>
          </div>

          {/* Spin columns */}
          <div className="timer__cols">
            {/* Hours */}
            <div className="timer__col">
              <SpinBtn direction="up"   onClick={hSpin.up}   disabled={running} />
              <span className="timer__value">{pad(inputH)}</span>
              <SpinBtn direction="down" onClick={hSpin.down} disabled={running} />
            </div>

            <span className="timer__colon">:</span>

            {/* Minutes */}
            <div className="timer__col">
              <SpinBtn direction="up"   onClick={mSpin.up}   disabled={running} />
              <span className="timer__value">{pad(inputM)}</span>
              <SpinBtn direction="down" onClick={mSpin.down} disabled={running} />
            </div>

            <span className="timer__colon">:</span>

            {/* Seconds */}
            <div className="timer__col">
              <SpinBtn direction="up"   onClick={sSpin.up}   disabled={running} />
              <span className="timer__value">{pad(inputS)}</span>
              <SpinBtn direction="down" onClick={sSpin.down} disabled={running} />
            </div>
          </div>

          {/* Action buttons */}
          <div className="timer__actions">
            {notStarted && (
              <button className="timer__btn timer__btn--start" onClick={handleStart}>
                Start
              </button>
            )}
            {running && (
              <button className="timer__btn timer__btn--pause" onClick={handlePause}>
                Pause
              </button>
            )}
            {paused && (
              <>
                <button className="timer__btn timer__btn--start" onClick={handleResume}>
                  Resume
                </button>
                <button className="timer__btn timer__btn--reset" onClick={handleReset}>
                  Reset
                </button>
              </>
            )}
            {finished && (
              <button className="timer__btn timer__btn--reset" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
