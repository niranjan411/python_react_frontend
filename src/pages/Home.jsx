import React, { useState } from 'react';
import Heading from '../components/Heading';
import BirthInput from '../components/BirthInput';
import YouExp from '../components/YouExp';
import AstroProfile from '../components/AstroProfile';
import Elements from '../components/Elements';
import ModalityPolarity from '../components/ModalityPolarity';
import PlanetWiseInfo from '../components/PlanetWiseInfo';
import Footer from '../components/Footer';
import exp from '../components/bg.jpg';

const Home = () => {
  const [profileData, setProfileData] = useState(null);

  const handleCalculate = (data) => {
    setProfileData(data);
  };

  const styles = {
     container: {
    width:"100%",
    background: '#f8f9fa',
    backgroundImage:`url(${exp})`,
    minHeight: '100vh',
    backgroundSize:"cover",
    backgroundPosition:"center",
    backgroundAttachment:"fixed",   // <-- this line makes bg fixed
    },
    main: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    resultsSection: {
      display: 'grid',
      gap: '2rem'
    }
  };

  return (
    <div style={styles.container}>
      <Heading />
      
      <main style={styles.main}>
        <BirthInput onCalculate={handleCalculate} />
        
        {profileData && (
          <div style={styles.resultsSection}>
            <YouExp lifeExperience={profileData.life_experience} />
            <AstroProfile profile={profileData} />
            <Elements elements={profileData.elements} />
            <ModalityPolarity 
              modalities={profileData.modalities} 
              polarities={profileData.polarities} 
            />
            <PlanetWiseInfo planetInfo={profileData.planet_info} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;