import { useEffect, useCallback, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Pagination } from '../../components/common/Pagination';
import { AdListCard } from '../../components/property/AdListCard';
import { useFilter } from '../../hooks/useFilter';
import { usePagination } from '../../hooks/usePagination';
import { useSearch } from '../../hooks/useSearch';
import { categories } from '../../data/categories';
import type { FilterState, PropertyCategory } from '../../types';

const PER_PAGE = 25;

const ChevronSvg = ({ arrowHeight, fill }: { arrowHeight: number; fill: string }) => (
  <div style={{ marginLeft: 10, marginRight: 7, paddingBottom: 2, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" style={{ width: 11, height: arrowHeight, display: 'block', fill }}>
      <path d="M4.35 5.47L12 13.54l7.65-8.07L22 7.96 12 18.53 2 7.96l2.35-2.49z" />
    </svg>
  </div>
);

interface PillProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}

const posterTypeOptions = [
  { value: 'all_posters', label: 'All posters' },
  { value: 'only_members', label: 'Members' },
  { value: 'auth_dealer', label: 'Authorized Agent' },
  { value: 'only_non_members', label: 'Non-members' },
];

const PosterTypePill = ({ value, onChange, total }: { value: string; onChange: (v: string) => void; total: number }) => {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0 });
  const [tempValue, setTempValue] = useState(value || 'all_posters');
  const pillRef = useRef<HTMLDivElement>(null);

  const active = value && value !== 'all_posters';
  const activeLabel = posterTypeOptions.find(o => o.value === value)?.label;

  const handleToggle = () => {
    if (!open && pillRef.current) {
      const r = pillRef.current.getBoundingClientRect();
      setDropPos({ top: r.bottom + 4, left: r.left });
      setTempValue(value || 'all_posters');
    }
    setOpen(v => !v);
  };

  const handleShow = () => {
    onChange(tempValue === 'all_posters' ? '' : tempValue);
    setOpen(false);
  };

  const handleReset = () => setTempValue('all_posters');

  return (
    <div ref={pillRef} style={{ flexShrink: 0 }}>
      <div onClick={handleToggle} style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        padding: '0 4px',
        border: `1px solid ${active ? 'rgb(0,152,119)' : 'rgb(205,205,205)'}`,
        borderRadius: 100, backgroundColor: active ? '#e8f7f4' : '#fff',
        height: 36, cursor: 'pointer', marginRight: 6,
      }}>
        <span style={{
          fontSize: 14, fontWeight: 400,
          color: active ? 'rgb(0,152,119)' : 'rgb(57,61,71)',
          paddingLeft: 7, whiteSpace: 'nowrap',
          fontFamily: "'Open Sans', Arial, sans-serif",
        }}>
          {active ? activeLabel : 'Type of poster'}
        </span>
        <ChevronSvg arrowHeight={22} fill={active ? 'rgb(0,152,119)' : 'rgb(0,0,0)'} />
      </div>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'fixed', top: dropPos.top, left: dropPos.left, zIndex: 1001,
            backgroundColor: '#fff', borderRadius: 10,
            boxShadow: 'rgba(0,0,0,0.1) 0px 4px 14px',
            padding: 16, minWidth: 310,
            fontFamily: "'Open Sans', Arial, sans-serif",
          }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: 'rgb(34,34,34)' }}>
              Type of Poster
            </div>
            <div style={{ paddingTop: 10 }}>
              {posterTypeOptions.map(opt => (
                <div
                  key={opt.value}
                  onClick={() => setTempValue(opt.value)}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: 12, cursor: 'pointer' }}
                >
                  <span style={{
                    display: 'inline-block', width: 14, height: 14, flexShrink: 0,
                    borderRadius: '50%',
                    border: `1px solid ${tempValue === opt.value ? 'rgb(11,148,231)' : 'rgb(175,183,173)'}`,
                    background: tempValue === opt.value
                      ? 'radial-gradient(rgb(255,255,255) 24.5%, rgb(0,152,119) 25%)'
                      : 'transparent',
                    boxSizing: 'border-box' as const,
                  }} />
                  <div style={{ marginLeft: 11, color: 'rgb(66,78,78)', fontSize: 14, fontWeight: 400 }}>
                    {opt.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              borderTop: '1px solid rgb(231,237,238)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 10,
            }}>
              <button onClick={handleReset} style={{
                fontSize: 14, fontWeight: 400, cursor: 'pointer',
                backgroundColor: 'transparent', borderRadius: 4,
                border: '1px solid rgb(0,152,119)', color: 'rgb(0,152,119)',
                padding: '10px 12px', marginRight: 35,
                fontFamily: "'Open Sans', Arial, sans-serif",
              }}>Reset</button>
              <button onClick={handleShow} style={{
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                backgroundColor: 'rgb(0,152,119)', borderRadius: 4,
                border: 'none', color: '#fff',
                padding: '12px 12px', minWidth: 140, textAlign: 'center' as const,
                fontFamily: "'Open Sans', Arial, sans-serif",
              }}>Show {total.toLocaleString()} posts</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PromotedListingsPill = ({ value, onChange, total }: { value: string; onChange: (v: string) => void; total: number }) => {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0 });
  const [tempValue, setTempValue] = useState(value);
  const pillRef = useRef<HTMLDivElement>(null);

  const active = value === 'urgent';

  const handleToggle = () => {
    if (!open && pillRef.current) {
      const r = pillRef.current.getBoundingClientRect();
      setDropPos({ top: r.bottom + 4, left: r.left });
      setTempValue(value);
    }
    setOpen(v => !v);
  };

  return (
    <div ref={pillRef} style={{ flexShrink: 0 }}>
      <div onClick={handleToggle} style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        padding: '0 4px',
        border: `1px solid ${active ? 'rgb(0,152,119)' : 'rgb(205,205,205)'}`,
        borderRadius: 100, backgroundColor: active ? '#e8f7f4' : '#fff',
        height: 36, cursor: 'pointer', marginRight: 6,
      }}>
        <span style={{
          fontSize: 14, fontWeight: 400,
          color: active ? 'rgb(0,152,119)' : 'rgb(57,61,71)',
          paddingLeft: 7, whiteSpace: 'nowrap',
          fontFamily: "'Open Sans', Arial, sans-serif",
        }}>
          Promoted Listings
        </span>
        <ChevronSvg arrowHeight={22} fill={active ? 'rgb(0,152,119)' : 'rgb(0,0,0)'} />
      </div>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'fixed', top: dropPos.top, left: dropPos.left, zIndex: 1001,
            backgroundColor: '#fff', borderRadius: 10,
            boxShadow: 'rgba(0,0,0,0.1) 0px 4px 14px',
            padding: 16, minWidth: 310,
            fontFamily: "'Open Sans', Arial, sans-serif",
          }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: 'rgb(34,34,34)' }}>
              Promoted Listings
            </div>
            <div style={{ paddingTop: 10 }}>
              <div
                onClick={() => setTempValue(tempValue === 'urgent' ? '' : 'urgent')}
                style={{ display: 'flex', alignItems: 'center', marginBottom: 15, cursor: 'pointer' }}
              >
                <span style={{
                  display: 'inline-block', width: 14, height: 14, flexShrink: 0,
                  borderRadius: 4, boxSizing: 'border-box' as const,
                  border: `1px solid ${tempValue === 'urgent' ? 'rgb(11,148,231)' : 'rgb(175,183,173)'}`,
                  backgroundColor: tempValue === 'urgent' ? 'rgb(11,148,231)' : '#fff',
                  backgroundImage: tempValue === 'urgent'
                    ? `url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M4 8.5L7 11.5L12 6.5' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/></svg>")`
                    : 'none',
                  backgroundRepeat: 'no-repeat', backgroundPosition: '50% center',
                }} />
                <div style={{ marginLeft: 8 }}>
                  <svg width="50" height="22" viewBox="0 0 32 10" style={{ display: 'block' }}>
                    <rect width="32" height="10" rx="1.95" fill="#d95e46" />
                    <text x="3.72" y="7.31" fontSize="6" fill="#fff" fontFamily="OpenSans-Bold,Open Sans" fontWeight="700">URGENT</text>
                  </svg>
                </div>
              </div>
            </div>
            <div style={{
              borderTop: '1px solid rgb(231,237,238)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 10,
            }}>
              <button
                onClick={() => setTempValue('')}
                style={{
                  fontSize: 14, fontWeight: 400, cursor: 'pointer',
                  backgroundColor: 'transparent', borderRadius: 4,
                  border: '1px solid rgb(0,152,119)', color: 'rgb(0,152,119)',
                  padding: '10px 12px', marginRight: 35,
                  fontFamily: "'Open Sans', Arial, sans-serif",
                }}>Reset</button>
              <button
                onClick={() => { onChange(tempValue); setOpen(false); }}
                style={{
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  backgroundColor: 'rgb(0,152,119)', borderRadius: 4,
                  border: 'none', color: '#fff',
                  padding: '12px 12px', minWidth: 140, textAlign: 'center' as const,
                  fontFamily: "'Open Sans', Arial, sans-serif",
                }}>Show {total.toLocaleString()} posts</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const sortByOptions = [
  { value: 'date_desc', label: 'Date: Newest first' },
  { value: 'date_asc', label: 'Date: Oldest first' },
  { value: 'price_desc', label: 'Price: Highest to Lowest' },
  { value: 'price_asc', label: 'Price: Lowest to Highest' },
];

