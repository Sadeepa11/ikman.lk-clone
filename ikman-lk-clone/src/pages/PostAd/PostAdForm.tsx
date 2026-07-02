import { useState, useRef } from 'react';

const FA = "'Open Sans', Arial, Helvetica, sans-serif";

const inputStyle: React.CSSProperties = {
  fontSize: 14, width: '100%',
  border: '1px solid rgb(212,222,217)', borderRadius: 2,
  padding: '6px 6px 6px 12px', height: 32,
  fontFamily: FA, outline: 'none', backgroundColor: '#fff',
  color: 'rgb(47,52,50)', appearance: 'none' as const, boxSizing: 'border-box',
};

const labelSt: React.CSSProperties = {
  fontSize: 12, color: 'rgb(112,118,118)',
  marginBottom: 4, display: 'block', fontFamily: FA,
};

const fieldWrap: React.CSSProperties = { paddingBottom: 12 };

// ── Icons ──────────────────────────────────────────────────────────────────

const LocationIcon = () => (
  <svg viewBox="0 0 60 60" width="32" height="32" style={{ fill: 'rgb(0,152,119)', flexShrink: 0 }}>
    <path d="M30 10c-8.4 0-15.3 6.7-15.3 15 0 4.7 2.3 10.2 6.8 16.5 3.3 4.5 6.5 7.7 6.6 7.8.5.5 1.1.7 1.8.7s1.3-.2 1.8-.7c.1-.1 3.4-3.3 6.6-7.8 4.5-6.2 6.8-11.8 6.8-16.5.2-8.3-6.7-15-15.1-15zm0 8.8c3.5 0 6.4 2.8 6.4 6.2s-2.9 6.2-6.4 6.2c-3.5 0-6.4-2.8-6.4-6.2s2.9-6.2 6.4-6.2" />
  </svg>
);

const CategoryIcon = () => (
  <svg viewBox="0 0 60 60" width="32" height="32" style={{ fill: 'rgb(0,152,119)', flexShrink: 0 }}>
    <path d="M47.834 26.901l-2.56-9.803c-.448-1.874-1.41-2.85-3.256-3.307l-9.655-2.599c-1.846-.456-3.134-.124-4.478 1.24L12.007 28.555c-1.343 1.364-1.343 3.596 0 4.96L25.85 47.57a3.427 3.427 0 0 0 4.885 0l15.878-16.122c1.344-1.364 1.67-2.672 1.22-4.547zm-12.62-2.894a3.546 3.546 0 0 1 0-4.96 3.418 3.418 0 0 1 4.885 0 3.545 3.545 0 0 1 0 4.96 3.417 3.417 0 0 1-4.886 0z" />
  </svg>
);

const ChevronDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: 0, pointerEvents: 'none' }}>
    <g fillRule="evenodd">
      <path fill="none" d="M0 0h24v24H0z" />
      <path fillRule="nonzero" d="M7.41 8L12 12.58 16.59 8 18 9.41l-6 6-6-6z" fill="rgb(175,183,173)" />
    </g>
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16">
    <g fill="#707676" fillRule="nonzero">
      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.4c-3.52 0-6.4-2.88-6.4-6.4 0-3.52 2.88-6.4 6.4-6.4 3.52 0 6.4 2.88 6.4 6.4 0 3.52-2.88 6.4-6.4 6.4z" />
      <path d="M8 4C6.64 4 5.6 5.04 5.6 6.4h1.6c0-.48.32-.8.8-.8.48 0 .8.32.8.8 0 .32-.16.56-.4.72-.72.4-1.2 1.2-1.2 2.08v.4h1.6v-.4c0-.32.16-.56.32-.64.8-.4 1.28-1.2 1.28-2.08C10.4 5.04 9.36 4 8 4zM7.2 10.4h1.6V12H7.2z" />
    </g>
  </svg>
);

// ── Reusable controlled UI pieces ───────────────────────────────────────────

const Divider = () => (
  <div style={{ borderBottom: '1px solid rgb(212,222,217)', width: '100%', margin: '8px 0' }} />
);

interface DropdownProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}
const Dropdown = ({ label, placeholder, value, onChange, options }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ ...fieldWrap, position: 'relative' }}>
      <label style={labelSt}>{label}</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', height: 32,
          border: '1px solid rgb(212,222,217)', borderRadius: 2,
          paddingLeft: 8, background: '#fff',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 14, fontFamily: FA,
          color: value ? 'rgb(47,52,50)' : 'rgb(175,183,173)',
          cursor: 'pointer',
        }}
      >
        <span>{value || placeholder || label}</span>
        <ChevronDown />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
          background: '#fff', border: '1px solid rgb(212,222,217)', borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        }}>
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding: '8px 12px', cursor: 'pointer', fontSize: 14,
                fontFamily: FA, color: 'rgb(47,52,50)',
                backgroundColor: value === opt ? 'rgb(243,246,245)' : '#fff',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgb(243,246,245)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = value === opt ? 'rgb(243,246,245)' : '#fff')}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
      <div style={{ minHeight: 20 }} />
    </div>
  );
};

interface TextInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}
const TextInput = ({ label, placeholder, type = 'text', value, onChange }: TextInputProps) => (
  <div style={fieldWrap}>
    <label style={labelSt}>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={inputStyle}
    />
    <div style={{ minHeight: 20 }} />
  </div>
);

