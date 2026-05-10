import React, { useState, useEffect, useRef } from 'react';

const DEMO_DATA = {
  heart_beats: 2628000000,
  breaths: 420000000,
  blinks: 210000000,
  milliseconds: 2628000000000,
  seconds: 2628000000,
  hours: 657000,
  sunsets: 27375,
  days: 27375,
  weeks: 3910,
  months: 900,
  seasons: 300,
  leap_years: 18,
};

// How much each metric increases per second (approximate real-life rates)
const RATES_PER_SECOND = {
  heart_beats:  1.167,   // ~70 beats/min
  breaths:      0.267,   // ~16 breaths/min
  blinks:       0.067,   // ~4 blinks/min (conservative avg)
  milliseconds: 1000,    // 1000ms per second
  seconds:      1,
  hours:        0,       // static
  sunsets:      0,
  days:         0,
  weeks:        0,
  months:       0,
  seasons:      0,
  leap_years:   0,
};

const LIVE_KEYS = new Set(['heart_beats', 'breaths', 'blinks', 'milliseconds', 'seconds']);

const formatNumber = (n) => Math.floor(n).toLocaleString('en-US');

const METRICS = [
  {
    key: 'heart_beats', label: 'Heart Beats', desc: 'pulses of life',
    color: '#FF6B6B', glow: '#EF4444',
    icon: 'https://img.icons8.com/fluency/96/like.png',
  },
  {
    key: 'breaths', label: 'Breaths', desc: 'inhales & exhales',
    color: '#93C5FD', glow: '#3B82F6',
    icon: 'https://img.icons8.com/fluency/96/wind.png',
  },
  {
    key: 'blinks', label: 'Blinks', desc: 'glimpses of the world',
    color: '#A78BFA', glow: '#7C3AED',
    icon: 'https://img.icons8.com/?size=100&id=13758&format=png&color=000000',
  },
  {
    key: 'milliseconds', label: 'Milliseconds', desc: 'tiny moments',
    color: '#FDE68A', glow: '#F59E0B',
    icon: 'https://img.icons8.com/fluency/96/lightning-bolt.png',
  },
  {
    key: 'seconds', label: 'Seconds', desc: 'ticks of the clock',
    color: '#6EE7B7', glow: '#10B981',
    icon: 'https://img.icons8.com/fluency/96/stopwatch.png',
  },
  {
    key: 'hours', label: 'Hours', desc: 'chapters of each day',
    color: '#FCA5A5', glow: '#EF4444',
    icon: 'https://img.icons8.com/?size=100&id=Hp8DzplEcRHa&format=png&color=000000',
  },
  {
    key: 'sunsets', label: 'Sunsets', desc: 'golden horizons',
    color: '#FDBA74', glow: '#F97316',
    icon: 'https://img.icons8.com/fluency/96/sunset.png',
  },
  {
    key: 'days', label: 'Days', desc: 'dawns embraced',
    color: '#FCD34D', glow: '#F59E0B',
    icon: 'https://img.icons8.com/fluency/96/sun.png',
  },
  {
    key: 'weeks', label: 'Weeks', desc: 'cycles completed',
    color: '#86EFAC', glow: '#22C55E',
    icon: 'https://img.icons8.com/fluency/96/tear-off-calendar.png',
  },
  {
    key: 'months', label: 'Months', desc: 'lunar journeys',
    color: '#C4B5FD', glow: '#8B5CF6',
    icon: 'https://img.icons8.com/fluency/96/full-moon.png',
  },
  {
    key: 'seasons', label: 'Seasons', desc: "nature's turns",
    color: '#FCA5A5', glow: '#F87171',
    icon: 'https://img.icons8.com/fluency/96/autumn.png',
  },
  {
    key: 'leap_years', label: 'Leap Years', desc: 'bonus days earned',
    color: '#6EE7B7', glow: '#34D399',
    icon: 'https://img.icons8.com/fluency/96/frog-face.png',
  },
];

// Pulse ring animation for live cards
const PulseDot = ({ color }) => (
  <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
    <div style={{
      width: '7px', height: '7px', borderRadius: '50%',
      background: color,
      boxShadow: `0 0 6px ${color}`,
      animation: 'livePulse 1.4s ease-in-out infinite',
    }} />
  </div>
);

