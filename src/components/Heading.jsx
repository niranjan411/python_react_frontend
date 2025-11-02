import React from 'react';

const Heading = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '0 0 20px 20px',
      marginBottom: '2rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    subtitle: {
      fontSize: '1.2rem',
      opacity: '0.9',
      fontWeight: '300'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LifeStats</h1>
      <p style={styles.subtitle}>Uncover Hidden Facts About Your Age & Milestones</p>
    </div>
  );
};

export default Heading;