interface CheckboxRowProps { label: string; checked: boolean; onChange: (v: boolean) => void; }
const CheckboxRow = ({ label, checked, onChange }: CheckboxRowProps) => (
  <div
    onClick={() => onChange(!checked)}
    style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', color: 'rgb(66,78,78)', fontFamily: FA, fontSize: 14 }}
  >
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 14, height: 14, borderRadius: 4,
      border: `1px solid ${checked ? 'rgb(0,116,186)' : 'rgb(175,183,173)'}`,
      backgroundColor: checked ? 'rgb(0,116,186)' : '#fff',
      flexShrink: 0, marginTop: 3, marginRight: 8, marginBottom: 10,
    }}>
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span>{label}</span>
  </div>
);

interface RadioRowProps { label: string; checked: boolean; onChange: () => void; }
const RadioRow = ({ label, checked, onChange }: RadioRowProps) => (
  <div onClick={onChange} style={{ display: 'flex', alignItems: 'center', marginBottom: 12, cursor: 'pointer' }}>
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 14, height: 14, borderRadius: '50%',
      border: `1px solid ${checked ? 'rgb(0,116,186)' : 'rgb(175,183,173)'}`,
      flexShrink: 0, marginRight: 8,
    }}>
      {checked && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'rgb(0,116,186)' }} />}
    </span>
    <span style={{ fontFamily: FA, fontSize: 14, color: 'rgb(66,78,78)' }}>{label}</span>
  </div>
);

// ── Photo box with real upload support ──────────────────────────────────────

const PhotoBox = ({ active, imageUrl, onFile }: { active: boolean; imageUrl?: string; onFile?: (f: File) => void }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => active && ref.current?.click()}
      style={{
        width: 92, height: 92, flexShrink: 0,
        border: `1px solid ${imageUrl ? 'rgb(0,152,119)' : active ? 'rgb(0,116,186)' : 'rgb(212,222,217)'}`,
        borderRadius: 2, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: imageUrl ? 'center' : 'flex-start',
        paddingTop: imageUrl ? 0 : 20, cursor: active ? 'pointer' : 'default',
        color: active ? 'rgb(0,116,186)' : 'rgb(212,222,217)',
        overflow: 'hidden', position: 'relative',
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <>
          <svg viewBox="0 0 24 24" width="24" height="24" fill={active ? 'rgb(0,116,186)' : 'rgb(212,222,217)'}>
            <path d="M19.4 17.44l-2.1-6.76-2.45 1.5-1.5-3.7-4 6.45-1.15-1.71-4.08 4.22 15.18-.05zM7.47 9.53A1.44 1.44 0 1 1 6 8.05a1.46 1.46 0 0 1 1.47 1.48zM2.93 5.08h18.14v13.84H2.93zM1.5 20.4h21V3.6h-21z" fillRule="evenodd" />
          </svg>
          <div style={{ fontSize: 12, marginTop: 4, fontFamily: FA, textAlign: 'center' }}>Add a photo</div>
        </>
      )}
      {active && (
        <input
          ref={ref}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f && onFile) onFile(f); }}
        />
      )}
    </div>
  );
};

const PhotoGrid = ({ images, onFile }: { images: (string | null)[]; onFile: (i: number, f: File) => void }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {images.map((url, i) => (
      <PhotoBox
        key={i}
        active={i === 0 || images[i - 1] !== null}
        imageUrl={url ?? undefined}
        onFile={f => onFile(i, f)}
      />
    ))}
  </div>
);

// ── Category-specific field sections ────────────────────────────────────────

interface LandFields { landTypes: Record<string, boolean>; landSize: string; landUnit: string; }
const LandForSaleFields = ({ f, set }: { f: LandFields; set: (v: LandFields) => void }) => (
  <>
    <div style={fieldWrap}>
      <div style={{ fontSize: 12, color: 'rgb(112,118,118)', marginBottom: 8, fontFamily: FA }}>Land type</div>
      <div style={{ columnCount: 2 }}>
        {['Agricultural', 'Commercial', 'Residential', 'Other'].map(l => (
          <CheckboxRow
            key={l} label={l}
            checked={!!f.landTypes[l]}
            onChange={v => set({ ...f, landTypes: { ...f.landTypes, [l]: v } })}
          />
        ))}
      </div>
      <div style={{ minHeight: 20 }} />
    </div>
    <div style={{ display: 'flex', gap: 16, paddingBottom: 12 }}>
      <div style={{ flex: '3 1 0%' }}>
        <label style={labelSt}>Land size</label>
        <input
          type="number" placeholder="What's the size of your land?"
          value={f.landSize}
          onChange={e => set({ ...f, landSize: e.target.value })}
          style={inputStyle}
        />
        <div style={{ minHeight: 20 }} />
      </div>
      <div style={{ flex: '1 1 0%', position: 'relative' }}>
        <label style={labelSt}>Unit</label>
        <Dropdown
          label="Unit" value={f.landUnit}
          onChange={v => set({ ...f, landUnit: v })}
          options={['perches', 'acres', 'hectares', 'sq ft']}
        />
      </div>
    </div>
  </>
);

interface HouseFields { bedrooms: string; bathrooms: string; landSize: string; landUnit: string; houseSize: string; }
const HousesForSaleFields = ({ f, set }: { f: HouseFields; set: (v: HouseFields) => void }) => (
  <>
    <Dropdown label="Bedrooms" placeholder="Bedrooms" value={f.bedrooms} onChange={v => set({ ...f, bedrooms: v })} options={['1','2','3','4','5','6','7','8+']} />
    <Dropdown label="Bathrooms" placeholder="Bathrooms" value={f.bathrooms} onChange={v => set({ ...f, bathrooms: v })} options={['1','2','3','4','5+']} />
    <div style={{ display: 'flex', gap: 16, paddingBottom: 12 }}>
      <div style={{ flex: '3 1 0%' }}>
        <label style={labelSt}>Land size</label>
        <input type="number" placeholder="What's the size of your land?" value={f.landSize} onChange={e => set({ ...f, landSize: e.target.value })} style={inputStyle} />
        <div style={{ minHeight: 20 }} />
      </div>
      <div style={{ flex: '1 1 0%' }}>
        <Dropdown label="Unit" value={f.landUnit} onChange={v => set({ ...f, landUnit: v })} options={['perches','acres','hectares','sq ft']} />
      </div>
    </div>
    <TextInput label="House size (sqft)" placeholder="What's the size of your property?" type="number" value={f.houseSize} onChange={v => set({ ...f, houseSize: v })} />
  </>
);

interface ApartmentFields { bedrooms: string; bathrooms: string; size: string; completion: string; furnished: string; complex: string; }
const ApartmentsForSaleFields = ({ f, set }: { f: ApartmentFields; set: (v: ApartmentFields) => void }) => (
  <>
    <Dropdown label="Bedrooms" placeholder="Bedrooms" value={f.bedrooms} onChange={v => set({ ...f, bedrooms: v })} options={['1','2','3','4','5','6','7','8+']} />
    <Dropdown label="Bathrooms" placeholder="Bathrooms" value={f.bathrooms} onChange={v => set({ ...f, bathrooms: v })} options={['1','2','3','4','5+']} />
    <TextInput label="Size (sqft)" placeholder="What's the size of your property?" type="number" value={f.size} onChange={v => set({ ...f, size: v })} />
    <div style={fieldWrap}>
      <div style={{ fontSize: 12, color: 'rgb(112,118,118)', marginBottom: 8, fontFamily: FA }}>Completion Status</div>
      {['Ready','Ongoing','Upcoming'].map(l => <RadioRow key={l} label={l} checked={f.completion === l} onChange={() => set({ ...f, completion: l })} />)}
      <div style={{ minHeight: 20 }} />
    </div>
    <div style={fieldWrap}>
      <div style={{ fontSize: 12, color: 'rgb(112,118,118)', marginBottom: 8, fontFamily: FA }}>Furnished status</div>
      {['Unfurnished','Semi furnished','Fully furnished'].map(l => <RadioRow key={l} label={l} checked={f.furnished === l} onChange={() => set({ ...f, furnished: l })} />)}
      <div style={{ minHeight: 20 }} />
    </div>
    <div style={fieldWrap}>
      <label style={labelSt}>Apartment Complex</label>
      <div style={{ position: 'relative' }}>
        <svg width="17" height="17" viewBox="0 0 17 17" fill="rgb(112,118,118)" style={{ position: 'absolute', top: 7, left: 6 }} fillRule="evenodd">
          <path d="M7.615 15.23a7.615 7.615 0 1 1 6.1-3.054l2.966 2.967a1.088 1.088 0 0 1-1.539 1.538l-2.966-2.966a7.582 7.582 0 0 1-4.56 1.516zm5.44-7.615a5.44 5.44 0 1 1-10.88 0 5.44 5.44 0 0 1 10.88 0z" />
        </svg>
        <input type="search" placeholder="Apartment Complex" value={f.complex} onChange={e => set({ ...f, complex: e.target.value })} style={{ ...inputStyle, paddingLeft: 28 }} />
      </div>
      <div style={{ minHeight: 20 }} />
    </div>
  </>
);

interface CommercialFields { propertyType: string; size: string; }
const CommercialPropertiesFields = ({ f, set }: { f: CommercialFields; set: (v: CommercialFields) => void }) => (
  <>
    <Dropdown label="Property type" placeholder="Property type" value={f.propertyType} onChange={v => set({ ...f, propertyType: v })} options={['Office Space','Retail Shop','Warehouse','Industrial','Hotel','Other']} />
    <TextInput label="Size (sqft)" placeholder="What's the size of your property?" type="number" value={f.size} onChange={v => set({ ...f, size: v })} />
  </>
);

// ── Rent category field sections ─────────────────────────────────────────────

interface HouseRentFields { bedrooms: string; bathrooms: string; landSize: string; landUnit: string; houseSize: string; }
const HouseRentalsFields = ({ f, set }: { f: HouseRentFields; set: (v: HouseRentFields) => void }) => (
  <>
    <Dropdown label="Bedrooms" placeholder="Bedrooms" value={f.bedrooms} onChange={v => set({ ...f, bedrooms: v })} options={['1','2','3','4','5','6','7','8+']} />
    <Dropdown label="Bathrooms" placeholder="Bathrooms" value={f.bathrooms} onChange={v => set({ ...f, bathrooms: v })} options={['1','2','3','4','5+']} />
    <div style={{ display: 'flex', gap: 16, paddingBottom: 12 }}>
      <div style={{ flex: '3 1 0%' }}>
        <label style={labelSt}>Land size</label>
        <input type="number" placeholder="What's the size of your land?" value={f.landSize} onChange={e => set({ ...f, landSize: e.target.value })} style={inputStyle} />
        <div style={{ minHeight: 20 }} />
      </div>
      <div style={{ flex: '1 1 0%' }}>
        <Dropdown label="Unit" value={f.landUnit} onChange={v => set({ ...f, landUnit: v })} options={['perches','acres','hectares','sq ft']} />
      </div>
    </div>
    <TextInput label="House size (sqft)" placeholder="What's the size of your property?" type="number" value={f.houseSize} onChange={v => set({ ...f, houseSize: v })} />
  </>
);

interface AptRentFields { bedrooms: string; bathrooms: string; size: string; furnished: string; complex: string; }
const ApartmentRentalsFields = ({ f, set }: { f: AptRentFields; set: (v: AptRentFields) => void }) => (
  <>
    <Dropdown label="Bedrooms" placeholder="Bedrooms" value={f.bedrooms} onChange={v => set({ ...f, bedrooms: v })} options={['1','2','3','4','5','6','7','8+']} />
    <Dropdown label="Bathrooms" placeholder="Bathrooms" value={f.bathrooms} onChange={v => set({ ...f, bathrooms: v })} options={['1','2','3','4','5+']} />
    <TextInput label="Size (sqft)" placeholder="What's the size of your property?" type="number" value={f.size} onChange={v => set({ ...f, size: v })} />
    <div style={fieldWrap}>
      <div style={{ fontSize: 12, color: 'rgb(112,118,118)', marginBottom: 8, fontFamily: FA }}>Furnished status</div>
      {['Unfurnished','Semi furnished','Fully furnished'].map(l => <RadioRow key={l} label={l} checked={f.furnished === l} onChange={() => set({ ...f, furnished: l })} />)}
      <div style={{ minHeight: 20 }} />
    </div>
    <div style={fieldWrap}>
      <label style={labelSt}>Apartment Complex</label>
      <div style={{ position: 'relative' }}>
        <svg width="17" height="17" viewBox="0 0 17 17" fill="rgb(112,118,118)" style={{ position: 'absolute', top: 7, left: 6 }} fillRule="evenodd">
          <path d="M7.615 15.23a7.615 7.615 0 1 1 6.1-3.054l2.966 2.967a1.088 1.088 0 0 1-1.539 1.538l-2.966-2.966a7.582 7.582 0 0 1-4.56 1.516zm5.44-7.615a5.44 5.44 0 1 1-10.88 0 5.44 5.44 0 0 1 10.88 0z" />
        </svg>
        <input type="search" placeholder="Apartment Complex" value={f.complex} onChange={e => set({ ...f, complex: e.target.value })} style={{ ...inputStyle, paddingLeft: 28 }} />
      </div>
      <div style={{ minHeight: 20 }} />
    </div>
  </>
);

interface CommRentFields { propertyType: string; size: string; }
const CommercialPropertyRentalsFields = ({ f, set }: { f: CommRentFields; set: (v: CommRentFields) => void }) => (
  <>
    <Dropdown label="Property type" placeholder="Property type" value={f.propertyType} onChange={v => set({ ...f, propertyType: v })} options={['Office Space','Retail Shop','Warehouse','Industrial','Hotel','Other']} />
    <TextInput label="Size (sqft)" placeholder="What's the size of your property?" type="number" value={f.size} onChange={v => set({ ...f, size: v })} />
  </>
);

interface RoomAnnexFields { bedrooms: string; bathrooms: string; size: string; furnished: string; }
const RoomAnnexRentalsFields = ({ f, set }: { f: RoomAnnexFields; set: (v: RoomAnnexFields) => void }) => (
  <>
    <Dropdown label="Bedrooms" placeholder="Bedrooms" value={f.bedrooms} onChange={v => set({ ...f, bedrooms: v })} options={['1','2','3','4','5','6','7','8+']} />
    <Dropdown label="Bathrooms" placeholder="Bathrooms" value={f.bathrooms} onChange={v => set({ ...f, bathrooms: v })} options={['1','2','3','4','5+']} />
    <TextInput label="Size (sqft)" placeholder="What's the size of your property?" type="number" value={f.size} onChange={v => set({ ...f, size: v })} />
    <div style={fieldWrap}>
      <div style={{ fontSize: 12, color: 'rgb(112,118,118)', marginBottom: 8, fontFamily: FA }}>Furnished status</div>
      {['Unfurnished','Semi furnished','Fully furnished'].map(l => <RadioRow key={l} label={l} checked={f.furnished === l} onChange={() => set({ ...f, furnished: l })} />)}
      <div style={{ minHeight: 20 }} />
    </div>
  </>
);

interface HolidayFields { bedrooms: string; bathrooms: string; propertyType: string; }
const HolidayRentalFields = ({ f, set }: { f: HolidayFields; set: (v: HolidayFields) => void }) => (
  <>
    <Dropdown label="Bedrooms" placeholder="Bedrooms" value={f.bedrooms} onChange={v => set({ ...f, bedrooms: v })} options={['1','2','3','4','5','6','7','8+']} />
    <Dropdown label="Bathrooms" placeholder="Bathrooms" value={f.bathrooms} onChange={v => set({ ...f, bathrooms: v })} options={['1','2','3','4','5+']} />
    <Dropdown label="Property type" placeholder="Property type" value={f.propertyType} onChange={v => set({ ...f, propertyType: v })} options={['House','Villa','Apartment','Bungalow','Boutique Hotel','Other']} />
  </>
);

interface LandRentFields { landTypes: Record<string, boolean>; landSize: string; landUnit: string; }
const LandRentalsFields = ({ f, set }: { f: LandRentFields; set: (v: LandRentFields) => void }) => (
  <>
    <div style={fieldWrap}>
      <div style={{ fontSize: 12, color: 'rgb(112,118,118)', marginBottom: 8, fontFamily: FA }}>Land type</div>
      <div style={{ columnCount: 2 }}>
        {['Agricultural', 'Commercial', 'Residential', 'Other'].map(l => (
          <CheckboxRow
            key={l} label={l}
            checked={!!f.landTypes[l]}
            onChange={v => set({ ...f, landTypes: { ...f.landTypes, [l]: v } })}
          />
        ))}
      </div>
      <div style={{ minHeight: 20 }} />
    </div>
    <div style={{ display: 'flex', gap: 16, paddingBottom: 12 }}>
      <div style={{ flex: '3 1 0%' }}>
        <label style={labelSt}>Land size</label>
        <input type="number" placeholder="What's the size of your land?" value={f.landSize} onChange={e => set({ ...f, landSize: e.target.value })} style={inputStyle} />
        <div style={{ minHeight: 20 }} />
      </div>
      <div style={{ flex: '1 1 0%' }}>
        <Dropdown label="Unit" value={f.landUnit} onChange={v => set({ ...f, landUnit: v })} options={['perches','acres','hectares','sq ft']} />
      </div>
    </div>
  </>
);

// ── Common shared fields ─────────────────────────────────────────────────────

interface CommonState { address: string; title: string; description: string; price: string; priceUnitVal: string; negotiable: boolean; }
const CommonFields = ({ withPriceUnit, priceLabel = 'Price (Rs)', f, set }: { withPriceUnit?: boolean; priceLabel?: string; f: CommonState; set: (v: CommonState) => void }) => (
  <>
    <TextInput label="Address (optional)" placeholder="Enter the street, house number, and/or post code." value={f.address} onChange={v => set({ ...f, address: v })} />
    <TextInput label="Title" placeholder="Keep it short!" value={f.title} onChange={v => set({ ...f, title: v })} />
    <div style={fieldWrap}>
      <div style={{ fontSize: 12, color: 'rgb(112,118,118)', marginBottom: 8, display: 'flex', justifyContent: 'space-between', fontFamily: FA }}>
        <span>Description</span><span>{f.description.length}/5000</span>
      </div>
      <textarea
        placeholder="More details = more responses!"
        maxLength={5000}
        rows={6}
        value={f.description}
        onChange={e => set({ ...f, description: e.target.value })}
        style={{ width: '100%', border: '1px solid rgb(212,222,217)', borderRadius: 4, padding: '6px 6px 6px 12px', lineHeight: '20px', fontFamily: FA, fontSize: 14, color: 'rgb(47,52,50)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
      />
      <div style={{ minHeight: 20 }} />
    </div>
    {withPriceUnit ? (
      <div style={fieldWrap}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: '3 1 0%' }}>
            <label style={labelSt}>{priceLabel}</label>
            <input type="text" inputMode="numeric" placeholder="How much do you want to sell your property for?" value={f.price} onChange={e => set({ ...f, price: e.target.value })} style={inputStyle} />
            <div style={{ minHeight: 20 }} />
          </div>
          <div style={{ flex: '1 1 0%' }}>
            <Dropdown label="Unit" value={f.priceUnitVal || 'total price'} onChange={v => set({ ...f, priceUnitVal: v })} options={['total price','per perch','per acre']} />
          </div>
        </div>
        <CheckboxRow label="Negotiable" checked={f.negotiable} onChange={v => set({ ...f, negotiable: v })} />
      </div>
    ) : (
      <div style={fieldWrap}>
        <label style={labelSt}>{priceLabel}</label>
        <input type="text" inputMode="numeric" placeholder="How much do you want to sell your property for?" value={f.price} onChange={e => set({ ...f, price: e.target.value })} style={inputStyle} />
        <div style={{ minHeight: 20 }} />
        <CheckboxRow label="Negotiable" checked={f.negotiable} onChange={v => set({ ...f, negotiable: v })} />
      </div>
    )}
  </>
);

// ── Contact section icons ────────────────────────────────────────────────────

const VerifiedBadge = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0 }}>
    <defs>
      <path d="M7 13.447c.932.036 1.054.728 1.864.51.81-.216.57-.877 1.377-1.343.808-.466 1.26.073 1.852-.52.594-.594.055-1.045.521-1.853.466-.807 1.127-.566 1.344-1.377.217-.81-.475-.932-.475-1.864s.692-1.054.475-1.864c-.217-.81-.878-.57-1.344-1.377-.466-.808.073-1.26-.52-1.852-.594-.594-1.045-.055-1.853-.521C9.434.92 9.675.259 8.864.042 8.054-.175 7.932.517 7 .517S5.946-.175 5.136.042c-.81.217-.57.878-1.377 1.344-.808.466-1.26-.073-1.852.52-.594.594-.055 1.045-.521 1.853C.92 4.566.259 4.325.042 5.136c-.217.81.475.932.475 1.864S-.175 8.054.042 8.864c.217.81.878.57 1.344 1.377.466.808-.073 1.26.52 1.852.594.594 1.045.055 1.853.521.807.466.566 1.127 1.377 1.344.81.217.932-.475 1.864-.51z" id="vb-a" />
      <path d="M3.077 7.25S5.847 2.16 8 1.205L7.385.25s-4 3.182-4.616 4.773L.923 3.114 0 4.386s2.462 1.91 3.077 2.864z" id="vb-c" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path d="M9 15.447c.932.036 1.054.728 1.864.51.81-.216.57-.877 1.377-1.343.808-.466 1.26.073 1.852-.52.594-.594.055-1.045.521-1.853.466-.807 1.127-.566 1.344-1.377.217-.81-.475-.932-.475-1.864s.692-1.054.475-1.864c-.217-.81-.878-.57-1.344-1.377-.466-.808.073-1.26-.52-1.852-.594-.594-1.045-.055-1.853-.521-.807-.466-.566-1.127-1.377-1.344-.81-.217-.932.475-1.864.475s-1.054-.692-1.864-.475c-.81.217-.57.878-1.377 1.344-.808.466-1.26-.073-1.852.52-.594.594-.055 1.045-.521 1.853-.466.807-1.127.566-1.344 1.377-.217.81.475.932.475 1.864s-.692 1.054-.475 1.864c.217.81.878.57 1.344 1.377.466.808-.073 1.26.52 1.852.594.594 1.045.055 1.853.521.807.466.566 1.127 1.377 1.344.81.217.932-.475 1.864-.51z" fill="#F3F6F5" fillRule="nonzero" />
      <g transform="translate(2 2)">
        <mask id="vb-b" fill="#fff"><use href="#vb-a" /></mask>
        <use fill="#60BED3" href="#vb-a" />
        <path fill="#4CB0C1" mask="url(#vb-b)" d="M-1.105-1.105H7v15.658h-8.105z" />
      </g>
      <g transform="translate(5 5.25)">
        <mask id="vb-d" fill="#fff"><use href="#vb-c" /></mask>
        <use fill="#F3F6F5" href="#vb-c" />
        <path fill="#E7EDEE" mask="url(#vb-d)" d="M-3-3.25h7v14h-7z" />
      </g>
    </g>
  </svg>
);

const RemovePhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <g fill="none" fillRule="evenodd">
      <path fillOpacity="0" fill="red" d="M0 0h18v18H0z" />
      <g transform="translate(1 1)">
        <circle fill="#D95E46" cx="8" cy="8" r="8" />
        <rect fill="#FFF" x="4" y="7" width="8" height="2" rx="0.5" />
      </g>
    </g>
  </svg>
);

const PhoneInfoIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" style={{ verticalAlign: 'middle' }}>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h16v16H0z" />
      <g fill="#707676" fillRule="nonzero">
        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.4c-3.52 0-6.4-2.88-6.4-6.4 0-3.52 2.88-6.4 6.4-6.4 3.52 0 6.4 2.88 6.4 6.4 0 3.52-2.88 6.4-6.4 6.4z" />
        <path d="M8 4C6.64 4 5.6 5.04 5.6 6.4h1.6c0-.48.32-.8.8-.8.48 0 .8.32.8.8 0 .32-.16.56-.4.72-.72.4-1.2 1.2-1.2 2.08v.4h1.6v-.4c0-.32.16-.56.32-.64.8-.4 1.28-1.2 1.28-2.08C10.4 5.04 9.36 4 8 4zM7.2 10.4h1.6V12H7.2z" />
      </g>
    </g>
  </svg>
);

// ── Contact section ──────────────────────────────────────────────────────────

