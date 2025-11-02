import { useLifeStats } from '../contexts/LifeStatsContext';

export const useLifeStatsData = () => {
  return useLifeStats();
};