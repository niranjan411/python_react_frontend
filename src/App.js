import React, { useState } from "react";
import './App.css';

// Component for Planet Cards
const PlanetCard = ({ planet, sign, traits }) => (
  <div className="planet-card">
    <div className="planet-header">
      <span className="planet-emoji">
        {planet === "Sun" ? "☀️" : 
         planet === "Moon" ? "🌙" : 
         planet === "Mercury" ? "☿" :
         planet === "Venus" ? "♀" :
         planet === "Mars" ? "♂" : "🪐"}
      </span>
      <h3>{planet}</h3>
    </div>
    <div className="planet-details">
      <div className="planet-sign">
        <span className="label">Sign:</span>
        <span className="value">{sign}</span>
      </div>
      <div className="planet-traits">
        <span className="label">Traits:</span>
        <span className="value">{traits}</span>
      </div>
    </div>
  </div>
);

// Component for Feature Pills
const FeaturePill = ({ text, type = "default" }) => (
  <span className={`feature-pill ${type}`}>{text}</span>
);

// Component for Info Cards
const InfoCard = ({ type, value, icon }) => (
  <div className={`info-card ${type}`}>
    <span className="card-icon">{icon}</span>
    <div className="card-content">
      <h3>{getCardTitle(type)}</h3>
      <p>{value}</p>
    </div>
  </div>
);