const ContactSection = ({ hidePhone, setHidePhone }: { hidePhone: boolean; setHidePhone: (v: boolean) => void }) => {
  const [phones, setPhones] = useState(['0765772504']);
  const [addingPhone, setAddingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState('');

  const removePhone = (i: number) => setPhones(ps => ps.filter((_, idx) => idx !== i));
  const confirmAdd = () => {
    const n = newPhone.trim();
    if (n) { setPhones(ps => [...ps, n]); }
    setNewPhone('');
    setAddingPhone(false);
  };

  return (
    <div style={{ marginTop: 4 }}>
      <h2 style={{ fontSize: 16, fontWeight: 800, color: 'rgb(47,52,50)', margin: '0 0 16px', fontFamily: FA }}>
        Contact details
      </h2>

      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 12, color: 'rgb(112,118,118)', fontFamily: FA }}>Name</span>
        <p style={{ margin: 0, fontFamily: FA, color: 'rgb(47,52,50)', fontSize: 14 }}>Guest User</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 12, color: 'rgb(112,118,118)', fontFamily: FA }}>Email</span>
        <p style={{ margin: 0, fontFamily: FA, color: 'rgb(47,52,50)', fontSize: 14 }}>guest@example.com</p>
      </div>

      {/* Phone number box */}
      <div style={{ border: '1px solid rgb(212,222,217)', borderRadius: 2, padding: 16 }}>

        {/* Label row */}
        <div style={{ fontSize: 12, color: 'rgb(112,118,118)', fontFamily: FA, display: 'flex', alignItems: 'center', gap: 4 }}>
          <label>Phone number</label>
          <span style={{ marginLeft: 4, marginBottom: 4, display: 'inline-flex' }}>
            <PhoneInfoIcon />
          </span>
        </div>

        {/* Phone number rows */}
        {phones.map((num, i) => (
          <div
            key={i}
            style={{
              margin: '8px 0', paddingBottom: 8,
              borderBottom: '1px solid rgb(212,222,217)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              maxWidth: 320,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <VerifiedBadge />
              <span style={{ fontWeight: 800, marginLeft: 8, fontFamily: FA, fontSize: 14, color: 'rgb(47,52,50)' }}>
                {num}
              </span>
            </div>
            <button
              type="button"
              aria-label={`Remove phone number ${num}`}
              onClick={() => removePhone(i)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
            >
              <RemovePhoneIcon />
            </button>
          </div>
        ))}

        {/* Add phone input */}
        {addingPhone && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8, maxWidth: 320 }}>
            <input
              type="tel"
              placeholder="Phone number"
              value={newPhone}
              onChange={e => setNewPhone(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); confirmAdd(); } }}
              autoFocus
              style={{ ...inputStyle, flex: 1 }}
            />
            <button type="button" onClick={confirmAdd} style={{ background: 'rgb(20,151,119)', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontSize: 13, fontFamily: FA, cursor: 'pointer' }}>Add</button>
            <button type="button" onClick={() => { setAddingPhone(false); setNewPhone(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'rgb(112,118,118)', fontFamily: FA }}>Cancel</button>
          </div>
        )}

        {/* Add another button */}
        <button
          type="button"
          onClick={() => setAddingPhone(true)}
          style={{ marginTop: 4, display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <svg viewBox="0 0 18 18" width="18" height="18" fill="rgb(20,151,119)">
            <path d="M18 9c0-5-4-9-9-9S0 4 0 9s4 9 9 9 9-4 9-9zM8 12.5v-2c0-.3-.2-.5-.5-.5h-2c-.3 0-.5-.2-.5-.5v-1c0-.3.2-.5.5-.5h2c.3 0 .5-.2.5-.5v-2c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v2c0 .3.2.5.5.5h2c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5h-2c-.3 0-.5.2-.5.5v2c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5z" />
          </svg>
          <span style={{ marginLeft: 8, color: 'rgb(0,116,186)', fontSize: 14, fontFamily: FA }}>Add another phone number</span>
        </button>

        {/* WhatsApp awareness */}
        <div style={{ backgroundColor: 'rgb(251,246,213)', marginTop: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '7px 6px', margin: '6px 6px 6px 6px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 12, flexShrink: 0 }}>
              <path fillRule="evenodd" clipRule="evenodd" d="M10 4.518a5.482 5.482 0 1 1 0 10.964 5.482 5.482 0 0 1 0-10.964zm0-1.185a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334z" fill="#673500" />
              <path fillRule="evenodd" clipRule="evenodd" d="M10.775 7.47a.805.805 0 1 1-1.61.002.805.805 0 0 1 1.61-.002z" fill="#673500" />
              <path d="M10.583 9.792a.625.625 0 0 0-1.25 0v3.75a.625.625 0 1 0 1.25 0v-3.75z" fill="#673500" />
            </svg>
            <div style={{ fontSize: 12, color: 'rgb(103,53,0)', fontFamily: FA }}>
              Buyers can WhatsApp your first number. Make sure it's active.
            </div>
          </div>
        </div>

        {/* Hide phone checkbox */}
        <div style={{ marginTop: 12 }}>
          <CheckboxRow label="Hide Phone Number(s)" checked={hidePhone} onChange={setHidePhone} />
        </div>

      </div>
    </div>
  );
};

// ── Field map ────────────────────────────────────────────────────────────────

const FIELD_MAP: Record<string, { priceUnit?: boolean; priceLabel?: string }> = {
  'Land For Sale':                  { priceUnit: true, priceLabel: 'Price (Rs)' },
  'Houses For Sale':                { priceLabel: 'Price (Rs)' },
  'Apartments For Sale':            { priceLabel: 'Price (Rs)' },
  'Commercial Properties For Sale': { priceLabel: 'Price (Rs)' },
  'House Rentals':                  { priceLabel: 'Rent (Rs) /month' },
  'Apartment Rentals':              { priceLabel: 'Rent (Rs) /month' },
  'Commercial Property Rentals':    { priceLabel: 'Rent (Rs) /month' },
  'Room & Annex Rentals':           { priceLabel: 'Rent (Rs) /month' },
  'Holiday & Short-Term Rental':    { priceLabel: 'Rent (Rs) /night' },
  'Land Rentals':                   { priceUnit: true, priceLabel: 'Rent (Rs) /year' },
};

// ── Main form component ──────────────────────────────────────────────────────

export const PostAdForm = ({ category, onBack }: { category: string; onBack: () => void }) => {
  const config = FIELD_MAP[category] ?? {};

  // category-specific state — for sale
  const [land, setLand] = useState<LandFields>({ landTypes: {}, landSize: '', landUnit: 'perches' });
  const [house, setHouse] = useState<HouseFields>({ bedrooms: '', bathrooms: '', landSize: '', landUnit: 'perches', houseSize: '' });
  const [apt, setApt] = useState<ApartmentFields>({ bedrooms: '', bathrooms: '', size: '', completion: '', furnished: '', complex: '' });
  const [comm, setComm] = useState<CommercialFields>({ propertyType: '', size: '' });
  // category-specific state — for rent
  const [houseRent, setHouseRent] = useState<HouseRentFields>({ bedrooms: '', bathrooms: '', landSize: '', landUnit: 'perches', houseSize: '' });
  const [aptRent, setAptRent] = useState<AptRentFields>({ bedrooms: '', bathrooms: '', size: '', furnished: '', complex: '' });
  const [commRent, setCommRent] = useState<CommRentFields>({ propertyType: '', size: '' });
  const [roomAnnex, setRoomAnnex] = useState<RoomAnnexFields>({ bedrooms: '', bathrooms: '', size: '', furnished: '' });
  const [holiday, setHoliday] = useState<HolidayFields>({ bedrooms: '', bathrooms: '', propertyType: '' });
  const [landRent, setLandRent] = useState<LandRentFields>({ landTypes: {}, landSize: '', landUnit: 'perches' });

  // common state
  const [common, setCommon] = useState<CommonState>({ address: '', title: '', description: '', price: '', priceUnitVal: 'total price', negotiable: false });
  const [hidePhone, setHidePhone] = useState(false);

  // photos
  const makeSlots = (n: number) => Array<string | null>(n).fill(null);
  const [mainPhotos, setMainPhotos] = useState<(string | null)[]>(makeSlots(5));
  const [extraPhotos, setExtraPhotos] = useState<(string | null)[]>(makeSlots(10));

  const handlePhoto = (arr: (string | null)[], set: (a: (string | null)[]) => void, i: number, f: File) => {
    const url = URL.createObjectURL(f);
    const next = [...arr];
    next[i] = url;
    set(next);
  };

  const hasRequiredPhoto = mainPhotos.some(p => p !== null);
  const hasTitle = common.title.trim().length > 0;
  const hasPrice = common.price.trim().length > 0;
  const canPost = hasRequiredPhoto && hasTitle && hasPrice;

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: FA }}>
      <div style={{ maxWidth: 985, margin: '16px auto', padding: '0 8px 34px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: 4, padding: '16px 24px' }}>

          {/* Header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 8 }}>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: 'rgb(47,52,50)', margin: 0, fontFamily: FA }}>Fill in the details</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', fontFamily: FA, color: 'rgb(47,52,50)', fontSize: 14 }}>
                  <LocationIcon />
                  <span style={{ maxWidth: 190, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: 7, fontWeight: 800 }}>Boralesgamuwa</span>
                </button>
                <button type="button" style={{ marginLeft: 8, color: 'rgb(0,116,186)', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FA }}>Change</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button type="button" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', fontFamily: FA, color: 'rgb(47,52,50)', fontSize: 14 }}>
                  <CategoryIcon />
                  <span style={{ maxWidth: 190, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: 7, fontWeight: 800 }}>{category}</span>
                </button>
                <button type="button" onClick={onBack} style={{ marginLeft: 8, color: 'rgb(0,116,186)', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FA }}>Change</button>
              </div>
            </div>
          </div>

          <Divider />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <button type="button" style={{ color: 'rgb(0,116,186)', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', fontFamily: FA }}>See our posting rules</button>
          </div>

          <form onSubmit={e => e.preventDefault()}>
            {category === 'Land For Sale' && <LandForSaleFields f={land} set={setLand} />}
            {category === 'Houses For Sale' && <HousesForSaleFields f={house} set={setHouse} />}
            {category === 'Apartments For Sale' && <ApartmentsForSaleFields f={apt} set={setApt} />}
            {category === 'Commercial Properties For Sale' && <CommercialPropertiesFields f={comm} set={setComm} />}
            {category === 'House Rentals' && <HouseRentalsFields f={houseRent} set={setHouseRent} />}
            {category === 'Apartment Rentals' && <ApartmentRentalsFields f={aptRent} set={setAptRent} />}
            {category === 'Commercial Property Rentals' && <CommercialPropertyRentalsFields f={commRent} set={setCommRent} />}
            {category === 'Room & Annex Rentals' && <RoomAnnexRentalsFields f={roomAnnex} set={setRoomAnnex} />}
            {category === 'Holiday & Short-Term Rental' && <HolidayRentalFields f={holiday} set={setHoliday} />}
            {category === 'Land Rentals' && <LandRentalsFields f={landRent} set={setLandRent} />}

            <CommonFields withPriceUnit={config.priceUnit} priceLabel={config.priceLabel} f={common} set={setCommon} />

            <Divider />

            {/* Main photos */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: 'rgb(47,52,50)', margin: 0, fontFamily: FA, display: 'flex', alignItems: 'center', gap: 8 }}>
                  Add up to 5 photos <InfoIcon />
                </h2>
              </div>
              <PhotoGrid images={mainPhotos} onFile={(i, f) => handlePhoto(mainPhotos, setMainPhotos, i, f)} />
              {!hasRequiredPhoto && (
                <div style={{ fontSize: 12, color: 'rgb(0,116,186)', marginTop: 4, fontFamily: FA }}>You must upload at least one photo</div>
              )}
            </div>

            <Divider />

            {/* Extra photos */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 800, color: 'rgb(47,52,50)', margin: 0, fontFamily: FA, display: 'flex', alignItems: 'center', gap: 8 }}>
                    Got more images to upload? <InfoIcon />
                  </h2>
                </div>
                <div style={{ fontSize: 14, fontFamily: FA, color: 'rgb(47,52,50)' }}>
                  Sell faster by adding <b>10 more images</b> for a fee of <b>LKR 750.</b>
                </div>
              </div>
              <PhotoGrid images={extraPhotos} onFile={(i, f) => handlePhoto(extraPhotos, setExtraPhotos, i, f)} />
            </div>

            <Divider />

            <ContactSection hidePhone={hidePhone} setHidePhone={setHidePhone} />

            <div style={{ minHeight: 20 }} />

            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12, alignItems: 'flex-end' }}>
              <button
                type="submit"
                disabled={!canPost}
                style={{
                  backgroundColor: 'rgb(20,151,119)', color: '#fff', fontWeight: 800,
                  fontSize: 14, padding: '10px 16px', border: 'none', borderRadius: 4,
                  cursor: canPost ? 'pointer' : 'not-allowed',
                  opacity: canPost ? 1 : 0.5, width: 200,
                  fontFamily: FA, display: 'flex', justifyContent: 'center',
                }}
              >
                Post ad
              </button>
              <div style={{ minHeight: 20 }} />
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
