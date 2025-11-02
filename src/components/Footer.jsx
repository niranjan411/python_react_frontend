import React from 'react';

const Footer = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '20px 20px 0 0',
      marginTop: '2rem'
    },
    text: {
      opacity: '0.9',
      fontSize: '0.9rem'
    }
  };

  return (
    <div style={styles.container}>
      <p style={styles.text}>© 2024 LifeStats Astrological Project. All calculations for educational purposes.</p>
    </div>
  );
};

export default Footer;