import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Maximize2, BadgeCheck, Star, Images } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../../common/Badge';
import { FavoriteButton } from '../../common/FavoriteButton';
import { formatPriceShort, formatRelativeDate, formatLandSize } from '../../../utils/formatters';
import type { Property } from '../../../types';
import { clsx } from 'clsx';

interface FeaturedPropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

export const FeaturedPropertyCard = ({ property, isFavorite, onFavoriteToggle }: FeaturedPropertyCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const {
    id, title, price, priceType, district, city,
    bedrooms, bathrooms, landSize, landSizeUnit, buildingSize,
    verified, postedDate, images, type,
  } = property;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/properties/${id}`}
        className="block bg-white border-2 border-amber-300 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
      >
        {/* Image */}
        <div className="relative h-56 bg-slate-100 overflow-hidden">
          {images[0] && (
            <img
              src={images[0]}
              alt={title}
              className={clsx('w-full h-full object-cover group-hover:scale-105 transition-transform duration-500', !imgLoaded && 'opacity-0')}
              onLoad={() => setImgLoaded(true)}
            />
          )}

          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              <Star className="w-3 h-3 fill-white" /> FEATURED
            </span>
            <Badge variant={type === 'for_sale' ? 'sale' : 'rent'}>{type === 'for_sale' ? 'For Sale' : 'For Rent'}</Badge>
          </div>

          {images.length > 1 && (
            <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
              <Images className="w-3 h-3" />{images.length}
            </span>
          )}

          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onFavoriteToggle(id)}
            className="absolute top-2.5 right-2.5"
          />
        </div>

        {/* Content */}
        <div className="p-4 border-t-2 border-amber-200">
          <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-[#149777] transition-colors mb-1 leading-snug">
            {title}
          </h3>

          <p className="text-xl font-black text-[#149777] mb-1">
            {formatPriceShort(price)}
            {priceType === 'monthly' && <span className="text-sm font-normal text-slate-500"> /mo</span>}
          </p>

          <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
            <MapPin className="w-3 h-3 text-[#149777]" />
            <span className="truncate">{city}, {district}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
            {bedrooms !== undefined && (
              <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-slate-400" />{bedrooms} Bed</span>
            )}
            {bathrooms !== undefined && (
              <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-slate-400" />{bathrooms} Bath</span>
            )}
            {landSize !== undefined && (
              <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-slate-400" />{formatLandSize(landSize, landSizeUnit)}</span>
            )}
            {buildingSize !== undefined && !landSize && (
              <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-slate-400" />{buildingSize.toLocaleString()} sqft</span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-100">
            {verified && (
              <span className="flex items-center gap-0.5 text-green-600 text-xs font-medium">
                <BadgeCheck className="w-3.5 h-3.5" />Verified
              </span>
            )}
            <span className="text-xs text-slate-400 ml-auto">{formatRelativeDate(postedDate)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
