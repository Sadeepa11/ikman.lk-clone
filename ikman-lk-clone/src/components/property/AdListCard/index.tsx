import { Link } from 'react-router-dom';
import type { Property } from '../../../types';
import { useIsMobile } from '../../../hooks/useIsMobile';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (m < 60) return `${m} minutes ago`;
  if (h < 24) return `${h} hours ago`;
  if (d === 1) return 'Yesterday';
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)} weeks ago`;
  return `${Math.floor(d / 30)} months ago`;
}

interface Props {
  property: Property;
  isTop?: boolean;
}

const FA = "'Open Sans', Arial, sans-serif";

const LocationPin = () => (
  <svg width="9" height="11" viewBox="0 0 10 14" fill="none" style={{ flexShrink: 0 }}>
    <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 5 3.5 1.5 1.5 0 0 1 5 6.5z" fill="rgb(112,118,118)" />
  </svg>
);

const MemberBadge = ({ seller }: { seller: Property['seller'] }) => {
  if (!seller.verified) return null;
  const isPremier = seller.type === 'agent' || seller.type === 'developer';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="10" cy="10" r="10" fill={isPremier ? 'rgb(255,152,0)' : 'rgb(0,152,119)'} />
        <path d="M5.5 10.5l3 3L15 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 11, fontWeight: 600, fontFamily: FA, color: isPremier ? 'rgb(255,152,0)' : 'rgb(0,152,119)' }}>
        {isPremier ? 'Premier Member' : 'ikman Member'}
      </span>
    </div>
  );
};

export const AdListCard = ({ property, isTop }: Props) => {
  const img = property.images?.[0] || '';
  const isMobile = useIsMobile(480);

  const imgW = isMobile ? 110 : (isTop ? 162 : 136);
  const imgH = isMobile ? 90 : (isTop ? 122 : 102);

  if (isTop) {
    return (
      <div style={{ border: '1px solid rgb(255,203,95)', backgroundColor: '#fffbf0', marginBottom: 8, fontFamily: FA }}>
        <Link
          to={`/properties/${property.id}`}
          style={{ display: 'flex', textDecoration: 'none', color: 'inherit', padding: isMobile ? '8px 10px' : '10px 12px', gap: isMobile ? 8 : 12 }}
        >
          {/* Image */}
          <div style={{ width: imgW, height: imgH, flexShrink: 0, position: 'relative', overflow: 'hidden', backgroundColor: '#ddd' }}>
            {img && (
              <img src={img} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            )}
            <div style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 0.3, padding: '2px 7px', fontFamily: FA }}>
              Top Ad
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4, marginBottom: 3 }}>
              <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: 'rgb(47,52,50)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '1.3', flex: 1, minWidth: 0 }}>
                {property.title}
              </div>
              {!isMobile && (
                <div style={{ fontSize: 11, color: 'rgb(112,118,118)', flexShrink: 0, whiteSpace: 'nowrap', paddingTop: 2 }}>
                  {timeAgo(property.postedDate)}
                </div>
              )}
            </div>

            <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700, color: 'rgb(0,152,119)', marginBottom: 4 }}>
              Rs {property.price.toLocaleString()}
              {property.priceType === 'monthly' && <span style={{ fontSize: 12, fontWeight: 400, color: 'rgb(112,118,118)' }}> /month</span>}
              {property.priceType === 'negotiable' && <span style={{ fontSize: 11, fontWeight: 400, color: 'rgb(112,118,118)', marginLeft: 4 }}>Negotiable</span>}
            </div>

            {!isMobile && (property.bedrooms || property.bathrooms || property.buildingSize || property.landSize) && (
              <div style={{ fontSize: 12, color: 'rgb(112,118,118)', marginBottom: 6 }}>
                {[
                  property.bedrooms ? `${property.bedrooms} Beds` : null,
                  property.bathrooms ? `${property.bathrooms} Baths` : null,
                  property.buildingSize ? `${property.buildingSize.toLocaleString()} ${property.buildingSizeUnit ?? 'sqft'}` : null,
                  property.landSize ? `${property.landSize} ${property.landSizeUnit ?? 'perches'}` : null,
                ].filter(Boolean).join(' · ')}
              </div>
            )}

            <div style={{ marginTop: 'auto' }}>
              {!isMobile && <MemberBadge seller={property.seller} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <LocationPin />
                <span style={{ fontSize: 11, color: 'rgb(112,118,118)' }}>{property.city}, {property.district}</span>
              </div>
              {isMobile && <div style={{ fontSize: 11, color: 'rgb(112,118,118)', marginTop: 2 }}>{timeAgo(property.postedDate)}</div>}
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Normal card
  return (
    <div style={{ borderBottom: '1px solid rgb(231,237,238)', backgroundColor: '#fff', fontFamily: FA }}>
      <Link
        to={`/properties/${property.id}`}
        style={{ display: 'flex', textDecoration: 'none', color: 'inherit', padding: isMobile ? '8px 10px' : '8px 12px', gap: isMobile ? 8 : 10 }}
      >
        {/* Image */}
        <div style={{ width: imgW, height: imgH, flexShrink: 0, overflow: 'hidden', backgroundColor: '#ddd' }}>
          {img && (
            <img src={img} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4, marginBottom: 2 }}>
            <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: 'rgb(47,52,50)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '1.3', flex: 1, minWidth: 0 }}>
              {property.title}
            </div>
            {!isMobile && (
              <div style={{ fontSize: 11, color: 'rgb(112,118,118)', flexShrink: 0, whiteSpace: 'nowrap', paddingTop: 1 }}>
                {timeAgo(property.postedDate)}
              </div>
            )}
          </div>

          <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: 'rgb(0,152,119)', marginBottom: 3 }}>
            Rs {property.price.toLocaleString()}
            {property.priceType === 'monthly' && <span style={{ fontSize: 11, fontWeight: 400, color: 'rgb(112,118,118)' }}> /month</span>}
            {property.priceType === 'negotiable' && <span style={{ fontSize: 11, fontWeight: 400, color: 'rgb(112,118,118)', marginLeft: 4 }}>Negotiable</span>}
          </div>

          {!isMobile && (property.bedrooms || property.bathrooms) && (
            <div style={{ fontSize: 11, color: 'rgb(112,118,118)', marginBottom: 4 }}>
              {[
                property.bedrooms ? `${property.bedrooms} Beds` : null,
                property.bathrooms ? `${property.bathrooms} Baths` : null,
              ].filter(Boolean).join(' · ')}
            </div>
          )}

          <div style={{ marginTop: 'auto' }}>
            {!isMobile && <MemberBadge seller={property.seller} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <LocationPin />
              <span style={{ fontSize: 11, color: 'rgb(112,118,118)' }}>{property.city}, {property.district}</span>
            </div>
            {isMobile && <div style={{ fontSize: 11, color: 'rgb(112,118,118)', marginTop: 2 }}>{timeAgo(property.postedDate)}</div>}
          </div>
        </div>
      </Link>
    </div>
  );
};
