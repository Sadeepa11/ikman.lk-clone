import type { Category } from '../types';

export interface MainCategory {
  id: string;
  label: string;
  count: number;
}

export const mainCategories: MainCategory[] = [
  { id: 'vehicles', label: 'Vehicles', count: 77722 },
  { id: 'property', label: 'Property', count: 66122 },
  { id: 'electronics', label: 'Electronics', count: 58285 },
  { id: 'mobiles', label: 'Mobiles', count: 57923 },
  { id: 'home-garden', label: 'Home & Garden', count: 17901 },
  { id: 'services', label: 'Services', count: 16241 },
  { id: 'business-industry', label: 'Business & Industry', count: 13511 },
  { id: 'jobs', label: 'Jobs', count: 9648 },
  { id: 'animals', label: 'Animals', count: 7261 },
  { id: 'hobby-sport-kids', label: 'Hobby, Sport & Kids', count: 5736 },
  { id: 'fashion-beauty', label: 'Fashion & Beauty', count: 3418 },
  { id: 'education', label: 'Education', count: 1731 },
  { id: 'essentials', label: 'Essentials', count: 796 },
  { id: 'other', label: 'Other', count: 670 },
  { id: 'agriculture', label: 'Agriculture', count: 511 },
  { id: 'work-overseas', label: 'Work Overseas', count: 171 },
];

export const categories: Category[] = [
  { id: 'houses', label: 'Houses', icon: 'Home', count: 1842 },
  { id: 'apartments', label: 'Apartments', icon: 'Building2', count: 967 },
  { id: 'land', label: 'Land', icon: 'Map', count: 2341 },
  { id: 'commercial', label: 'Commercial', icon: 'Store', count: 543 },
  { id: 'rooms', label: 'Rooms', icon: 'BedDouble', count: 328 },
  { id: 'short_term', label: 'Short Term', icon: 'CalendarDays', count: 215 },
];

export const propertyTypes = [
  { value: 'for_sale', label: 'For Sale' },
  { value: 'for_rent', label: 'For Rent' },
];

export const bedroomOptions = ['1', '2', '3', '4', '5+'];
export const bathroomOptions = ['1', '2', '3', '4+'];

export const conditionOptions = [
  { value: 'new', label: 'Brand New' },
  { value: 'used', label: 'Used' },
  { value: 'under_construction', label: 'Under Construction' },
];

export const postedDateOptions = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: '3months', label: 'Last 3 Months' },
];

export const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'featured', label: 'Featured First' },
];
