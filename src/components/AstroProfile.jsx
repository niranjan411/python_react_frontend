import React, { useState } from 'react';

const DEMO_PROFILE = {
  life_path: {
    number: 7,
    title: 'The Seeker',
    description: 'You are on a lifelong journey of discovery, diving deep into the mysteries of existence. Analytical and introspective, you seek truth beyond the surface — in philosophy, science, or spirituality. Your inner world is rich, your mind sharp, and your intuition profound.',
    strengths: ['Deep Intuition', 'Analytical Mind', 'Spiritual Wisdom', 'Inner Focus', 'Truth-Seeker'],
  },
};

const PATH_ICONS = {
  1: '🌟', 2: '🌙', 3: '🎨', 4: '🏛️', 5: '🌊',
  6: '💞', 7: '🔭', 8: '⚡', 9: '🕊️', 11: '✨', 22: '🌍', 33: '🙏',
};

const PATH_COLOR = {
  1: { c: '#FBBF24', g: '#F59E0B' },
  2: { c: '#A78BFA', g: '#7C3AED' },
  3: { c: '#F472B6', g: '#EC4899' },
  4: { c: '#6EE7B7', g: '#10B981' },
  5: { c: '#60A5FA', g: '#3B82F6' },
  6: { c: '#FCA5A5', g: '#EF4444' },
  7: { c: '#818CF8', g: '#4F46E5' },
  8: { c: '#FDE68A', g: '#F59E0B' },
  9: { c: '#86EFAC', g: '#22C55E' },
  11: { c: '#E0E7FF', g: '#818CF8' },
  22: { c: '#93C5FD', g: '#2563EB' },
  33: { c: '#FCA5A5', g: '#F43F5E' },
};

const getColor = (n) => PATH_COLOR[n] || { c: '#A78BFA', g: '#7C3AED' };

