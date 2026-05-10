import React, { useState } from 'react';

// Demo data for preview
const DEMO_MODALITIES = { Cardinal: 45, Fixed: 33, Mutable: 22 };
const DEMO_POLARITIES = { Yang: 60, Yin: 40 };

const MODALITY_META = {
  cardinal: { icon: '⚡', label: 'Cardinal', desc: 'Initiating energy', color: '#60A5FA', glow: '#3B82F6' },
  fixed:    { icon: '🔒', label: 'Fixed',    desc: 'Sustaining energy', color: '#F87171', glow: '#EF4444' },
  mutable:  { icon: '🌀', label: 'Mutable',  desc: 'Adapting energy',  color: '#34D399', glow: '#10B981' },
};

const POLARITY_META = {
  yang: { icon: '☀️', label: 'Yang', desc: 'Active · Expressive', color: '#FBBF24', glow: '#F59E0B' },
  yin:  { icon: '🌙', label: 'Yin',  desc: 'Receptive · Introspective', color: '#A78BFA', glow: '#7C3AED' },
};

const getMeta = (map, key) => map[key?.toLowerCase()] || { icon: '◉', label: key, desc: '', color: '#aaa', glow: '#888' };

const getMajority = (data) => {
  if (!data) return null;
  return Object.entries(data).reduce((max, cur) => cur[1] > max[1] ? cur : max);
};

const getSegments = (data) => {
  if (!data) return [];
  const total = Object.values(data).reduce((s, v) => s + v, 0);
  let pos = 0;
  return Object.entries(data).map(([name, val]) => {
    const width = (val / total) * 100;
    const seg = { name, value: val, width, position: pos, center: pos + width / 2 };
    pos += width;
    return seg;
  });
};

const DonutRing = ({ segments, metaMap, size = 120 }) => {
  const [hovered, setHovered] = useState(null);
  const r = 42, cx = 60, cy = 60, circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 120 120">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
        {segments.map((seg, i) => {
          const meta = getMeta(metaMap, seg.name);
          const dash = (seg.width / 100) * circ;
          const gap = circ - dash;
          const el = (
            <circle
              key={seg.name}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={meta.color}
              strokeWidth={hovered === seg.name ? 18 : 14}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset * circ / 100 + circ * 0.25}
              strokeLinecap="round"
              style={{ transition: 'stroke-width 0.2s, opacity 0.2s', opacity: hovered && hovered !== seg.name ? 0.35 : 1, cursor: 'pointer', filter: hovered === seg.name ? `drop-shadow(0 0 6px ${meta.glow})` : 'none' }}
              onMouseEnter={() => setHovered(seg.name)}
              onMouseLeave={() => setHovered(null)}
            />
          );
          offset += seg.width;
          return el;
        })}
      </svg>
      {/* Center label */}
      {hovered ? (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: '1.3rem' }}>{getMeta(metaMap, hovered).icon}</span>
          <span style={{ fontSize: '0.65rem', color: getMeta(metaMap, hovered).color, fontWeight: 700, marginTop: 2 }}>
            {segments.find(s => s.name === hovered)?.value}%
          </span>
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: '1.5rem' }}>✦</span>
        </div>
      )}
    </div>
  );
};

const LegendRow = ({ seg, metaMap }) => {
  const meta = getMeta(metaMap, seg.name);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.55rem 0.8rem', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.5rem' }}>
      <span style={{ fontSize: '1.1rem' }}>{meta.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', textTransform: 'capitalize' }}>{seg.name}</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: meta.color }}>{seg.value}%</span>
        </div>
        {/* Mini bar */}
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${seg.value}%`, background: `linear-gradient(90deg, ${meta.color}, ${meta.glow})`, borderRadius: '4px', boxShadow: `0 0 6px ${meta.glow}88`, transition: 'width 0.6s ease' }} />
        </div>
        <div style={{ fontSize: '0.68rem', color: 'rgba(180,190,215,0.55)', marginTop: '0.15rem' }}>{meta.desc}</div>
      </div>
    </div>
  );
};

const Section = ({ title, headerIcon, data, metaMap }) => {
  const segments = getSegments(data);
  const [majorityName, majorityVal] = getMajority(data) || ['—', 0];
  const majorityMeta = getMeta(metaMap, majorityName);

  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '1.5rem', flex: 1, minWidth: 0 }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '1.1rem' }}>{headerIcon}</span>
        <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(200,210,235,0.7)' }}>{title}</h3>
      </div>

      {/* Donut + majority */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.25rem' }}>
        <DonutRing segments={segments} metaMap={metaMap} />
        <div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(180,190,220,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>Dominant</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{majorityMeta.icon}</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: majorityMeta.color, textTransform: 'capitalize' }}>{majorityName}</span>
          </div>
          <div style={{
            display: 'inline-block',
            fontSize: '1.7rem',
            fontWeight: 800,
            background: `linear-gradient(135deg, ${majorityMeta.color}, ${majorityMeta.glow})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}>
            {majorityVal}%
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(180,190,215,0.5)', marginTop: '0.2rem' }}>{majorityMeta.desc}</div>
        </div>
      </div>

      {/* Legend */}
      <div>
        {segments.map(seg => <LegendRow key={seg.name} seg={seg} metaMap={metaMap} />)}
      </div>
    </div>
  );
};

const ModalityPolarity = ({ modalities, polarities }) => {
  const mod = modalities || DEMO_MODALITIES;
  const pol = polarities || DEMO_POLARITIES;

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
        <div style={{ position:'absolute', top:'-80px', right:'-60px', width:'380px', height:'380px', background:'radial-gradient(circle, rgba(102,126,234,0.13) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-50px', left:'-50px', width:'320px', height:'320px', background:'radial-gradient(circle, rgba(118,75,162,0.1) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        {/* Title */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem', animation:'fadeUp 0.5s ease both' }}>
          <div style={{ fontSize:'1.8rem', marginBottom:'0.3rem' }}>☯ 🌗</div>
          <h2 style={{ fontFamily:"'Cinzel', serif", fontSize:'clamp(1.3rem,3.5vw,1.9rem)', fontWeight:700, color:'#fff', margin:'0 0 0.35rem 0', letterSpacing:'0.08em', textShadow:'0 0 30px rgba(150,140,255,0.4)' }}>
            Modality &amp; Polarity
          </h2>
          <p style={{ color:'rgba(180,190,220,0.5)', fontSize:'0.8rem', margin:0, letterSpacing:'0.12em', textTransform:'uppercase' }}>
            Energetic Blueprint
          </p>
        </div>

        {/* Two panels */}
        <div style={{
          display: 'flex',
          gap: '1.25rem',
          maxWidth: '860px',
          margin: '0 auto',
          flexWrap: 'wrap',
          animation: 'fadeUp 0.5s ease 0.15s both',
        }}>
          <Section title="Modality" headerIcon="⚡" data={mod} metaMap={MODALITY_META} />
          <Section title="Polarity"  headerIcon="☯"  data={pol} metaMap={POLARITY_META}  />
        </div>
      </div>
    </>
  );
};

export default ModalityPolarity;