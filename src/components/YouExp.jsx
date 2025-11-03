import React from 'react';

const YouExp = ({ lifeExperience }) => {
  const styles = {
    container: {
      
      padding: '2rem',

      
      marginBottom: '2rem',
      marginTop: '2rem'
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#71ffd0ff',
      fontSize: '1.8rem',
      fontWeight: '800'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
    },
 metricCard: {
  background: "rgba(255,255,255,0.15)",   // transparent white glass
  backdropFilter: "blur(10px)",           // real blur effect
  WebkitBackdropFilter: "blur(10px)",     // for safari
  color: "#fff",
  padding: "1.5rem",
  borderRadius: "20px",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.15)",
  boxShadow: "0 4px 25px rgba(0,0,0,0.15)",
  maxWidth: '300px',
  minWidth:'300px'
}

    ,
    metricValue: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
    },
    metricLabel: {
      fontSize: '0.9rem',
      opacity: 0.9,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    noData: {
      textAlign: 'center',
      color: '#666',
      padding: '2rem',
      fontStyle: 'italic'
    }
  };

  if (!lifeExperience) {
    return (
      <div style={styles.container}>
        <div style={styles.noData}>
          Life experience data will appear here after calculation
        </div>
      </div>
    );
  }

  const metrics = [
    { key: 'heart_beats', label: 'Heart Beats' },
    { key: 'breaths', label: 'Breaths' },
    { key: 'blinks', label: 'Blinks' },
    { key: 'milliseconds', label: 'Milliseconds' },
    { key: 'seconds', label: 'Seconds' },
    { key: 'hours', label: 'Hours' },
    { key: 'sunsets', label: 'Sunsets' },
    { key: 'days', label: 'Days' },
    { key: 'weeks', label: 'Weeks' },
    { key: 'months', label: 'Months' },
    { key: 'seasons', label: 'Seasons' },
    { key: 'leap_years', label: 'Leap Years' }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Life Experience</h2>
      <div style={styles.grid}>
        {metrics.map((metric) => (
          <div key={metric.key} style={styles.metricCard}>
            <div style={styles.metricValue}>{lifeExperience[metric.key]}</div>
            <div style={styles.metricLabel}>{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouExp;