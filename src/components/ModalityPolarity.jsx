import React from 'react';

const ModalityPolarity = ({ modalities, polarities }) => {
  const styles = {
    container: {
      background: "linear-gradient(135deg, #dff3ff 0%, #bfe3ff 50%, #a9d8ff 100%)",

      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#333',
      fontSize: '1.5rem',
      fontWeight: '600'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3rem'
    },
    section: {
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      color: '#333',
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    
    percentage: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    majorityName: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#333',
      textTransform: 'capitalize',
      marginBottom: '2rem'
    },
    progressBarContainer: {
      position: 'relative',
      marginBottom: '3rem'
    },
    progressBar: {
      height: '25px',
      background: '#e9ecef',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative'
    },
    progressFill: {
      height: '100%',
      borderRadius: '12px',
      transition: 'width 0.5s ease'
    },
    segmentLabel: {
      position: 'absolute',
      top: '35px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textAlign: 'center',
      textTransform: 'capitalize',
      color: '#333',
      transform: 'translateX(-50%)'
    },
    noData: {
      textAlign: 'center',
      color: '#666',
      padding: '2rem',
      fontStyle: 'italic',
      background: '#f8f9fa',
      borderRadius: '8px',
      border: '2px dashed #e9ecef'
    },
    minTitleAndPercentage:{
      display:'flex',
      justifyContent: 'space-between'
    }
  };

  // Colors for different modalities
  const modalityColors = {
    fixed: '#FF6B6B',    // Red
    mutable: '#4ECDC4',  // Teal
    cardinal: '#45B7D1'  // Blue
  };

  // Colors for polarities
  const polarityColors = {
    yang: '#FFA726',     // Orange
    yin: '#7E57C2'       // Purple
  };

  const getMajorityItem = (data, colors) => {
    if (!data) return null;
    
    const entries = Object.entries(data);
    if (entries.length === 0) return null;

    // Find the item with highest percentage
    const majority = entries.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );

    const [name, percentage] = majority;

    return {
      name,
      percentage,
      color: colors[name.toLowerCase()]
    };
  };

  const getProgressData = (data, colors) => {
    if (!data) return null;

    const entries = Object.entries(data);
    const total = entries.reduce((sum, [, percentage]) => sum + percentage, 0);
    
    let currentPosition = 0;
    const segments = entries.map(([name, percentage]) => {
      const width = (percentage / total) * 100;
      const segment = {
        name,
        percentage,
        width,
        color: colors[name.toLowerCase()],
        position: currentPosition,
        labelPosition: currentPosition + (width / 2) // Center of the segment
      };
      currentPosition += width;
      return segment;
    });

    return segments;
  };

  if (!modalities && !polarities) {
    return (
      <div style={styles.container}>
        <div style={styles.noData}>
          Modality and polarity data will appear here after calculation
        </div>
      </div>
    );
  }

  const modalityMajority = getMajorityItem(modalities, modalityColors);
  const polarityMajority = getMajorityItem(polarities, polarityColors);
  const modalitySegments = getProgressData(modalities, modalityColors);
  const polaritySegments = getProgressData(polarities, polarityColors);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Modality & Polarity</h2>
      <div style={styles.grid}>
        {/* Modality Section */}
        <div>
          <div style={styles.minTitleAndPercentage}>
          <h3 style={styles.sectionTitle}>Modality</h3>
          {modalityMajority && (
            <div style={styles.majorityItem}>
              <div style={styles.percentage}>{modalityMajority.percentage}%</div>
              <div style={styles.majorityName}>{modalityMajority.name}</div>
              
            </div>
          )}  
          </div>

          {modalityMajority && (
            <div style={styles.majorityItem}>
              {/* Progress Bar with Labels */}
              <div style={styles.progressBarContainer}>
                <div style={styles.progressBar}>
                  {modalitySegments?.map((segment, index) => (
                    <div
                      key={segment.name}
                      style={{
                        ...styles.progressFill,
                        width: `${segment.width}%`,
                        background: segment.color,
                        position: 'absolute',
                        left: `${segment.position}%`
                      }}
                    />
                  ))}
                </div>
                
                {/* Segment Labels */}
                {modalitySegments?.map((segment, index) => (
                  <div
                    key={segment.name}
                    style={{
                      ...styles.segmentLabel,
                      left: `${segment.labelPosition}%`
                    }}
                  >
                    {segment.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Polarity Section */}
        <div>
          <div style={styles.minTitleAndPercentage}>
          <h3 style={styles.sectionTitle}>Polarity</h3>
           {modalityMajority && (
            <div style={styles.majorityItem}>
              <div style={styles.percentage}>{polarityMajority.percentage}%</div>
              <div style={styles.majorityName}>{polarityMajority.name}</div>
              
            </div>
          )}  
         </div>
          {modalityMajority && (
            <div style={styles.majorityItem}>
              {/* Progress Bar with Labels */}
              <div style={styles.progressBarContainer}>
                <div style={styles.progressBar}>
                  {polaritySegments?.map((segment, index) => (
                    <div
                      key={segment.name}
                      style={{
                        ...styles.progressFill,
                        width: `${segment.width}%`,
                        background: segment.color,
                        position: 'absolute',
                        left: `${segment.position}%`
                      }}
                    />
                  ))}
                </div>
                
                {/* Segment Labels */}
                {polaritySegments?.map((segment, index) => (
                  <div
                    key={segment.name}
                    style={{
                      ...styles.segmentLabel,
                      left: `${segment.labelPosition}%`
                    }}
                  >
                    {segment.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalityPolarity;