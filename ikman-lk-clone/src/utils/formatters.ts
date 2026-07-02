export const formatPrice = (price: number, type: 'fixed' | 'negotiable' | 'monthly' = 'fixed'): string => {
  const formatted = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0,
  }).format(price);

  if (type === 'monthly') return `${formatted} /mo`;
  if (type === 'negotiable') return `${formatted} (Neg)`;
  return formatted;
};

export const formatPriceShort = (price: number): string => {
  if (price >= 1_000_000_000) return `Rs. ${(price / 1_000_000_000).toFixed(1)}B`;
  if (price >= 1_000_000) return `Rs. ${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `Rs. ${(price / 1_000).toFixed(0)}K`;
  return `Rs. ${price}`;
};

export const formatLandSize = (size: number, unit?: 'perches' | 'acres'): string => {
  const u = unit ?? 'perches';
  return `${size} ${u === 'perches' ? (size === 1 ? 'Perch' : 'Perches') : (size === 1 ? 'Acre' : 'Acres')}`;
};

export const formatBuildingSize = (size: number, unit: 'sqft' | 'sqm'): string =>
  `${size.toLocaleString()} ${unit}`;

export const formatRelativeDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
};

export const formatNumber = (n: number): string => n.toLocaleString('en-LK');
