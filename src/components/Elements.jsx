
import React, { useState } from 'react';

const shortHoverWord = {
  Fire: "Action",
  Earth: "Stability",
  Air: "Mind",
  Water: "Emotion"
};


const Elements = ({ elements }) => {
  const styles = {
    container: {
      
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
      background: "linear-gradient(135deg, #d7efff 0%, #aad7ff 50%, #88c2ff 100%)",


    },
    title: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#333',
      fontSize: '1.5rem',
      fontWeight: '600'
    },
    elementsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem'
    },
    elementCard: {
      padding: '1.5rem',
      borderRadius: '12px',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    elementName: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      textTransform: 'capitalize'
    },
    elementPercentage: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
    },
    elementDescription: {
      fontSize: '0.9rem',
      opacity: 0.9
    },
    noData: {
      textAlign: 'center',
      color: '#666',
      padding: '2rem',
      fontStyle: 'italic'
    }
  };

  const elementColors = {
    Fire: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    Earth: 'linear-gradient(135deg, #a8e6cf 0%, #56ab2f 100%)',
    Air: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    Water: 'linear-gradient(135deg, #81ecec 0%, #00cec9 100%)'
  };
 const [hovered, setHovered] = useState(null);

  const elementDescriptions = {
    Fire: 'Passionate, energetic, and action-oriented',
    Earth: 'Practical, reliable, and grounded',
    Air: 'Intellectual, communicative, and social',
    Water: 'Emotional, intuitive, and deep-feeling'
  };

  if (!elements) {
    return (
      <div style={styles.container}>
        <div style={styles.noData}>
          Elemental distribution will appear here after calculation
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Elemental Distribution</h2>
      <div style={styles.elementsGrid}>
        {Object.entries(elements).map(([element, percentage]) => (
  <div style={{ position: "relative" }} key={element}>
    <div 
      onMouseEnter={() => setHovered(element)}
      onMouseLeave={() => setHovered(null)}
      style={{
        ...styles.elementCard,
        background: elementColors[element] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        transform: hovered === element ? 'scale(1.07)' : 'scale(1)',
        transition: "0.3s ease",
        cursor:"pointer"
      }}
    >
      <div style={styles.elementName}>{element}</div>
      <div style={styles.elementPercentage}>{percentage}%</div>
      <div style={styles.elementDescription}>
        {elementDescriptions[element]}
      </div>
    </div>

    {hovered === element && (
      <div style={{
        position: "absolute",
        right: "-25px",
        top: "-5px",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.8)",
        padding: "4px 12px",
        borderRadius: "8px",
        fontSize: "0.8rem",
        color: "#000",
        fontWeight: "600",
        backdropFilter:"blur(6px)",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
      }}>
        {shortHoverWord[element]}
      </div>
    )}
  </div>
))}

      </div>
    </div>
  );
};

export default Elements;