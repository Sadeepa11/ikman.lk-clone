import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Maximize2, Images, BadgeCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../../common/Badge';
import { FavoriteButton } from '../../common/FavoriteButton';
import { formatPriceShort, formatRelativeDate, formatLandSize } from '../../../utils/formatters';
import type { Property } from '../../../types';
import { clsx } from 'clsx';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  layout?: 'grid' | 'list';
}

export const PropertyCard = ({ property, isFavorite, onFavoriteToggle, layout = 'grid' }: PropertyCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const {
    id, title, price, priceType, district, city,
    type, bedrooms, bathrooms, landSize, landSizeUnit,
    buildingSize, featured, verified, postedDate, images,
  } = property;

  if (layout === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          to={`/properties/${id}`}
          className="flex gap-4 bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 p-3 group"
        >
          {/* Image */}
          <div className="relative flex-shrink-0 w-44 h-32 rounded-lg overflow-hidden bg-slate-100">
            {!imgError ? (
              <img
                src={images[0]}
                alt={title}
                className={clsx('w-full h-full object-cover group-hover:scale-105 transition-transform duration-500', !imgLoaded && 'opacity-0')}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Images className="w-8 h-8" />
              </div>
            )}
            {images.length > 1 && (
              <span className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                <Images className="w-3 h-3" />
                {images.length}
              </span>
            )}
            <FavoriteButton isFavorite={isFavorite} onToggle={() => onFavoriteToggle(id)} size="sm" className="absolute top-1.5 right-1.5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 py-1">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-[#149777] transition-colors leading-snug">
                {title}
              </h3>
              <div className="flex-shrink-0 text-right">
                <p className="text-base font-bold text-[#149777]">{formatPriceShort(price)}</p>
                {priceType === 'negotiable' && <span className="text-xs text-slate-400">Negotiable</span>}
                {priceType === 'monthly' && <span className="text-xs text-slate-400">/month</span>}
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
              <MapPin className="w-3 h-3 text-[#149777] flex-shrink-0" />
              <span className="truncate">{city}, {district}</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {bedrooms !== undefined && (
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <BedDouble className="w-3.5 h-3.5 text-slate-400" />{bedrooms} Bed
                </span>
              )}
              {bathrooms !== undefined && (
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <Bath className="w-3.5 h-3.5 text-slate-400" />{bathrooms} Bath
                </span>
              )}
              {landSize !== undefined && (
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400" />{formatLandSize(landSize, landSizeUnit)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              {featured && <Badge variant="featured">Featured</Badge>}
              {verified && <Badge variant="verified"><BadgeCheck className="w-2.5 h-2.5 mr-0.5 inline" />Verified</Badge>}
              <Badge variant={type === 'for_sale' ? 'sale' : 'rent'}>{type === 'for_sale' ? 'For Sale' : 'For Rent'}</Badge>
              <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />{formatRelativeDate(postedDate)}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/properties/${id}`}
        className="block bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
      >
        {/* Image */}
        <div className="relative h-52 bg-slate-100 overflow-hidden">
          {!imgError ? (
            <img
              src={images[0]}
              alt={title}
              className={clsx('w-full h-full object-cover group-hover:scale-105 transition-transform duration-500', !imgLoaded && 'opacity-0')}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
              <Images className="w-10 h-10" />
              <span className="text-xs">No image</span>
            </div>
          )}

          {/* Overlay badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {featured && <Badge variant="featured">⭐ Featured</Badge>}
            <Badge variant={type === 'for_sale' ? 'sale' : 'rent'}>{type === 'for_sale' ? 'For Sale' : 'For Rent'}</Badge>
          </div>

          {images.length > 1 && (
            <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
              <Images className="w-3 h-3" />{images.length} photos
            </span>
          )}

          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onFavoriteToggle(id)}
            className="absolute top-2.5 right-2.5"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-[#149777] transition-colors leading-snug flex-1">
              {title}
            </h3>
          </div>

          <p className="text-lg font-bold text-[#149777] mb-1">
            {formatPriceShort(price)}
            {priceType === 'monthly' && <span className="text-sm font-normal text-slate-500"> /mo</span>}
            {priceType === 'negotiable' && <span className="text-xs font-normal text-slate-400 ml-1">(Neg)</span>}
          </p>

          <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
            <MapPin className="w-3 h-3 text-[#149777] flex-shrink-0" />
            <span className="truncate">{city}, {district}</span>
          </div>

          {/* Property specs */}
          {(bedrooms !== undefined || bathrooms !== undefined || landSize !== undefined || buildingSize !== undefined) && (
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-3 flex-wrap">
              {bedrooms !== undefined && (
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <BedDouble className="w-3.5 h-3.5 text-slate-400" />{bedrooms}
                </span>
              )}
              {bathrooms !== undefined && (
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <Bath className="w-3.5 h-3.5 text-slate-400" />{bathrooms}
                </span>
              )}
              {landSize !== undefined && (
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400" />{formatLandSize(landSize, landSizeUnit)}
                </span>
              )}
              {buildingSize !== undefined && !landSize && (
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400" />{buildingSize.toLocaleString()} sqft
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {verified && (
                <span className="flex items-center gap-0.5 text-green-600 text-xs font-medium">
                  <BadgeCheck className="w-3.5 h-3.5" />Verified
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />{formatRelativeDate(postedDate)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
