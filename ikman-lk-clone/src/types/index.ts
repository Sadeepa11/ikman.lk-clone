export interface Property {
  id: string;
  title: string;
  price: number;
  priceType: 'fixed' | 'negotiable' | 'monthly';
  district: string;
  city: string;
  address: string;
  category: PropertyCategory;
  type: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  landSize?: number;
  landSizeUnit?: 'perches' | 'acres';
  buildingSize?: number;
  buildingSizeUnit?: 'sqft' | 'sqm';
  condition: 'new' | 'used' | 'under_construction';
  featured: boolean;
  verified: boolean;
  postedDate: string;
  description: string;
  seller: Seller;
  images: string[];
  latitude?: number;
  longitude?: number;
  views: number;
  amenities?: string[];
}

export type PropertyCategory =
  | 'houses'
  | 'apartments'
  | 'land'
  | 'commercial'
  | 'rooms'
  | 'short_term';

export type PropertyType = 'for_sale' | 'for_rent';

export interface Seller {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  type: 'agent' | 'owner' | 'developer';
  memberSince: string;
  listings?: number;
  verified: boolean;
}

export interface Location {
  id: string;
  district: string;
  cities: string[];
}

export interface Category {
  id: PropertyCategory;
  label: string;
  icon: string;
  count: number;
}

export interface FilterState {
  search: string;
  district: string;
  city: string;
  category: PropertyCategory | '';
  type: PropertyType | '';
  posterType: string;
  promotionType: string;
  priceMin: string;
  priceMax: string;
  bedrooms: string;
  bathrooms: string;
  landSizeMin: string;
  landSizeMax: string;
  buildingSizeMin: string;
  buildingSizeMax: string;
  condition: string;
  postedDate: string;
  sortBy: SortOption;
}

export type SortOption =
  | 'date_desc'
  | 'date_asc'
  | 'price_desc'
  | 'price_asc';

export interface PaginationState {
  page: number;
  perPage: number;
  total: number;
}
