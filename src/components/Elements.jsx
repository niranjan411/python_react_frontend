import React, { useState } from 'react';

const DEMO_ELEMENTS = { Fire: 35, Earth: 25, Air: 28, Water: 12 };

const ELEMENT_META = {
  Fire:  { icon: '🔥', symbol: '△', color: '#FF6B6B', glow: '#FF4500', bg: 'linear-gradient(135deg, #ff6b35, #ff4500)', traits: ['Passionate', 'Bold', 'Dynamic'], keyword: 'Action' },
  Earth: { icon: '🌿', symbol: '▽', color: '#6EE7B7', glow: '#10B981', bg: 'linear-gradient(135deg, #56ab2f, #a8e063)', traits: ['Grounded', 'Reliable', 'Patient'], keyword: 'Stability' },
  Air:   { icon: '💨', symbol: '△', color: '#93C5FD', glow: '#3B82F6', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', traits: ['Curious', 'Social', 'Witty'], keyword: 'Mind' },
  Water: { icon: '💧', symbol: '▽', color: '#A78BFA', glow: '#7C3AED', bg: 'linear-gradient(135deg, #667eea, #764ba2)', traits: ['Intuitive', 'Empathic', 'Deep'], keyword: 'Emotion' },
};

const ArcBar = ({ percentage, color, glow }) => {
  const r = 36, cx = 44, cy = 44;
  const circ = 2 * Math.PI * r;
  const filled = (percentage / 100) * circ;
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${glow})`, transition: 'stroke-dasharray 0.8s ease' }}
      />
    </svg>
  );
};

const ElementCard = ({ element, percentage, index }) => {
  const [hovered, setHovered] = useState(false);
  const meta = ELEMENT_META[element] || { icon: '✦', color: '#aaa', glow: '#888', bg: 'linear-gradient(135deg,#667eea,#764ba2)', traits: [], keyword: '' };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? meta.color : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '20px',
        padding: '1.5rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.4), 0 0 24px ${meta.glow}44` : '0 4px 16px rgba(0,0,0,0.25)',
        backdropFilter: 'blur(12px)',
        animation: `fadeUp 0.45s ease ${index * 0.1}s both`,
        overflow: 'hidden',
      }}
    >
      {/* BG glow blob */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${meta.glow}22 0%, transparent 65%)`, borderRadius: '20px', pointerEvents: 'none', opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s' }} />

      {/* Icon + Arc ring */}
      <div style={{ position: 'relative', width: 88, height: 88 }}>
        <ArcBar percentage={percentage} color={meta.color} glow={meta.glow} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{meta.icon}</span>
        </div>
      </div>

      {/* Element name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{element}</span>
        <span style={{ fontSize: '0.75rem', color: meta.color, fontWeight: 600 }}>{meta.symbol}</span>
      </div>

      {/* Percentage */}
      <div style={{
        fontSize: '2.2rem', fontWeight: 800, lineHeight: 1,
        background: `linear-gradient(135deg, ${meta.color}, ${meta.glow})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {percentage}<span style={{ fontSize: '1rem' }}>%</span>
      </div>

      {/* Keyword pill */}
      <div style={{
        background: `${meta.color}22`,
        border: `1px solid ${meta.color}55`,
        color: meta.color,
        padding: '0.2rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {meta.keyword}
      </div>

      {/* Trait chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center' }}>
        {meta.traits.map(t => (
          <span key={t} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(210,220,240,0.75)', padding: '0.15rem 0.55rem', borderRadius: '8px', fontSize: '0.7rem' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

// Horizontal distribution bar at bottom
const DistributionBar = ({ elements }) => {
  const total = Object.values(elements).reduce((s, v) => s + v, 0);
  let pos = 0;
  const segs = Object.entries(elements).map(([el, val]) => {
    const w = (val / total) * 100;
    const seg = { el, val, w, pos };
    pos += w;
    return seg;
  });

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto 0', animation: 'fadeUp 0.5s ease 0.45s both' }}>
      <div style={{ fontSize: '0.7rem', color: 'rgba(180,190,220,0.45)', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', marginBottom: '0.75rem' }}>Elemental Balance</div>
      <div style={{ height: '10px', borderRadius: '10px', overflow: 'hidden', background: 'rgba(255,255,255,0.06)', display: 'flex' }}>
        {segs.map(({ el, w }) => {
          const meta = ELEMENT_META[el] || {};
          return <div key={el} style={{ width: `${w}%`, background: meta.bg || '#aaa', transition: 'width 0.8s ease' }} />;
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        {segs.map(({ el, val }) => {
          const meta = ELEMENT_META[el] || {};
          return (
            <div key={el} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.8rem' }}>{meta.icon}</span>
              <span style={{ fontSize: '0.72rem', color: meta.color, fontWeight: 600 }}>{val}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Elements = ({ elements }) => {
  const data = elements || DEMO_ELEMENTS;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{
        background: 'radial-gradient(ellipse at 30% 10%, #0d1b4b 0%, #050c1f 55%, #0a0520 100%)',
        minHeight: '100vh',
        padding: '2.5rem 1.5rem',
        fontFamily: "'Lato', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Nebula blobs */}
        <div style={{ position:'absolute', top:'-80px', right:'-60px', width:'380px', height:'380px', background:'radial-gradient(circle, rgba(102,126,234,0.12) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-50px', left:'-50px', width:'320px', height:'320px', background:'radial-gradient(circle, rgba(118,75,162,0.1) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        {/* Title */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem', animation:'fadeUp 0.5s ease both' }}>
          <div style={{ fontSize:'1.8rem', marginBottom:'0.3rem' }}>🜁 🜂 🜃 🜄</div>
          <h2 style={{ fontFamily:"'Cinzel', serif", fontSize:'clamp(1.3rem,3.5vw,1.9rem)', fontWeight:700, color:'#fff', margin:'0 0 0.35rem 0', letterSpacing:'0.08em', textShadow:'0 0 30px rgba(150,140,255,0.4)' }}>
            Elemental Distribution
          </h2>
          <p style={{ color:'rgba(180,190,220,0.5)', fontSize:'0.8rem', margin:0, letterSpacing:'0.12em', textTransform:'uppercase' }}>
            The Four Sacred Elements
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {Object.entries(data).map(([element, percentage], i) => (
            <ElementCard key={element} element={element} percentage={percentage} index={i} />
          ))}
        </div>

        {/* Balance bar */}
        <DistributionBar elements={data} />
      </div>
    </>
  );
};

export default Elements;