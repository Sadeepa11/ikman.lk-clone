import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, BedDouble, Bath, Maximize2, BadgeCheck, Clock, Share2,
  Flag, Phone, MessageCircle, Eye, CalendarDays, Home as HomeIcon,
  ChevronLeft, CheckCircle2, Car,
} from 'lucide-react';
import { ImageGallery } from '../../components/common/ImageGallery';
import { FavoriteButton } from '../../components/common/FavoriteButton';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { PropertyCard } from '../../components/property/PropertyCard';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { useFavorites } from '../../hooks/useFavorites';
import { getPropertyById, getRelatedProperties } from '../../data/properties';
import { formatPrice, formatRelativeDate, formatLandSize } from '../../utils/formatters';

const categoryLabels: Record<string, string> = {
  houses: 'Houses', apartments: 'Apartments', land: 'Land',
  commercial: 'Commercial', rooms: 'Rooms', short_term: 'Short Term',
};

interface SpecRowProps { label: string; value: string; }
const SpecRow = ({ label, value }: SpecRowProps) => (
  <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
    <span className="text-sm text-slate-500">{label}</span>
    <span className="text-sm font-medium text-slate-800">{value}</span>
  </div>
);

export const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggle, isFavorite } = useFavorites();
  const [showPhone, setShowPhone] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const property = id ? getPropertyById(id) : null;

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Property Not Found</h2>
        <p className="text-slate-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/properties')}>Browse Properties</Button>
      </div>
    );
  }

  const related = getRelatedProperties(property);

  const {
    title, price, priceType, district, city, address, category,
    type, bedrooms, bathrooms, parking, landSize, landSizeUnit,
    buildingSize, buildingSizeUnit, condition, featured,
    postedDate, description, seller, images, views, amenities,
  } = property;

  const conditionLabel = { new: 'Brand New', used: 'Used', under_construction: 'Under Construction' }[condition];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back button + breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-slate-300">|</span>
          <Breadcrumb
            items={[
              { label: 'Property', href: '/properties' },
              { label: categoryLabels[category] || category, href: `/properties?category=${category}` },
              { label: district, href: `/properties?district=${district}` },
              { label: title },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Image gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 p-4">
              <ImageGallery images={images} title={title} />
            </div>

            {/* Title & Price */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {featured && <Badge variant="featured">⭐ Featured</Badge>}
                    <Badge variant={type === 'for_sale' ? 'sale' : 'rent'} size="md">
                      {type === 'for_sale' ? 'For Sale' : 'For Rent'}
                    </Badge>
                    <Badge variant="info" size="md">{categoryLabels[category]}</Badge>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-3">{title}</h1>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 text-[#149777] flex-shrink-0" />
                    <span>{address}, {city}, {district}</span>
                  </div>
                </div>
                <FavoriteButton isFavorite={isFavorite(id!)} onToggle={() => toggle(id!)} />
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-3xl font-black text-[#149777]">
                    {formatPrice(price, priceType)}
                  </p>
                  {priceType === 'negotiable' && <p className="text-xs text-slate-400 mt-0.5">Price is negotiable</p>}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{views.toLocaleString()} views</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{formatRelativeDate(postedDate)}</span>
                  <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />{new Date(postedDate).toLocaleDateString('en-GB')}</span>
                </div>
              </div>
            </div>

            {/* Key specs */}
            {(bedrooms !== undefined || bathrooms !== undefined || landSize !== undefined || buildingSize !== undefined) && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                <h2 className="font-semibold text-slate-800 mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bedrooms !== undefined && (
                    <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl gap-2">
                      <BedDouble className="w-5 h-5 text-[#149777]" />
                      <span className="text-lg font-bold text-slate-800">{bedrooms}</span>
                      <span className="text-xs text-slate-500">Bedrooms</span>
                    </div>
                  )}
                  {bathrooms !== undefined && (
                    <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl gap-2">
                      <Bath className="w-5 h-5 text-[#149777]" />
                      <span className="text-lg font-bold text-slate-800">{bathrooms}</span>
                      <span className="text-xs text-slate-500">Bathrooms</span>
                    </div>
                  )}
                  {parking !== undefined && (
                    <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl gap-2">
                      <Car className="w-5 h-5 text-[#149777]" />
                      <span className="text-lg font-bold text-slate-800">{parking}</span>
                      <span className="text-xs text-slate-500">Parking</span>
                    </div>
                  )}
                  {landSize !== undefined && (
                    <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl gap-2">
                      <Maximize2 className="w-5 h-5 text-[#149777]" />
                      <span className="text-lg font-bold text-slate-800">{landSize}</span>
                      <span className="text-xs text-slate-500">{landSizeUnit === 'perches' ? 'Perches' : 'Acres'}</span>
                    </div>
                  )}
                  {buildingSize !== undefined && (
                    <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl gap-2">
                      <HomeIcon className="w-5 h-5 text-[#149777]" />
                      <span className="text-lg font-bold text-slate-800">{buildingSize.toLocaleString()}</span>
                      <span className="text-xs text-slate-500">{buildingSizeUnit}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Spec table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h2 className="font-semibold text-slate-800 mb-3">Specifications</h2>
              <SpecRow label="Category" value={categoryLabels[category]} />
              <SpecRow label="Property For" value={type === 'for_sale' ? 'Sale' : 'Rent'} />
              <SpecRow label="Condition" value={conditionLabel} />
              {landSize !== undefined && <SpecRow label="Land Size" value={formatLandSize(landSize, landSizeUnit)} />}
              {buildingSize !== undefined && <SpecRow label="Building Size" value={`${buildingSize.toLocaleString()} ${buildingSizeUnit}`} />}
              {bedrooms !== undefined && <SpecRow label="Bedrooms" value={String(bedrooms)} />}
              {bathrooms !== undefined && <SpecRow label="Bathrooms" value={String(bathrooms)} />}
              {parking !== undefined && <SpecRow label="Parking" value={String(parking)} />}
              <SpecRow label="District" value={district} />
              <SpecRow label="City" value={city} />
              <SpecRow label="Listed Date" value={new Date(postedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
              <SpecRow label="Reference" value={`PROP-${id?.toUpperCase()}`} />
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h2 className="font-semibold text-slate-800 mb-3">Description</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{description}</p>
            </div>

            {/* Amenities */}
            {amenities && amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                <h2 className="font-semibold text-slate-800 mb-3">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {amenities.map(a => (
                    <div key={a} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setShareOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button
                onClick={() => setReportOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Flag className="w-4 h-4" /> Report
              </button>
            </div>

            {/* Related properties */}
            {related.length > 0 && (
              <div>
                <h2 className="font-semibold text-slate-800 mb-4">Related Properties</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map(p => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      isFavorite={isFavorite(p.id)}
                      onFavoriteToggle={toggle}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Contact card (sticky) */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-4">
              {/* Seller card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-5"
              >
                <h3 className="font-semibold text-slate-800 mb-4 text-sm">Contact Seller</h3>

                {/* Seller info */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <Avatar name={seller.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-800 text-sm truncate">{seller.name}</span>
                      {seller.verified && <BadgeCheck className="w-4 h-4 text-green-500 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Badge variant={seller.type === 'agent' ? 'agent' : seller.type === 'developer' ? 'developer' : 'owner'} size="sm">
                        {seller.type}
                      </Badge>
                      {seller.listings !== undefined && seller.listings > 1 && (
                        <span className="text-xs text-slate-400">{seller.listings} listings</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Member since {new Date(seller.memberSince).getFullYear()}
                    </p>
                  </div>
                </div>

                {/* Contact actions */}
                <div className="space-y-2.5">
                  {!showPhone ? (
                    <Button
                      fullWidth
                      onClick={() => setShowPhone(true)}
                      leftIcon={<Phone className="w-4 h-4" />}
                    >
                      Show Phone Number
                    </Button>
                  ) : (
                    <a
                      href={`tel:${seller.phone}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {seller.phone}
                    </a>
                  )}

                  <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Chat with Seller
                  </button>
                </div>

                <p className="text-xs text-slate-400 text-center mt-3">
                  Always meet in a safe public place
                </p>
              </motion.div>

              {/* Price card */}
              <div className="bg-[#e8f7f4] rounded-xl border border-[#149777]/30 p-4">
                <p className="text-xs text-slate-500 mb-1">Asking Price</p>
                <p className="text-2xl font-black text-[#149777]">{formatPrice(price, priceType)}</p>
                {priceType === 'negotiable' && (
                  <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Price is negotiable
                  </p>
                )}
              </div>

              {/* Safety tips */}
              <div className="bg-amber-50 rounded-xl border border-amber-100 p-4">
                <h4 className="text-xs font-semibold text-amber-800 mb-2">Safety Tips</h4>
                <ul className="space-y-1">
                  {[
                    'Verify property documents before payment',
                    'Visit the property in person',
                    'Never pay without seeing the property',
                    'Use secure payment methods',
                  ].map(tip => (
                    <li key={tip} className="text-xs text-amber-700 flex items-start gap-1.5">
                      <span className="text-amber-500 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share modal */}
      <Modal isOpen={shareOpen} onClose={() => setShareOpen(false)} title="Share this Property" size="sm">
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Share this listing with others:</p>
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 font-mono break-all">
            {window.location.href}
          </div>
          <Button
            fullWidth
            onClick={() => { navigator.clipboard.writeText(window.location.href); setShareOpen(false); }}
          >
            Copy Link
          </Button>
        </div>
      </Modal>

      {/* Report modal */}
      <Modal isOpen={reportOpen} onClose={() => setReportOpen(false)} title="Report this Listing" size="sm">
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Why are you reporting this listing?</p>
          {['Fraudulent listing', 'Wrong category', 'Duplicate post', 'Offensive content', 'Other'].map(reason => (
            <button
              key={reason}
              onClick={() => setReportOpen(false)}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 border border-slate-200 rounded-lg hover:border-[#149777]/50 hover:text-[#007168] transition-colors"
            >
              {reason}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};