const SortByPill = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0 });
  const pillRef = useRef<HTMLDivElement>(null);

  const activeOpt = sortByOptions.find(o => o.value === value);

  const handleToggle = () => {
    if (!open && pillRef.current) {
      const r = pillRef.current.getBoundingClientRect();
      setDropPos({ top: r.bottom + 4, left: r.left });
    }
    setOpen(v => !v);
  };

  return (
    <div ref={pillRef} style={{ flexShrink: 0 }}>
      <div onClick={handleToggle} style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        padding: '0 4px',
        border: `1px solid ${activeOpt ? 'rgb(0,152,119)' : 'rgb(205,205,205)'}`,
        borderRadius: 100, backgroundColor: activeOpt ? '#e8f7f4' : '#fff',
        height: 36, cursor: 'pointer', marginRight: 6,
      }}>
        <span style={{
          fontSize: 14, fontWeight: 400,
          color: activeOpt ? 'rgb(0,152,119)' : 'rgb(57,61,71)',
          paddingLeft: 7, whiteSpace: 'nowrap',
          fontFamily: "'Open Sans', Arial, sans-serif",
        }}>
          {activeOpt?.label || 'Sort by'}
        </span>
        <ChevronSvg arrowHeight={22} fill={activeOpt ? 'rgb(0,152,119)' : 'rgb(0,0,0)'} />
      </div>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'fixed', top: dropPos.top, left: dropPos.left, zIndex: 1001,
            backgroundColor: '#fff', borderRadius: 10,
            boxShadow: 'rgba(0,0,0,0.1) 0px 4px 14px',
            padding: 16, minWidth: 310,
            fontFamily: "'Open Sans', Arial, sans-serif",
          }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: 'rgb(34,34,34)' }}>
              Sort by
            </div>
            <div style={{ paddingTop: 10 }}>
              {sortByOptions.map(opt => (
                <div
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: 12, cursor: 'pointer' }}
                >
                  <span style={{
                    display: 'inline-block', width: 14, height: 14, flexShrink: 0,
                    borderRadius: '50%', boxSizing: 'border-box' as const,
                    border: `1px solid ${value === opt.value ? 'rgb(11,148,231)' : 'rgb(175,183,173)'}`,
                    background: value === opt.value
                      ? 'radial-gradient(rgb(255,255,255) 24.5%, rgb(0,152,119) 25%)'
                      : 'transparent',
                  }} />
                  <div style={{ marginLeft: 11, color: 'rgb(66,78,78)', fontSize: 14, fontWeight: 400 }}>
                    {opt.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FilterPill = ({ label, value, options, onChange }: PillProps) => {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0 });
  const pillRef = useRef<HTMLDivElement>(null);
  const active = options.find(o => o.value === value && o.value !== '');
  const displayText = active?.label || label;
  const fillColor = active ? 'rgb(0,152,119)' : 'rgb(0,0,0)';

  const handleToggle = () => {
    if (!open && pillRef.current) {
      const r = pillRef.current.getBoundingClientRect();
      setDropPos({ top: r.bottom + 4, left: r.left });
    }
    setOpen(v => !v);
  };

  return (
    <div ref={pillRef} style={{ flexShrink: 0 }}>
      <div
        onClick={handleToggle}
        style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          padding: '0 4px',
          border: `1px solid ${active ? 'rgb(0,152,119)' : 'rgb(205,205,205)'}`,
          borderRadius: 100,
          backgroundColor: active ? '#e8f7f4' : '#fff',
          height: 36, cursor: 'pointer', marginRight: 6,
        }}
      >
        <span style={{
          fontSize: 14,
          fontWeight: 400,
          color: active ? 'rgb(0,152,119)' : 'rgb(57,61,71)',
          paddingLeft: 7, whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 190,
          fontFamily: "'Open Sans', Arial, sans-serif",
        }}>
          {displayText}
        </span>
        <ChevronSvg arrowHeight={22} fill={fillColor} />
      </div>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'fixed', top: dropPos.top, left: dropPos.left, zIndex: 1001,
            backgroundColor: '#fff', border: '1px solid #e5e5e5',
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)', minWidth: 180, borderRadius: 4,
          }}>
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '9px 14px', border: 'none',
                  backgroundColor: opt.value === value ? '#e8f7f4' : 'transparent',
                  cursor: 'pointer', fontSize: 13,
                  color: opt.value === value ? 'rgb(0,152,119)' : 'rgb(57,61,71)',
                  fontFamily: "'Open Sans', Arial, sans-serif",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export const PropertyListingPage = () => {
  const [searchParams] = useSearchParams();
  const { filters, updateFilter, resetFilters } = useFilter();
  const { page, goTo, reset: resetPage, totalPages } = usePagination(PER_PAGE);
  const { results, total } = useSearch(filters, page, PER_PAGE);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const c = searchParams.get('category') || '';
    const d = searchParams.get('district') || '';
    const t = searchParams.get('type') || '';
    if (c) updateFilter('category', c as PropertyCategory);
    if (d) updateFilter('district', d);
    if (t) updateFilter('type', t as FilterState['type']);
  }, []); // eslint-disable-line

  const handleUpdate = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    updateFilter(key, value);
    resetPage();
  }, [updateFilter, resetPage]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const q = searchInputRef.current?.value || '';
    handleUpdate('search', q);
  }, [handleUpdate]);

  const districtOpts = [
    { value: '', label: 'All of Sri Lanka' },
    ...['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Galle', 'Matara', 'Jaffna', 'Kurunegala', 'Ratnapura', 'Negombo']
      .map(d => ({ value: d, label: d })),
  ];

  const pageStart = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const pageEnd = Math.min(page * PER_PAGE, total);
  const hasFilters = !!(filters.district || filters.category || filters.type || filters.posterType || filters.promotionType);
  const activeCatLabel = categories.find(c => c.id === filters.category)?.label;

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif" }}>

      {/* Search row — matches real ikman.lk */}
      <div style={{ backgroundColor: '#fff', padding: '9px 0', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{
          maxWidth: 985, margin: '0 auto', padding: '0 8px',
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16,
        }}>
          {/* Right: Heading + Breadcrumb */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 16, fontWeight: 800, color: 'rgb(47, 52, 50)', margin: '0 0 4px' }}>
              Buy, Sell, Rent or Find Anything in Sri Lanka
            </h1>
            <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, color: '#424e4e', flexWrap: 'wrap' }}>
              <Link to="/properties" style={{ color: '#424e4e', textDecoration: 'none' }}>Home</Link>
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M4 8.295L6.29 6 4 3.705 4.705 3l3 3-3 3z" fill="#707676" fillRule="nonzero" /></svg>
              <span style={{ fontWeight: 600 }}>All ads in Sri Lanka</span>
              {activeCatLabel && (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M4 8.295L6.29 6 4 3.705 4.705 3l3 3-3 3z" fill="#707676" fillRule="nonzero" /></svg>
                  <span style={{ fontWeight: 600 }}>{activeCatLabel}</span>
                </>
              )}
              {filters.district && (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M4 8.295L6.29 6 4 3.705 4.705 3l3 3-3 3z" fill="#707676" fillRule="nonzero" /></svg>
                  <span style={{ fontWeight: 600 }}>{filters.district}</span>
                </>
              )}
            </div>
          </div>

          {/* Left: Search bar */}
          <div style={{ flex: 1 }}>
            <form
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex', backgroundColor: '#fff',
                borderRadius: 60, overflow: 'hidden',
                border: '1px solid rgb(112, 118, 118)',
              }}
            >
              <input
                ref={searchInputRef}
                type="search"
                defaultValue={filters.search}
                placeholder="What are you looking for?"
                style={{
                  flex: 1, padding: '11px 24px',
                  border: 'none', outline: 'none',
                  fontSize: 16, backgroundColor: '#fff',
                  fontFamily: "'Open Sans', Arial, sans-serif",
                  color: '#333',
                }}
              />
              <div style={{ padding: 4 }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#ffc800',
                    border: 'none', cursor: 'pointer',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 10, width: 36, height: 36,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 17 17" style={{ fill: 'rgb(103, 53, 0)', display: 'block' }}>
                    <path d="M7.615 15.23a7.615 7.615 0 1 1 6.1-3.054l2.966 2.967a1.088 1.088 0 0 1-1.539 1.538l-2.966-2.966a7.582 7.582 0 0 1-4.56 1.516zm5.44-7.615a5.44 5.44 0 1 1-10.88 0 5.44 5.44 0 0 1 10.88 0z" fillRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 985, margin: '0 auto', padding: '10px 8px 24px' }}>

        {/* Filter bar — exact real ikman.lk */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          marginTop: 12, marginBottom: 7,
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>

          {/* Refine button */}
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: '6px 8px 6px 10px', marginRight: 6,
            border: '1px solid rgb(0,152,119)', borderRadius: 100,
            height: 36, cursor: 'pointer', minWidth: 'max-content', flexShrink: 0,
          }}>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.797 4.663c0-.31.252-.562.563-.562h1.89a.563.563 0 0 1 0 1.125h-1.89a.562.562 0 0 1-.563-.563zM2.75 4.101h7.35a.562.562 0 1 1 0 1.125H2.75a.563.563 0 0 1 0-1.125zm4.814 5.432c0-.31.252-.562.563-.562h8.123a.563.563 0 0 1 0 1.125H8.127a.562.562 0 0 1-.563-.563zm6.233 4.87c0-.311.252-.563.563-.563h1.89a.563.563 0 0 1 0 1.125h-1.89a.563.563 0 0 1-.563-.562zm-11.61 0c0-.311.252-.563.563-.563h7.35a.562.562 0 1 1 0 1.125H2.75a.563.563 0 0 1-.563-.562z" fill="#009877" />
              <path fillRule="evenodd" clipRule="evenodd" d="M12.11 3.313a1.238 1.238 0 1 0 0 2.475 1.238 1.238 0 0 0 0-2.476zM9.748 4.55a2.363 2.363 0 1 1 4.725 0 2.363 2.363 0 0 1-4.725 0zM5.81 8.262a1.237 1.237 0 1 0 0 2.475 1.237 1.237 0 0 0 0-2.475zM3.448 9.5a2.363 2.363 0 1 1 4.725 0 2.363 2.363 0 0 1-4.725 0zm8.662 3.713a1.238 1.238 0 1 0 0 2.475 1.238 1.238 0 0 0 0-2.476zM9.748 14.45a2.362 2.362 0 1 1 4.725 0 2.362 2.362 0 0 1-4.725 0z" fill="#009877" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 400, color: 'rgb(0,152,119)', paddingLeft: 7, paddingRight: 3, fontFamily: "'Open Sans', Arial, sans-serif", whiteSpace: 'nowrap' }}>
              Refine
            </span>
          </div>

          {/* All of Sri Lanka */}
          <FilterPill
            label="All of Sri Lanka"
            value={filters.district}
            options={districtOpts}
            onChange={v => handleUpdate('district', v)}
          />

          {/* Type of poster */}
          <PosterTypePill
            value={filters.posterType}
            onChange={v => handleUpdate('posterType', v)}
            total={total}
          />

          {/* Promoted Listings */}
          <PromotedListingsPill
            value={filters.promotionType}
            onChange={v => handleUpdate('promotionType', v)}
            total={total}
          />

          {/* Sort by */}
          <SortByPill
            value={filters.sortBy}
            onChange={v => handleUpdate('sortBy', v as FilterState['sortBy'])}
          />

          {hasFilters && (
            <div
              onClick={() => { resetFilters(); resetPage(); }}
              style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                padding: '0 4px', border: '1px solid rgb(205,205,205)', borderRadius: 100,
                height: 36, cursor: 'pointer', marginRight: 6, flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 400, color: 'rgb(57,61,71)', paddingLeft: 7, paddingRight: 7, fontFamily: "'Open Sans', Arial, sans-serif", whiteSpace: 'nowrap' }}>
                ✕ Clear
              </span>
            </div>
          )}

        </div>

        {/* Ad list area */}
        <div>
          <div style={{ minWidth: 0 }}>
            {/* Result count + Save search */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 8, fontFamily: "'Open Sans', Arial, sans-serif",
            }}>
              <span style={{ fontSize: 13, color: 'rgb(70,79,79)' }}>
                {total === 0
                  ? 'No ads found'
                  : `Showing ${pageStart}–${pageEnd} of ${total.toLocaleString()} ads`}
              </span>
              {total > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                  <svg width="13" height="16" viewBox="0 0 12 16" fill="none">
                    <path d="M10.5 0h-9C.675 0 0 .675 0 1.5v14.25L6 13.5l6 2.25V1.5C12 .675 11.325 0 10.5 0z" fill="rgb(11,148,231)" />
                  </svg>
                  <span style={{ fontSize: 13, color: 'rgb(11,148,231)', fontFamily: "'Open Sans', Arial, sans-serif" }}>
                    Save search
                  </span>
                </div>
              )}
            </div>

            {/* Ad list */}
            <div style={{ backgroundColor: '#fff', border: '1px solid rgb(231,237,238)' }}>
              {results.length === 0 ? (
                <div style={{ padding: 48, textAlign: 'center', color: '#999', fontSize: 14, fontFamily: "'Open Sans', Arial, sans-serif" }}>
                  No ads found. Try adjusting your filters.
                </div>
              ) : (
                results.map(property => (
                  <AdListCard
                    key={property.id}
                    property={property}
                    isTop={property.featured}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {total > PER_PAGE && (
              <div style={{ marginTop: 16 }}>
                <Pagination
                  page={page}
                  totalPages={totalPages(total)}
                  onPageChange={goTo}
                  total={total}
                  perPage={PER_PAGE}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

