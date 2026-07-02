import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFoundPage = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-md"
    >
      <div className="text-8xl font-black text-[#149777] mb-2">404</div>
      <h1 className="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h1>
      <p className="text-slate-500 mb-8">
        The page you're looking for doesn't exist. It may have been moved or removed.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#149777] text-white rounded-xl font-semibold hover:bg-[#007168] transition-colors"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
        <Link
          to="/properties"
          className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
        >
          <Search className="w-4 h-4" /> Browse Properties
        </Link>
      </div>
    </motion.div>
  </div>
);
