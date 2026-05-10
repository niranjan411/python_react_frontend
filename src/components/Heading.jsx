import React, { useEffect, useState } from 'react';

const STARS = Array.from({ length: 36 }, (_, i) => ({
  top:  `${Math.abs(Math.sin(i * 2.7) * 85 + 7)}%`,
  left: `${(i * 2.85) % 97}%`,
  size: i % 5 === 0 ? 3 : 2,
  delay: `${(i * 0.18).toFixed(2)}s`,
  dur:   `${2 + (i % 3)}s`,
}));

const Heading = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lato:wght@300;400&display=swap');
        @keyframes twinkle  { 0%,100%{opacity:.25} 50%{opacity:.9} }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes orb      { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.06) translate(6px,-6px)} }
        @keyframes shimmer  {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        * { box-sizing:border-box; }
      `}</style>

      <div style={{
        position: 'relative',
        textAlign: 'center',
        padding: 'clamp(2.5rem,6vw,4rem) 1rem clamp(2rem,5vw,3.5rem)',
        background: 'radial-gradient(ellipse at 50% -10%, #1a2b6d 0%, #050c1f 55%, #0a0520 100%)',
        borderRadius: '0 0 32px 32px',
        overflow: 'hidden',
        marginBottom: '2rem',
        boxShadow: '0 12px 48px rgba(0,0,0,0.55), 0 2px 0 rgba(102,126,234,0.25)',
      }}>

        {/* Animated nebula orbs */}
        <div style={{ position:'absolute', top:'-60px', left:'-60px', width:'340px', height:'340px', background:'radial-gradient(circle, rgba(102,126,234,0.18) 0%, transparent 65%)', borderRadius:'50%', animation:'orb 8s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-40px', right:'-40px', width:'280px', height:'280px', background:'radial-gradient(circle, rgba(118,75,162,0.15) 0%, transparent 65%)', borderRadius:'50%', animation:'orb 10s ease-in-out infinite reverse', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'20%', right:'15%', width:'180px', height:'180px', background:'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)', borderRadius:'50%', animation:'orb 12s ease-in-out infinite 2s', pointerEvents:'none' }} />

        {/* Starfield */}
        {STARS.map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: s.size, height: s.size,
            background: '#fff',
            borderRadius: '50%',
            top: s.top, left: s.left,
            animation: `twinkle ${s.dur} ${s.delay} infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Decorative arc line */}
        <svg style={{ position:'absolute', bottom:0, left:0, width:'100%', pointerEvents:'none', opacity:0.15 }} height="40" viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0,40 Q300,0 600,20 T1200,10 L1200,40 Z" fill="url(#arcgrad)" />
          <defs>
            <linearGradient id="arcgrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Icon row */}
        <div style={{
          fontSize: '1.5rem', marginBottom: '0.75rem', letterSpacing: '0.5rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'none' : 'translateY(-10px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          🌠 ✦ 🔭
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(2rem, 7vw, 3.4rem)',
          fontWeight: 900,
          margin: '0 0 0.5rem',
          letterSpacing: '0.12em',
          lineHeight: 1.1,
          background: 'linear-gradient(90deg, #c0c8ff 0%, #fff 30%, #d8aaff 60%, #fff 80%, #aec6ff 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 5s linear infinite, fadeDown 0.6s ease 0.1s both',
          textShadow: 'none',
        }}>
          LifeStats
        </h1>

        {/* Glowing underline */}
        <div style={{
          width: 'clamp(60px, 15vw, 100px)',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #818CF8, #A78BFA, transparent)',
          margin: '0 auto 1.1rem',
          borderRadius: '2px',
          boxShadow: '0 0 12px #818CF866',
          animation: 'fadeDown 0.6s ease 0.25s both',
          opacity: 0,
          animationFillMode: 'forwards',
        }} />

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
          fontWeight: 300,
          color: 'rgba(200,210,240,0.65)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          margin: 0,
          animation: 'fadeUp 0.6s ease 0.35s both',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          Uncover Hidden Facts About Your Age &amp; Milestones
        </p>

        {/* Bottom badge row */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap',
          marginTop: '1.5rem',
          animation: 'fadeUp 0.6s ease 0.5s both',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          {['🪐 Planetary Positions', '🌗 Modality & Polarity', '🔥 Elements', '🔮 Life Path'].map(badge => (
            <span key={badge} style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(200,215,245,0.7)',
              padding: '0.25rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Heading;