// Component for Element Balance
const ElementBalance = ({ element, distribution }) => (
  <div className="element-balance">
    <h4>Element Balance</h4>
    <div className="element-bars">
      {Object.entries(distribution).map(([elem, count]) => (
        <div key={elem} className="element-bar">
          <div className="element-info">
            <span className="element-name">{elem}</span>
            <span className="element-count">{count}</span>
          </div>
          <div className="bar-container">
            <div 
              className={`bar ${elem.toLowerCase()} ${elem === element ? 'dominant' : ''}`}
              style={{ width: `${(count / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Component for Aspect Display
const AspectDisplay = ({ aspects }) => (
  <div className="aspects-section">
    <h4>Planetary Aspects</h4>
    <div className="aspects-grid">
      {Object.entries(aspects).map(([aspect, description]) => (
        <div key={aspect} className="aspect-card">
          <span className="aspect-name">{aspect.replace('_', ' - ')}</span>
          <span className="aspect-desc">{description}</span>
        </div>
      ))}
    </div>
  </div>
);

// Component for Indian Astrology Section
const IndianAstrologySection = ({ indianAstrology }) => (
  <div className="indian-astrology">
    <h4>🇮🇳 Indian Astrology</h4>
    <div className="indian-grid">
      <div className="indian-item">
        <span className="label">Nakshatra:</span>
        <span className="value">{indianAstrology.nakshatra || "Not available"}</span>
      </div>
      <div className="indian-item">
        <span className="label">Rashi:</span>
        <span className="value">{indianAstrology.rashi || "Not available"}</span>
      </div>
      {indianAstrology.planetary_rulers && (
        <div className="indian-item">
          <span className="label">Planetary Rulers:</span>
          <div className="rulers-list">
            <span>Sun: {indianAstrology.planetary_rulers.sun_ruler}</span>
            <span>Moon: {indianAstrology.planetary_rulers.moon_ruler}</span>
          </div>
        </div>
      )}
    </div>
  </div>
);

// Helper functions
const getCardTitle = (type) => {
  const titles = {
    zodiac: "Zodiac Sign",
    lifePath: "Life Path Number", 
    chinese: "Chinese Zodiac",
    weekday: "Born on"
  };
  return titles[type] || type;
};

const getPlanetTraits = (astrologyInfo, planet) => {
  if (!astrologyInfo) return "Traits not available";
  
  if (astrologyInfo.traits && astrologyInfo.traits[planet]) {
    return astrologyInfo.traits[planet];
  }
  
  if (astrologyInfo.key_traits) {
    return astrologyInfo.key_traits;
  }
  
  return "Traits information not available";
};

const getPlanetPositions = (astrologyInfo) => {
  if (!astrologyInfo) return [];
  
  if (astrologyInfo.planets) {
    return Object.entries(astrologyInfo.planets).map(([planet, sign]) => ({
      planet: planet.charAt(0).toUpperCase() + planet.slice(1),
      sign: sign,
      traits: getPlanetTraits(astrologyInfo, planet)
    }));
  }
  
  if (astrologyInfo.planet_positions) {
    return Object.entries(astrologyInfo.planet_positions).map(([planet, sign]) => ({
      planet: planet,
      sign: sign,
      traits: getPlanetTraits(astrologyInfo, planet)
    }));
  }
  
  return [];
};

const getMoonSign = (astrologyInfo) => {
  if (!astrologyInfo) return null;
  
  if (astrologyInfo.moon_sign) return astrologyInfo.moon_sign;
  if (astrologyInfo.planets?.moon) return astrologyInfo.planets.moon;
  if (astrologyInfo.planet_positions?.Moon) return astrologyInfo.planet_positions.Moon;
  
  return null;
};

// Main App Component
function App() {
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const requestBody = { date_of_birth: dob };
      if (time) requestBody.time_of_birth = time;
      if (place) requestBody.place_of_birth = place;

      const response = await fetch("https://python-backend-c5ym.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch results");
      }
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to fetch results. Check server connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Life Stats</h1>
          <p>Discover your astrological profile and life path</p>
        </div>
      </header>

      <main className="app-main">
        <section className="input-section">
          <form onSubmit={handleSubmit} className="birth-form">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth *</label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="time">Time of Birth (Optional)</label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="place">Place of Birth (Optional)</label>
                <input
                  id="place"
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="e.g., Mumbai, India"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "🔮 Analyzing..." : "Get Cosmic Reading"}
            </button>
          </form>
        </section>

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {result && <ResultsDisplay result={result} />}
      </main>

      <footer className="app-footer">
        <p>Made with ✨ for cosmic exploration</p>
      </footer>
    </div>
  );
}

// Results Display Component
const ResultsDisplay = ({ result }) => (
  <section className="results-section">
    <div className="results-header">
      <h2>Your Cosmic Profile</h2>
      <FeaturePill 
        text={result.analysis_type || "Astrology Analysis"} 
        type="analysis-type" 
      />
    </div>

    <BasicInfoGrid result={result} />
    <AstrologyDetails astrologyInfo={result.astrology_info} />
  </section>
);

// Basic Info Grid Component
const BasicInfoGrid = ({ result }) => (
  <div className="basic-info-grid">
    <InfoCard 
      type="zodiac" 
      value={result.zodiac_sign} 
      icon="♈" 
    />
    <InfoCard 
      type="lifePath" 
      value={result.life_path_number} 
      icon="🔢" 
    />
    <InfoCard 
      type="chinese" 
      value={result.chinese_zodiac} 
      icon="🐉" 
    />
    <InfoCard 
      type="weekday" 
      value={result.day_of_week} 
      icon="📅" 
    />
  </div>
);

// Astrology Details Component
const AstrologyDetails = ({ astrologyInfo }) => {
  if (!astrologyInfo) return null;

  const moonSign = getMoonSign(astrologyInfo);
  const planetPositions = getPlanetPositions(astrologyInfo);

  return (
    <div className="astrology-section">
      <div className="section-header">
        <h3>Astrological Insights</h3>
        {moonSign && (
          <div className="moon-highlight">
            <span>🌙 Moon Sign: {moonSign}</span>
          </div>
        )}
      </div>

      {astrologyInfo.house_focus && (
        <div className="house-focus">
          <h4>House Focus</h4>
          <p>{astrologyInfo.house_focus}</p>
        </div>
      )}

      {astrologyInfo.element_balance && astrologyInfo.element_distribution && (
        <ElementBalance 
          element={astrologyInfo.chart_details?.dominant_element}
          distribution={astrologyInfo.element_distribution}
        />
      )}

      <div className="planets-grid">
        {planetPositions.length > 0 ? (
          planetPositions.map((planetData) => (
            <PlanetCard
              key={planetData.planet}
              planet={planetData.planet}
              sign={planetData.sign}
              traits={planetData.traits}
            />
          ))
        ) : (
          <div className="no-data">
            <p>No planetary data available</p>
          </div>
        )}
      </div>

      {astrologyInfo.aspects && Object.keys(astrologyInfo.aspects).length > 0 && (
        <AspectDisplay aspects={astrologyInfo.aspects} />
      )}

      {astrologyInfo.special_features && (
        <div className="special-features">
          <h4>Special Features</h4>
          <div className="features-list">
            {astrologyInfo.special_features.map((feature, index) => (
              <FeaturePill key={index} text={feature} type="feature" />
            ))}
          </div>
        </div>
      )}

      {astrologyInfo.indian_astrology && (
        <IndianAstrologySection indianAstrology={astrologyInfo.indian_astrology} />
      )}

      {astrologyInfo.chart_details && (
        <div className="chart-details">
          <h4>Chart Details</h4>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Modality:</span>
              <span className="value">{astrologyInfo.chart_details.modality}</span>
            </div>
            <div className="detail-item">
              <span className="label">Ruling Planet:</span>
              <span className="value">{astrologyInfo.chart_details.ruling_planet}</span>
            </div>
            <div className="detail-item">
              <span className="label">Dominant Element:</span>
              <span className="value">{astrologyInfo.chart_details.dominant_element}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;