const AstroProfile = ({ profile }) => {
  const data = profile || DEMO_PROFILE;
  const lp = data.life_path;
  const { c, g } = getColor(lp?.number);
  const pathIcon = PATH_ICONS[lp?.number] || '✦';

  const [hoveredStrength, setHoveredStrength] = useState(null);

  if (!lp) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;600&display=swap');
        @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spinRing { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes pulse    { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        * { box-sizing:border-box; }
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
        <div style={{ position:'absolute', top:'-80px', right:'-60px', width:'420px', height:'420px', background:'radial-gradient(circle, rgba(102,126,234,0.13) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-50px', left:'-50px', width:'340px', height:'340px', background:`radial-gradient(circle, ${g}18 0%, transparent 70%)`, borderRadius:'50%', pointerEvents:'none' }} />

        {/* Page title */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem', animation:'fadeUp 0.5s ease both' }}>
          <div style={{ fontSize:'1.8rem', marginBottom:'0.3rem' }}>🔮 ✦ 🔮</div>
          <h2 style={{ fontFamily:"'Cinzel', serif", fontSize:'clamp(1.3rem,3.5vw,1.9rem)', fontWeight:700, color:'#fff', margin:'0 0 0.35rem 0', letterSpacing:'0.08em', textShadow:'0 0 30px rgba(150,140,255,0.4)' }}>
            Astrological Profile
          </h2>
          <p style={{ color:'rgba(180,190,220,0.5)', fontSize:'0.8rem', margin:0, letterSpacing:'0.12em', textTransform:'uppercase' }}>
            Your Cosmic Blueprint
          </p>
        </div>

        {/* Card */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${c}44`,
          borderRadius: '24px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          backdropFilter: 'blur(14px)',
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${g}22`,
          animation: 'fadeUp 0.5s ease 0.15s both',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Card bg glow */}
          <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 0% 0%, ${g}18 0%, transparent 55%)`, pointerEvents:'none', borderRadius:'24px' }} />

          <div style={{ display:'flex', gap:'2rem', alignItems:'flex-start', flexWrap:'wrap', position:'relative' }}>

            {/* ── Left: Number circle ── */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.75rem', flexShrink:0 }}>

              {/* Outer spinning ring */}
              <div style={{ position:'relative', width:'140px', height:'140px' }}>
                <svg width="140" height="140" viewBox="0 0 140 140" style={{ position:'absolute', inset:0, animation:'spinRing 12s linear infinite' }}>
                  <circle cx="70" cy="70" r="64" fill="none" stroke={`${c}30`} strokeWidth="2" strokeDasharray="8 6" />
                </svg>
                <svg width="140" height="140" viewBox="0 0 140 140" style={{ position:'absolute', inset:0 }}>
                  <circle cx="70" cy="70" r="56" fill="none" stroke={`${c}55`} strokeWidth="1.5" />
                </svg>

                {/* Inner circle */}
                <div style={{
                  position:'absolute', inset:'12px',
                  borderRadius:'50%',
                  background:`linear-gradient(135deg, ${g}cc, ${c}99)`,
                  boxShadow:`0 0 30px ${g}88, inset 0 0 20px rgba(0,0,0,0.3)`,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                }}>
                  <span style={{ fontSize:'1.6rem', lineHeight:1, marginBottom:'0.1rem' }}>{pathIcon}</span>
                  <span style={{ fontSize:'2.8rem', fontWeight:800, color:'#fff', lineHeight:1, textShadow:`0 0 16px ${g}` }}>
                    {lp.number}
                  </span>
                </div>
              </div>

              {/* "Life Path" label */}
              <div style={{
                background:`${c}18`,
                border:`1px solid ${c}44`,
                color: c,
                padding:'0.3rem 1rem',
                borderRadius:'20px',
                fontSize:'0.72rem',
                fontWeight:700,
                letterSpacing:'0.1em',
                textTransform:'uppercase',
                textAlign:'center',
              }}>
                Life Path
              </div>
            </div>

            {/* ── Right: Content ── */}
            <div style={{ flex:1, minWidth:'220px' }}>

              {/* Title row */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' }}>
                <h3 style={{ margin:0, fontFamily:"'Cinzel', serif", fontSize:'clamp(1.1rem,3vw,1.5rem)', fontWeight:700, color:'#fff', letterSpacing:'0.04em' }}>
                  {lp.title}
                </h3>
                <span style={{
                  background:`${c}22`, border:`1px solid ${c}55`, color:c,
                  padding:'0.2rem 0.65rem', borderRadius:'12px',
                  fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase',
                }}>
                  #{lp.number}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height:'1px', background:`linear-gradient(90deg, ${c}55, transparent)`, marginBottom:'1rem' }} />

              {/* Description */}
              <p style={{
                color:'rgba(200,210,235,0.8)', lineHeight:'1.75',
                fontSize:'0.9rem', margin:'0 0 1.4rem 0',
              }}>
                {lp.description}
              </p>

              {/* Strengths */}
              {lp.strengths && lp.strengths.length > 0 && (
                <>
                  <div style={{ fontSize:'0.7rem', color:'rgba(180,190,220,0.45)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'0.6rem' }}>
                    ✦ Core Strengths
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                    {lp.strengths.map((s, i) => (
                      <span
                        key={i}
                        onMouseEnter={() => setHoveredStrength(i)}
                        onMouseLeave={() => setHoveredStrength(null)}
                        style={{
                          background: hoveredStrength === i ? `${c}33` : `${c}18`,
                          border:`1px solid ${hoveredStrength === i ? c : c + '44'}`,
                          color: c,
                          padding:'0.3rem 0.85rem',
                          borderRadius:'20px',
                          fontSize:'0.78rem',
                          fontWeight:600,
                          cursor:'default',
                          transition:'all 0.2s',
                          boxShadow: hoveredStrength === i ? `0 0 10px ${g}55` : 'none',
                          letterSpacing:'0.03em',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AstroProfile;