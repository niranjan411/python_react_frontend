import React from 'react';

const AstroProfile = ({ profile }) => {
  const styles = {
    container: {
      
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
      
   
      background: "linear-gradient(135deg, #d7efff 0%, #aad7ff 50%, #88c2ff 100%)",

      justifyItems: 'center'
    },
    title: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#333',
      fontSize: '1.8rem',
      fontWeight: '600'
    },
    contentWrapper: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'flex-start',
      width: 'fir-content'
    },
    leftSection: {
      flex: '0 0 auto'
    },
    rightSection: {
      flex: '1',
      width:'800px'
    },
    lifePathCircle: {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',     // <--- IMPORTANT
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  marginTop: '1rem',
  paddingTop:"0.4rem",
  justifyItems:'center'
},
lifePathMiniTitle:{
  fontSize:".9rem",
  fontWeight:"600",
  marginBottom:"0rem",
  
  lineHeight:"1.1",         // vertical height compact
  wordSpacing:"0.3px",  
  marginLeft:'-5rem',
  background: "linear-gradient(135deg, #d7e9ff 0%, #e7d8ff 50%, #ffe9f5 100%)"
,
  color:'#6116b8ff',
  borderRadius:'20px',
  maxWidth:'80px',
  justifyContent:'center',
  padding:'9px'


  

},
lifePathNumber:{
  fontSize:"3.5rem",
  fontWeight:"700",
  lineHeight:"1",
  marginBottom:'4rem',
  paddingBottom:'1.5rem'
  
}
,
    lifePathTitle: {
      color: '#333',
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '1rem',
      textAlign: 'left'
    },
    description: {
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      fontSize: '1rem',
      textAlign: 'left'
    },
    strengthsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    strengthTag: {
      background: "linear-gradient(135deg, #d7e9ff 0%, #e7d8ff 50%, #ffe9f5 100%)"
,
      color: 'black',
      padding: '0.4rem 0.8rem',
      borderRadius: '15px',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    noData: {
      textAlign: 'center',
      color: '#666',
      padding: '2rem',
      fontStyle: 'italic',
      background: "linear-gradient(135deg, #d7e9ff 0%, #e7d8ff 50%, #ffe9f5 100%)",
      borderRadius: '8px',
      border: '2px dashed #e9ecef'
    }
  };

  // Default description when no profile data
  const defaultDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Astrological Profile</h2>
      
      {/* Life Path Section */}
      {profile.life_path && (
        <div style={styles.contentWrapper}>
          {/* Left Section - Life Path Number in Circle */}
          <div style={styles.leftSection}>
            <div style={styles.lifePathCircle}>
  <div style={styles.lifePathMiniTitle}>Life Path Number</div>
  <div style={styles.lifePathNumber}>{profile.life_path.number}</div>
</div>
          </div>

          {/* Right Section - Title, Description, and Strengths */}
          <div style={styles.rightSection}>
            <div style={styles.lifePathTitle}>
              {profile.life_path.title}
            </div>
            
            {/* Description */}
            <p style={styles.description}>
              {profile.life_path?.description || defaultDescription}
            </p>

            {/* Strengths */}
            {profile.life_path.strengths && (
              <div style={styles.strengthsContainer}>
                {profile.life_path.strengths.slice(0, 3).map((strength, index) => (
                  <span key={index} style={styles.strengthTag}>
                    {strength}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AstroProfile;