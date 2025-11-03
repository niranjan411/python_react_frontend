import React from 'react';
import bg from './exp.jpg';
const PlanetWiseInfo = ({ planetInfo }) => {
  const styles = {
    container: {
      backgroundImage:`url(${bg})`,
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
      backgroundSize:"cover",
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#fff',
      fontSize: '1.5rem',
      fontWeight: '600'
    },
    planetsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    planetCard: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    planetHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    planetTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#333',
      margin: 0
    },
    planetSign: {
      fontSize: '0.9rem',
      color: '#667eea',
      fontWeight: '500',
      background: '#f0f2ff',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px'
    },
    planetDescription: {
      color: '#666',
      lineHeight: '1.5',
      fontSize: '0.9rem',
      marginBottom: '1rem'
    },
    planetMeta: {
      display: 'flex',
      gap: '1rem',
      fontSize: '0.8rem',
      color: '#888',
      flexWrap: 'wrap'
    },
    metaItem: {
      background: '#f8f9fa',
      padding: '0.3rem 0.6rem',
      borderRadius: '12px',
      border: '1px solid #e9ecef'
    },
    keywordsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '1rem'
    },
    keywordItem: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '0.3rem 0.8rem',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    noData: {
      textAlign: 'center',
      color: '#666',
      padding: '2rem',
      fontStyle: 'italic'
    }
  };

  if (!planetInfo || !Array.isArray(planetInfo)) {
    return (
      <div style={styles.container}>
        <div style={styles.noData}>
          Planetary information will appear here after calculation
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Planetary Positions</h2>
      <div style={styles.planetsGrid}>
        {planetInfo.map((planet, index) => (
          <div key={index} style={styles.planetCard}>
            <div style={styles.planetHeader}>
              <h4 style={styles.planetTitle}>{planet.planet}</h4>
              <span style={styles.planetSign}>{planet.sign}</span>
            </div>
            <p style={styles.planetDescription}>{planet.description}</p>
            <div style={styles.planetMeta}>
              <span style={styles.metaItem}>Element: {planet.element}</span>
              <span style={styles.metaItem}>Modality: {planet.modality}</span>
              <span style={styles.metaItem}>Polarity: {planet.polarity}</span>
            </div>
            {planet.keywords && planet.keywords.length > 0 && (
              <div style={styles.keywordsList}>
                {planet.keywords.map((keyword, idx) => (
                  <span key={idx} style={styles.keywordItem}>{keyword}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanetWiseInfo;