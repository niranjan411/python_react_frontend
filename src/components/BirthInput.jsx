import React, { useState } from 'react';

const BirthInput = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    year: '',
    hour: '',
    minutes: '',
    ampm: 'AM',
    lat: '',
    lng: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      background: 'white',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
      maxWidth: '500px',
      margin: '0 auto'
    },
    title: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#333',
      fontSize: '1.5rem',
      fontWeight: '600'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    row: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    inputGroup: {
      flex: '1',
      minWidth: '120px'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#555',
      fontSize: '0.9rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e1e5e9',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e1e5e9',
      borderRadius: '8px',
      fontSize: '1rem',
      background: 'white'
    },
    locationRow: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-end'
    },
    error: {
      color: '#d32f2f',
      fontSize: '0.8rem',
      marginTop: '0.25rem'
    },
    inputError: {
      borderColor: '#d32f2f'
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrors(prev => ({ ...prev, location: 'Geolocation is not supported by this browser.' }));
      return;
    }

    setErrors(prev => ({ ...prev, location: '' }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({
          ...prev,
          lat: latitude.toFixed(6),
          lng: longitude.toFixed(6)
        }));
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please allow location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
            break;
        }
        setErrors(prev => ({ ...prev, location: errorMessage }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const validateForm = () => {
    const newErrors = {};
    const day = parseInt(formData.day);
    const month = parseInt(formData.month);
    const year = parseInt(formData.year);
    const hour = parseInt(formData.hour);
    const minutes = parseInt(formData.minutes);

    // Date validation
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      newErrors.date = 'Invalid date. Please check day, month, and year.';
    }

    const now = new Date();
    if (date > now) {
      newErrors.date = 'Birth date cannot be in the future.';
    }

    if (year < 1900 || year > now.getFullYear()) {
      newErrors.year = `Year must be between 1900 and ${now.getFullYear()}.`;
    }

    // Time validation
    if (hour < 1 || hour > 12) {
      newErrors.hour = 'Hour must be between 1 and 12.';
    }

    if (minutes < 0 || minutes > 59) {
      newErrors.minutes = 'Minutes must be between 0 and 59.';
    }

    // Latitude/Longitude validation
    const lat = parseFloat(formData.lat);
    const lng = parseFloat(formData.lng);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.lat = 'Latitude must be between -90 and 90.';
    }

    if (isNaN(lng) || lng < -180 || lng > 180) {
      newErrors.lng = 'Longitude must be between -180 and 180.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Convert to 24-hour format
    let hour24 = parseInt(formData.hour);
    if (formData.ampm === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (formData.ampm === 'AM' && hour24 === 12) {
      hour24 = 0;
    }

    // Format for backend
    const formattedDate = `${formData.year}-${formData.month.padStart(2, '0')}-${formData.day.padStart(2, '0')}`;
    const formattedTime = `${hour24.toString().padStart(2, '0')}:${formData.minutes.padStart(2, '0')}`;

    const payload = {
      date: formattedDate,
      time: formattedTime,
      latitude: parseFloat(formData.lat),
      longitude: parseFloat(formData.lng)
    };

    try {
      setLoading(true);
      setErrors({});

      const response = await fetch('http://localhost:5000/api/calculate/formatted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to calculate profile');
      }

      if (result.success) {
        onCalculate(result.data);
      } else {
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error('Error:', error);
      setErrors(prev => ({ ...prev, submit: error.message || 'Failed to submit data. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Enter Your Birth Details</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Day</label>
            <input
              type="number"
              placeholder="DD"
              min="1"
              max="31"
              style={{...styles.input, ...(errors.day || errors.date ? styles.inputError : {})}}
              value={formData.day}
              onChange={(e) => handleChange('day', e.target.value)}
              required
            />
            {errors.day && <div style={styles.error}>{errors.day}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Month</label>
            <input
              type="number"
              placeholder="MM"
              min="1"
              max="12"
              style={{...styles.input, ...(errors.month || errors.date ? styles.inputError : {})}}
              value={formData.month}
              onChange={(e) => handleChange('month', e.target.value)}
              required
            />
            {errors.month && <div style={styles.error}>{errors.month}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Year</label>
            <input
              type="number"
              placeholder="YYYY"
              min="1900"
              max="2024"
              style={{...styles.input, ...(errors.year || errors.date ? styles.inputError : {})}}
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
              required
            />
            {errors.year && <div style={styles.error}>{errors.year}</div>}
            {errors.date && <div style={styles.error}>{errors.date}</div>}
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Hour</label>
            <input
              type="number"
              placeholder="HH"
              min="1"
              max="12"
              style={{...styles.input, ...(errors.hour ? styles.inputError : {})}}
              value={formData.hour}
              onChange={(e) => handleChange('hour', e.target.value)}
              required
            />
            {errors.hour && <div style={styles.error}>{errors.hour}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Minutes</label>
            <input
              type="number"
              placeholder="MM"
              min="0"
              max="59"
              style={{...styles.input, ...(errors.minutes ? styles.inputError : {})}}
              value={formData.minutes}
              onChange={(e) => handleChange('minutes', e.target.value)}
              required
            />
            {errors.minutes && <div style={styles.error}>{errors.minutes}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>AM/PM</label>
            <select 
              style={styles.select}
              value={formData.ampm}
              onChange={(e) => handleChange('ampm', e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        
        <div style={styles.locationRow}>
          <div style={{...styles.inputGroup, flex: '1'}}>
            <label style={styles.label}>Latitude</label>
            <input
              type="text"
              placeholder="e.g., 40.7128"
              style={{...styles.input, ...(errors.lat ? styles.inputError : {})}}
              value={formData.lat}
              onChange={(e) => handleChange('lat', e.target.value)}
              required
            />
            {errors.lat && <div style={styles.error}>{errors.lat}</div>}
          </div>
          <div style={{...styles.inputGroup, flex: '1'}}>
            <label style={styles.label}>Longitude</label>
            <input
              type="text"
              placeholder="e.g., -74.0060"
              style={{...styles.input, ...(errors.lng ? styles.inputError : {})}}
              value={formData.lng}
              onChange={(e) => handleChange('lng', e.target.value)}
              required
            />
            {errors.lng && <div style={styles.error}>{errors.lng}</div>}
          </div>
          <button 
            type="button" 
            style={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              height: 'fit-content'
            }}
            onClick={getCurrentLocation}
          >
            Get Location
          </button>
        </div>
        {errors.location && <div style={styles.error}>{errors.location}</div>}
        {errors.submit && <div style={styles.error}>{errors.submit}</div>}
        
        <button 
          type="submit" 
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '1rem',
            opacity: loading ? 0.7 : 1
          }}
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Get Astro Profile'}
        </button>
      </form>
    </div>
  );
};

export default BirthInput;