const MetricCard = ({ metric, value, index, isLive, justUpdated }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: justUpdated
          ? `rgba(255,255,255,0.08)`
          : 'rgba(255,255,255,0.05)',
        border: `1.5px solid ${hovered ? metric.color : justUpdated ? metric.color + '88' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '24px',
        padding: '2.2rem 1.5rem 2rem',
        textAlign: 'center',
        cursor: 'default',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.5), 0 0 28px ${metric.glow}55`
          : justUpdated
          ? `0 6px 24px rgba(0,0,0,0.35), 0 0 16px ${metric.glow}33`
          : '0 6px 20px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(14px)',
        animation: `fadeUp 0.4s ease ${index * 0.06}s both`,
        overflow: 'hidden',
      }}
    >
      {/* BG radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 0%, ${metric.glow}22 0%, transparent 65%)`,
        borderRadius: '24px', pointerEvents: 'none',
        opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s',
      }} />

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px',
        background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        borderRadius: '2px',
      }} />

      {/* Live pulse dot */}
      {isLive && <PulseDot color={metric.color} />}

      {/* Icon */}
      <div style={{ marginBottom: '1.1rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '72px', height: '72px',
          borderRadius: '20px',
          background: `${metric.glow}20`,
          border: `1.5px solid ${metric.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'box-shadow 0.3s, transform 0.3s',
          boxShadow: hovered ? `0 0 24px ${metric.glow}77` : `0 0 8px ${metric.glow}22`,
          transform: hovered ? 'scale(1.12) rotate(-4deg)' : 'scale(1) rotate(0deg)',
        }}>
          <img src={metric.icon} alt={metric.label} width="44" height="44"
            style={{ display: 'block', filter: hovered ? `drop-shadow(0 0 8px ${metric.glow})` : 'none', transition: 'filter 0.3s' }}
          />
        </div>
      </div>

      {/* Value */}
      <div style={{
        fontSize: 'clamp(1.1rem, 2vw, 1.55rem)',
        fontWeight: 800, lineHeight: 1.1, marginBottom: '0.5rem',
        background: `linear-gradient(135deg, ${metric.color}, ${metric.glow})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        wordBreak: 'break-all',
        transition: 'opacity 0.2s',
        animation: justUpdated ? 'countFlash 0.4s ease' : 'none',
      }}>
        {value}
      </div>

      {/* Label */}
      <div style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e2e8f0', marginBottom: '0.35rem' }}>
        {metric.label}
      </div>

      {/* Desc + live badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
        <div style={{ fontSize: '0.7rem', color: 'rgba(180,190,220,0.45)', letterSpacing: '0.04em', fontStyle: 'italic' }}>
          {metric.desc}
        </div>
        {isLive && (
          <span style={{
            fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: `${metric.color}22`,
            border: `1px solid ${metric.color}55`,
            color: metric.color,
            padding: '0.1rem 0.4rem',
            borderRadius: '6px',
          }}>
            LIVE
          </span>
        )}
      </div>
    </div>
  );
};

const YouExp = ({ lifeExperience }) => {
  const rawData = lifeExperience || DEMO_DATA;

  // Parse initial values — strip commas if strings
  const parseVal = (v) => typeof v === 'string' ? parseFloat(v.replace(/,/g, '')) : v;
  const initValues = {};
  METRICS.forEach(m => { initValues[m.key] = parseVal(rawData[m.key]) || 0; });

  const [values, setValues] = useState(initValues);
  const [updatedKeys, setUpdatedKeys] = useState(new Set());
  const startTimeRef = useRef(Date.now());
  const baseValuesRef = useRef({ ...initValues });

  useEffect(() => {
    // Update live metrics every 15 seconds
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000; // seconds elapsed

      const newValues = { ...baseValuesRef.current };
      const newUpdated = new Set();

      LIVE_KEYS.forEach(key => {
        const rate = RATES_PER_SECOND[key] || 0;
        newValues[key] = baseValuesRef.current[key] + rate * elapsed;
        newUpdated.add(key);
      });

      setValues(newValues);
      setUpdatedKeys(newUpdated);

      // Clear flash highlight after 1.2s
      setTimeout(() => setUpdatedKeys(new Set()), 1200);

    }, 15000);

    // Also run a smoother update every second just for milliseconds & seconds display
    const fastInterval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setValues(prev => {
        const next = { ...prev };
        LIVE_KEYS.forEach(key => {
          next[key] = baseValuesRef.current[key] + (RATES_PER_SECOND[key] || 0) * elapsed;
        });
        return next;
      });
    }, 1000);

    return () => { clearInterval(interval); clearInterval(fastInterval); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;600&display=swap');
        @keyframes fadeUp    { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes livePulse { 0%,100%{opacity:0.4;transform:scale(0.85)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes countFlash{ 0%{opacity:0.3;transform:scale(0.96)} 60%{opacity:1;transform:scale(1.04)} 100%{transform:scale(1)} }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ padding: '2.5rem 1.5rem', fontFamily: "'Lato', sans-serif", position: 'relative', overflow: 'hidden' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', animation: 'fadeUp 0.5s ease both' }}>
          <div style={{ marginBottom: '0.6rem', display: 'flex', justifyContent: 'center', gap: '0.6rem', alignItems: 'center' }}>
            <img src="https://img.icons8.com/fluency/48/sparkling.png" width="32" height="32" alt="sparkle" />
            <img src="https://img.icons8.com/?size=100&id=XsvEZR0h6fav&format=png&color=000000" width="40" height="40" alt="globe" />
            <img src="https://img.icons8.com/fluency/48/sparkling.png" width="32" height="32" alt="sparkle" />
          </div>
          <h2 style={{
            fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.3rem,3.5vw,1.9rem)',
            fontWeight: 700, color: '#fff', margin: '0 0 0.35rem 0',
            letterSpacing: '0.08em', textShadow: '0 0 30px rgba(150,140,255,0.4)',
          }}>
            Your Life Experience
          </h2>
          <p style={{ color: 'rgba(180,190,220,0.5)', fontSize: '0.8rem', margin: '0 0 0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Every Moment You've Lived
          </p>
          {/* Live indicator */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '20px', padding: '0.25rem 0.75rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981', animation: 'livePulse 1.4s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EE7B7' }}>
              Live updating every 15s
            </span>
          </div>
        </div>

        {/* Grid — 3 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          maxWidth: '960px',
          margin: '0 auto',
        }}>
          {METRICS.map((metric, i) => (
            <MetricCard
              key={metric.key}
              metric={metric}
              value={formatNumber(values[metric.key])}
              index={i}
              isLive={LIVE_KEYS.has(metric.key)}
              justUpdated={updatedKeys.has(metric.key)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <a href="https://icons8.com" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.65rem', color: 'rgba(180,190,220,0.3)', textDecoration: 'none', letterSpacing: '0.08em' }}>
            Icons by Icons8
          </a>
        </div>
      </div>
    </>
  );
};

export default YouExp;