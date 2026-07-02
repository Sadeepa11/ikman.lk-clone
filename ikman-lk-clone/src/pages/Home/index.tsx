import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, ShieldCheck, Headphones, Home as HomeIcon, Building2, Map, Store, BedDouble, CalendarDays, ArrowRight, Star } from 'lucide-react';
import { SearchBar } from '../../components/layout/SearchBar';
import { FeaturedPropertyCard } from '../../components/property/FeaturedPropertyCard';
import { PropertyCard } from '../../components/property/PropertyCard';
import { useFavorites } from '../../hooks/useFavorites';
import { getFeaturedProperties } from '../../data/properties';
import { properties } from '../../data/properties';

const stats = [
  { label: 'Active Listings', value: '6,236+', icon: TrendingUp },
  { label: 'Districts Covered', value: '25+', icon: MapPin },
  { label: 'Verified Sellers', value: '2,100+', icon: ShieldCheck },
  { label: 'Customer Support', value: '24/7', icon: Headphones },
];

const categories = [
  { id: 'houses', label: 'Houses', icon: HomeIcon, count: '1,842', color: 'bg-[#e8f7f4] text-[#007168] border-[#149777]/30' },
  { id: 'apartments', label: 'Apartments', icon: Building2, count: '967', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 'land', label: 'Land', icon: Map, count: '2,341', color: 'bg-green-50 text-green-600 border-green-100' },
  { id: 'commercial', label: 'Commercial', icon: Store, count: '543', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { id: 'rooms', label: 'Rooms', icon: BedDouble, count: '328', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { id: 'short_term', label: 'Short Term', icon: CalendarDays, count: '215', color: 'bg-teal-50 text-teal-600 border-teal-100' },
];

const popularLocations = [
  { name: 'Colombo', img: 'https://picsum.photos/seed/col1/400/300', count: 2341 },
  { name: 'Gampaha', img: 'https://picsum.photos/seed/gam1/400/300', count: 876 },
  { name: 'Kandy', img: 'https://picsum.photos/seed/kan1/400/300', count: 543 },
  { name: 'Galle', img: 'https://picsum.photos/seed/gal1/400/300', count: 412 },
  { name: 'Matara', img: 'https://picsum.photos/seed/mat1/400/300', count: 298 },
  { name: 'Negombo', img: 'https://picsum.photos/seed/neg1/400/300', count: 234 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

export const HomePage = () => {
  const navigate = useNavigate();
  const { toggle, isFavorite } = useFavorites();
  const featured = getFeaturedProperties();
  const recent = properties.slice(0, 8);

  const handleSearch = (search: string, district: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (district) params.set('district', district);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#149777] via-[#007168] to-[#004d43] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://picsum.photos/seed/hero1/1920/600" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-[#149777]/20 border border-[#149777]/30 text-[#149777]/70 text-xs font-medium px-3 py-1 rounded-full mb-5">
              <Star className="w-3 h-3 fill-current" />
              Sri Lanka's #1 Property Marketplace
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              Find Your Dream
              <span className="text-[#149777]"> Property</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Search thousands of houses, apartments, land, and commercial properties across Sri Lanka.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>

          {/* Type quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-5 flex-wrap"
          >
            {[
              { label: 'For Sale', q: 'type=for_sale' },
              { label: 'For Rent', q: 'type=for_rent' },
              { label: 'New Projects', q: 'condition=new' },
              { label: 'Colombo', q: 'district=Colombo' },
            ].map(item => (
              <Link
                key={item.label}
                to={`/properties?${item.q}`}
                className="text-xs text-slate-300 hover:text-white border border-slate-600 hover:border-[#149777] px-3 py-1.5 rounded-full transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-[#149777]" />
                </div>
                <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Browse by Category</h2>
          <Link to="/properties" className="flex items-center gap-1 text-sm text-[#149777] hover:text-[#007168] font-medium">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                to={`/properties?category=${cat.id}`}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5 duration-200 ${cat.color}`}
              >
                <cat.icon className="w-7 h-7" />
                <div className="text-center">
                  <div className="text-sm font-semibold">{cat.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{cat.count}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      {featured.length > 0 && (
        <section className="bg-amber-50 border-y border-amber-100 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h2 className="text-xl font-bold text-slate-800">Featured Properties</h2>
              </div>
              <Link to="/properties?sortBy=featured" className="flex items-center gap-1 text-sm text-[#149777] hover:text-[#007168] font-medium">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map(property => (
                <FeaturedPropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={isFavorite(property.id)}
                  onFavoriteToggle={toggle}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Locations */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Popular Locations</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {popularLocations.map((loc, i) => (
            <motion.div key={loc.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Link
                to={`/properties?district=${loc.name}`}
                className="relative block rounded-xl overflow-hidden group aspect-[3/2]"
              >
                <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white font-bold text-sm">{loc.name}</div>
                  <div className="text-white/70 text-xs">{loc.count.toLocaleString()} listings</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Listings */}
      <section className="bg-slate-50 border-t border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Listings</h2>
            <Link to="/properties" className="flex items-center gap-1 text-sm text-[#149777] hover:text-[#007168] font-medium">
              See All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recent.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={isFavorite(property.id)}
                onFavoriteToggle={toggle}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#149777] hover:bg-[#007168] text-white font-semibold rounded-xl transition-colors"
            >
              View All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#149777] to-[#007168] text-white">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-3">Ready to Sell Your Property?</h2>
          <p className="text-white/90 mb-6">Post your property for free and reach thousands of potential buyers across Sri Lanka.</p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#007168] font-bold rounded-xl hover:bg-[#e8f7f4] transition-colors shadow-lg"
          >
            Post Free Ad <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
