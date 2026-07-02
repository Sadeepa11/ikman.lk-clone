import { useMemo } from 'react';
import { properties } from '../data/properties';
import { filterProperties, paginateProperties } from '../utils/helpers';
import type { FilterState } from '../types';

export const useSearch = (filters: FilterState, page: number, perPage: number) => {
  const filtered = useMemo(() => filterProperties(properties, filters), [filters]);
  const paginated = useMemo(() => paginateProperties(filtered, page, perPage), [filtered, page, perPage]);

  return {
    results: paginated,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / perPage),
  };
};
