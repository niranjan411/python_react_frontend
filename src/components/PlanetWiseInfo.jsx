import React, { useState } from 'react';

const PLANET_DATA = {
  Sun:     { glyph: '♌', color: '#FFB347', glow: '#FFD700', bg: 'linear-gradient(135deg, #FF8C00, #FFD700)', icon: 'https://img.icons8.com/fluency/96/sun.png' },
  Moon:    { glyph: '☽', color: '#C0C0FF', glow: '#9090FF', bg: 'linear-gradient(135deg, #667eea, #9090c0)', icon: 'https://img.icons8.com/fluency/96/full-moon.png' },
  Mercury: { glyph: '☿', color: '#A0C4FF', glow: '#60A0FF', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', icon: 'https://img.icons8.com/?size=100&id=eU7AkW08bN6S&format=png&color=000000' },
  Venus:   { glyph: '♀', color: '#FFB6C1', glow: '#FF69B4', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', icon: 'https://img.icons8.com/?size=100&id=62041&format=png&color=000000' },
  Mars:    { glyph: '♂', color: '#FF6B6B', glow: '#FF4500', bg: 'linear-gradient(135deg, #f83600, #f9d423)', icon: 'https://img.icons8.com/?size=100&id=LT07uW3wV92M&format=png&color=000000' },
  Jupiter: { glyph: '♃', color: '#FFD700', glow: '#FFA500', bg: 'linear-gradient(135deg, #f7971e, #ffd200)', icon: 'https://img.icons8.com/?size=100&id=13481&format=png&color=000000' },
  Saturn:  { glyph: '♄', color: '#C8A96E', glow: '#A0784E', bg: 'linear-gradient(135deg, #c2a855, #8B6914)', icon: 'https://img.icons8.com/?size=100&id=62038&format=png&color=000000' },
  Uranus:  { glyph: '♅', color: '#7FFFD4', glow: '#00CED1', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', icon: 'https://img.icons8.com/?size=100&id=62040&format=png&color=000000' },
  Neptune: { glyph: '♆', color: '#6495ED', glow: '#1E90FF', bg: 'linear-gradient(135deg, #4481eb, #04befe)', icon: 'https://img.icons8.com/?size=100&id=62035&format=png&color=000000' },
  Pluto:   { glyph: '♇', color: '#C084FC', glow: '#9333EA', bg: 'linear-gradient(135deg, #6a3093, #a044ff)', icon: 'https://img.icons8.com/?size=100&id=62036&format=png&color=000000' },
  Rahu:    { glyph: '☊', color: '#94A3B8', glow: '#64748B', bg: 'linear-gradient(135deg, #373B44, #4286f4)', icon: 'https://img.icons8.com/fluency/96/north-node.png' },
  Ketu:    { glyph: '☋', color: '#FDBA74', glow: '#EA580C', bg: 'linear-gradient(135deg, #7F7FD5, #86A8E7)', icon: 'https://img.icons8.com/fluency/96/south-node.png' },
};

const ELEMENT_DATA = {
  Fire:  { icon: 'https://img.icons8.com/fluency/48/fire-element.png',  label: 'Fire'  },
  Earth: { icon: 'https://img.icons8.com/fluency/48/earth-element.png', label: 'Earth' },
  Air:   { icon: 'https://img.icons8.com/fluency/48/air-element.png',   label: 'Air'   },
  Water: { icon: 'https://img.icons8.com/fluency/48/water-element.png', label: 'Water' },
};

const MODALITY_ICONS = { Cardinal: '⚡', Fixed: '🔒', Mutable: '🌀' };
const POLARITY_ICONS  = { Positive: '＋', Negative: '－', Masculine: '↑', Feminine: '↓' };

const getPD = (name) =>
  PLANET_DATA[name] || { glyph: '★', color: '#aaa', glow: '#888', bg: 'linear-gradient(135deg,#667eea,#764ba2)', icon: 'https://img.icons8.com/fluency/96/star.png' };

// ── Meta chip ──────────────────────────────────
const MetaChip = ({ iconUrl, iconEmoji, label, color }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    padding: '0.32rem 0.75rem', borderRadius: '10px',
    fontSize: '0.8rem', color: 'rgba(210,220,240,0.85)',
  }}>
    {iconUrl
      ? <img src={iconUrl} alt={label} width="16" height="16" style={{ display:'block' }} />
      : <span style={{ fontSize: '0.9rem' }}>{iconEmoji}</span>}
    {label}
  </span>
);

// ── Planet card ────────────────────────────────
const PlanetCard = ({ planet, index }) => {
  const [hovered, setHovered] = useState(false);
  const pd = getPD(planet.planet);
  const elData = ELEMENT_DATA[planet.element];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(10,12,35,0.8)',
        backdropFilter: 'blur(18px)',
        border: `1.5px solid ${hovered ? pd.color : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '24px',
        padding: '2rem 2rem 1.75rem',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 18px 50px rgba(0,0,0,0.5), 0 0 28px ${pd.glow}44`
          : '0 6px 24px rgba(0,0,0,0.35)',
        animation: `fadeIn 0.45s ease ${index * 0.08}s both`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG corner glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '200px', height: '200px',
        background: `radial-gradient(circle at 0% 0%, ${pd.glow}18 0%, transparent 70%)`,
        pointerEvents: 'none', borderRadius: '24px',
        opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s',
      }} />

      {/* ── Header row ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: '1.25rem' }}>

        {/* Planet icon */}
        <div style={{
          width: '68px', height: '68px', borderRadius: '18px',
          background: pd.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: hovered ? `0 0 28px ${pd.glow}cc` : `0 0 14px ${pd.glow}66`,
          transition: 'box-shadow 0.3s, transform 0.3s',
          transform: hovered ? 'scale(1.08) rotate(-3deg)' : 'scale(1)',
        }}>
          <img src={pd.icon} alt={planet.planet} width="42" height="42"
            style={{ display:'block', filter: hovered ? `drop-shadow(0 0 6px ${pd.glow})` : 'none', transition:'filter 0.3s' }}
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
          />
          {/* Fallback glyph */}
          <span style={{ display:'none', fontSize:'1.6rem', color:'#fff' }}>{pd.glyph}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>
              {planet.planet}
            </h4>
            <span style={{ color: pd.color, fontSize: '1.1rem', opacity: 0.9 }}>{pd.glyph}</span>
          </div>
          {/* Sign badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            background: `${pd.color}22`, border: `1px solid ${pd.color}55`,
            color: pd.color, padding: '0.25rem 0.75rem',
            borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em',
          }}>
            ♈ {planet.sign}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: `linear-gradient(90deg, ${pd.color}44, transparent)`, marginBottom: '1.1rem' }} />

      {/* Description */}
      <p style={{
        color: 'rgba(200,212,235,0.82)', fontSize: '0.9rem',
        lineHeight: '1.7', margin: '0 0 1.2rem 0',
      }}>
        {planet.description}
      </p>

      {/* Meta chips */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
        {planet.element && (
          <MetaChip
            iconUrl={elData?.icon}
            label={planet.element}
            color={pd.color}
          />
        )}
        {planet.modality && (
          <MetaChip iconEmoji={MODALITY_ICONS[planet.modality] || '◈'} label={planet.modality} color={pd.color} />
        )}
        {planet.polarity && (
          <MetaChip iconEmoji={POLARITY_ICONS[planet.polarity] || '◉'} label={planet.polarity} color={pd.color} />
        )}
      </div>

      {/* Keywords */}
      {planet.keywords?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          {planet.keywords.map((kw, i) => (
            <span key={i} style={{
              background: `${pd.color}18`, color: pd.color,
              border: `1px solid ${pd.color}44`,
              padding: '0.25rem 0.75rem', borderRadius: '12px',
              fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.03em',
            }}>
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Demo data ──────────────────────────────────
const DEMO_DATA = [
  { planet:'Sun',     sign:'Leo',         description:'The Sun in Leo shines with bold confidence, creative brilliance, and a magnetic desire to lead and inspire those around you.',          element:'Fire',  modality:'Fixed',    polarity:'Positive', keywords:['Confidence','Leadership','Creativity','Vitality'] },
  { planet:'Moon',    sign:'Cancer',      description:'The Moon in Cancer deepens emotional sensitivity and nurturing instincts, creating a strong connection to home and family.',            element:'Water', modality:'Cardinal', polarity:'Negative', keywords:['Intuition','Nurturing','Empathy','Memory'] },
  { planet:'Mercury', sign:'Gemini',      description:'Mercury in Gemini gifts a quick and curious mind, with exceptional communication skills and a love for ideas.',                        element:'Air',   modality:'Mutable',  polarity:'Positive', keywords:['Communication','Curiosity','Adaptability'] },
  { planet:'Venus',   sign:'Taurus',      description:'Venus in Taurus brings a deep appreciation for beauty, luxury, and sensory pleasures with an enduring approach to love.',             element:'Earth', modality:'Fixed',    polarity:'Negative', keywords:['Beauty','Pleasure','Stability','Devotion'] },
  { planet:'Mars',    sign:'Aries',       description:'Mars in Aries ignites a pioneering, fearless energy, driving direct action and competitive spirit with raw courage.',                 element:'Fire',  modality:'Cardinal', polarity:'Positive', keywords:['Action','Courage','Passion','Drive'] },
  { planet:'Jupiter', sign:'Sagittarius', description:'Jupiter in Sagittarius expands horizons through philosophy, travel, and an insatiable quest for higher wisdom.',                      element:'Fire',  modality:'Mutable',  polarity:'Positive', keywords:['Expansion','Wisdom','Adventure','Optimism'] },
];

// ── Main component ─────────────────────────────
const PlanetWiseInfo = ({ planetInfo }) => {
  const data = planetInfo && Array.isArray(planetInfo) ? planetInfo : DEMO_DATA;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;500&display=swap');
        @keyframes fadeIn   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes twinkle  { 0%,100%{opacity:0.5} 50%{opacity:1} }
        * { box-sizing:border-box; }
      `}</style>

      <div style={{
        padding: '2.5rem 1.5rem',
        fontFamily: "'Lato', sans-serif",
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Starfield */}
        {[...Array(28)].map((_, i) => (
          <div key={i} style={{
            position:'absolute',
            width: i%4===0 ? '3px' : '2px', height: i%4===0 ? '3px' : '2px',
            background:'#fff', borderRadius:'50%',
            top:`${Math.sin(i*2.3)*45+50}%`, left:`${(i*3.7)%100}%`,
            animation:`twinkle ${2+(i%3)}s infinite ${i*0.15}s`, opacity:0.4,
            pointerEvents:'none',
          }} />
        ))}

        {/* Title */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem', position:'relative' }}>
          <div style={{ display:'flex', justifyContent:'center', gap:'0.6rem', marginBottom:'0.5rem', alignItems:'center' }}>
            <img src="https://img.icons8.com/fluency/48/telescope.png" width="38" height="38" alt="telescope" />
          </div>
          <h2 style={{
            fontFamily:"'Cinzel', serif", fontSize:'clamp(1.4rem,4vw,2rem)',
            fontWeight:700, color:'#fff', margin:'0 0 0.4rem',
            letterSpacing:'0.08em', textShadow:'0 0 30px rgba(150,140,255,0.5)',
          }}>
            Planetary Positions
          </h2>
          <p style={{ color:'rgba(180,190,220,0.6)', fontSize:'0.82rem', margin:0, letterSpacing:'0.12em', textTransform:'uppercase' }}>
            Celestial Alignments at Birth
          </p>
        </div>

        {/* 2-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          maxWidth: '1050px',
          margin: '0 auto',
        }}>
          {data.map((planet, i) => (
            <PlanetCard key={i} planet={planet} index={i} />
          ))}
        </div>

        {/* Attribution */}
        <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
          <a href="https://icons8.com" target="_blank" rel="noopener noreferrer"
            style={{ fontSize:'0.65rem', color:'rgba(180,190,220,0.3)', textDecoration:'none', letterSpacing:'0.08em' }}>
            Icons by Icons8
          </a>
        </div>
      </div>
    </>
  );
};

export default PlanetWiseInfo;