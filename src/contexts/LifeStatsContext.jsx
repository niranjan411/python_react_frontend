import React, { createContext, useContext, useState } from 'react';
import { postBirthData } from '../services/api';

const LifeStatsContext = createContext();

export const useLifeStats = () => {
  const context = useContext(LifeStatsContext);
  if (!context) {
    throw new Error('useLifeStats must be used within a LifeStatsProvider');
  }
  return context;
};

export const LifeStatsProvider = ({ children }) => {
  const [birthData, setBirthData] = useState({
    day: '',
    month: '',
    year: '',
    hour: '',
    minutes: '',
    ampm: 'AM',
    location: ''
  });
  const [lifeStats, setLifeStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBirthData = (field, value) => {
    setBirthData(prev => ({ ...prev, [field]: value }));
  };

  const fetchLifeStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await postBirthData(birthData);
      setLifeStats(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch life stats');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    birthData,
    lifeStats,
    loading,
    error,
    updateBirthData,
    fetchLifeStats
  };

  return (
    <LifeStatsContext.Provider value={value}>
      {children}
    </LifeStatsContext.Provider>
  );
};