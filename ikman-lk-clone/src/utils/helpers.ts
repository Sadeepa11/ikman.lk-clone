import type { Property, FilterState } from '../types';

export const filterProperties = (properties: Property[], filters: FilterState): Property[] => {
  let result = [...properties];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q)
    );
  }

  if (filters.district) {
    result = result.filter(p => p.district === filters.district);
  }

  if (filters.city) {
    result = result.filter(p => p.city === filters.city);
  }

  if (filters.category) {
    result = result.filter(p => p.category === filters.category);
  }

  if (filters.type) {
    result = result.filter(p => p.type === filters.type);
  }

  if (filters.priceMin) {
    result = result.filter(p => p.price >= Number(filters.priceMin));
  }

  if (filters.priceMax) {
    result = result.filter(p => p.price <= Number(filters.priceMax));
  }

  if (filters.bedrooms) {
    const beds = filters.bedrooms === '5+' ? 5 : Number(filters.bedrooms);
    result = result.filter(p => p.bedrooms !== undefined && (filters.bedrooms === '5+' ? p.bedrooms >= 5 : p.bedrooms === beds));
  }

  if (filters.bathrooms) {
    const baths = filters.bathrooms === '4+' ? 4 : Number(filters.bathrooms);
    result = result.filter(p => p.bathrooms !== undefined && (filters.bathrooms === '4+' ? p.bathrooms >= 4 : p.bathrooms === baths));
  }

  if (filters.condition) {
    result = result.filter(p => p.condition === filters.condition);
  }

  if (filters.postedDate) {
    const now = new Date();
    const cutoff = new Date();
    if (filters.postedDate === 'today') cutoff.setDate(now.getDate() - 1);
    else if (filters.postedDate === 'week') cutoff.setDate(now.getDate() - 7);
    else if (filters.postedDate === 'month') cutoff.setDate(now.getDate() - 30);
    else if (filters.postedDate === '3months') cutoff.setDate(now.getDate() - 90);
    result = result.filter(p => new Date(p.postedDate) >= cutoff);
  }

  return sortProperties(result, filters.sortBy);
};

export const sortProperties = (properties: Property[], sortBy: string): Property[] => {
  const arr = [...properties];
  switch (sortBy) {
    case 'date_desc':
      return arr.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    case 'date_asc':
      return arr.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
    case 'price_asc':
      return arr.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return arr.sort((a, b) => b.price - a.price);
    default:
      return arr.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  }
};

export const paginateProperties = <T>(items: T[], page: number, perPage: number): T[] => {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
};

export const countActiveFilters = (filters: FilterState): number => {
  const keys: (keyof FilterState)[] = ['district', 'city', 'category', 'type', 'priceMin', 'priceMax', 'bedrooms', 'bathrooms', 'condition', 'postedDate'];
  return keys.filter(k => filters[k] !== '' && filters[k] !== undefined).length;
};

export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');
