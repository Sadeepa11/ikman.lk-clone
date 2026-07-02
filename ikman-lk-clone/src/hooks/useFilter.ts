import { useState, useCallback } from 'react';
import type { FilterState } from '../types';

export const defaultFilters: FilterState = {
  search: '',
  district: '',
  city: '',
  category: '',
  type: '',
  posterType: '',
  promotionType: '',
  priceMin: '',
  priceMax: '',
  bedrooms: '',
  bathrooms: '',
  landSizeMin: '',
  landSizeMax: '',
  buildingSizeMin: '',
  buildingSizeMax: '',
  condition: '',
  postedDate: '',
  sortBy: 'date_desc',
};

export const useFilter = () => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'district') next.city = '';
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => setFilters(defaultFilters), []);

  const resetAll = useCallback(() => setFilters({ ...defaultFilters }), []);

  return { filters, updateFilter, resetFilters, resetAll };
};
