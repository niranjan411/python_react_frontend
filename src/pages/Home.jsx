import React, { useState } from 'react';
import Heading from '../components/Heading';
import BirthInput from '../components/BirthInput';
import YouExp from '../components/YouExp';
import AstroProfile from '../components/AstroProfile';
import Elements from '../components/Elements';
import ModalityPolarity from '../components/ModalityPolarity';
import PlanetWiseInfo from '../components/PlanetWiseInfo';
import Footer from '../components/Footer';

// Generate deterministic stars
const STAR_LAYERS = [
  { count: 120, size: 1,   opacity: 0.5, dur: 180 },
  { count: 60,  size: 1.5, opacity: 0.65, dur: 240 },
  { count: 25,  size: 2.5, opacity: 0.8,  dur: 300 },
];

const makeStars = (count, seed) =>
  Array.from({ length: count }, (_, i) => ({
    top:  `${((Math.sin((i + seed) * 2.3 + 1) + 1) / 2 * 100).toFixed(2)}%`,
    left: `${((Math.cos((i + seed) * 1.7 + 0.5) + 1) / 2 * 100).toFixed(2)}%`,
    delay: `${((i * 0.37) % 4).toFixed(2)}s`,
    dur:   `${2 + (i % 3)}s`,
  }));

const Home = () => {
  const [profileData, setProfileData] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Lato:wght@300;400;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes twinkle  { 0%,100%{opacity:.15} 50%{opacity:.95} }
        @keyframes drift    { from{transform:translateY(0)} to{transform:translateY(-100vh)} }
        @keyframes orb1     { 0%,100%{transform:translate(0,0) scale(1)}   50%{transform:translate(40px,-30px) scale(1.08)} }
        @keyframes orb2     { 0%,100%{transform:translate(0,0) scale(1)}   50%{transform:translate(-30px,20px) scale(1.05)} }
        @keyframes orb3     { 0%,100%{transform:translate(0,0) scale(1)}   50%{transform:translate(20px,40px)  scale(1.06)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        html, body { height: 100%; }

        .home-root {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          font-family: 'Lato', sans-serif;
          background: #030810;
        }

        /* ── Deep space gradient backdrop ── */
        .bg-base {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse at 20% 15%,  #111d5e 0%, transparent 45%),
            radial-gradient(ellipse at 80% 80%,  #1a0633 0%, transparent 45%),
            radial-gradient(ellipse at 55% 50%,  #060d2e 0%, transparent 60%),
            #030810;
        }

        /* ── Animated nebula orbs ── */
        .orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(2px);
        }
        .orb-1 {
          width: 600px; height: 600px;
          top: -180px; left: -160px;
          background: radial-gradient(circle, rgba(88,101,242,0.18) 0%, transparent 65%);
          animation: orb1 14s ease-in-out infinite;
        }
        .orb-2 {
          width: 500px; height: 500px;
          bottom: -120px; right: -100px;
          background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 65%);
          animation: orb2 18s ease-in-out infinite;
        }
        .orb-3 {
          width: 350px; height: 350px;
          top: 38%; left: 58%;
          background: radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%);
          animation: orb3 22s ease-in-out infinite 3s;
        }
        .orb-4 {
          width: 280px; height: 280px;
          top: 20%; right: 8%;
          background: radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%);
          animation: orb1 25s ease-in-out infinite 6s;
        }

        /* ── Star layers ── */
        .star {
          position: fixed;
          border-radius: 50%;
          background: #fff;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Subtle grid overlay ── */
        .grid-overlay {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(129,140,248,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129,140,248,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ── Content layer ── */
        .home-content {
          position: relative;
          z-index: 1;
        }

        .home-main {
          padding: 0 1.5rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .results-section {
          display: grid;
          gap: 2rem;
          animation: fadeUp 0.6s ease 0.1s both;
        }

        /* ── Section dividers ── */
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(129,140,248,0.25), transparent);
          margin: 0.5rem 0;
        }
      `}</style>

      <div className="home-root">

        {/* ── Fixed background layers ── */}
        <div className="bg-base" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="grid-overlay" />

        {/* Star layers */}
        {STAR_LAYERS.map((layer, li) =>
          makeStars(layer.count, li * 13).map((s, i) => (
            <div
              key={`${li}-${i}`}
              className="star"
              style={{
                top: s.top, left: s.left,
                width: layer.size, height: layer.size,
                opacity: layer.opacity,
                animation: `twinkle ${s.dur} ${s.delay} infinite`,
              }}
            />
          ))
        )}

        {/* ── Page content ── */}
        <div className="home-content">
          <Heading />

          <main className="home-main">
            <BirthInput onCalculate={(data) => setProfileData(data)} />

            {profileData && (
              <div className="results-section">
                <div className="section-divider" />
                <YouExp lifeExperience={profileData.life_experience} />
                <div className="section-divider" />
                <AstroProfile profile={profileData} />
                <div className="section-divider" />
                <Elements elements={profileData.elements} />
                <div className="section-divider" />
                <ModalityPolarity
                  modalities={profileData.modalities}
                  polarities={profileData.polarities}
                />
                <div className="section-divider" />
                <PlanetWiseInfo planetInfo={profileData.planet_info} />
              </div>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;