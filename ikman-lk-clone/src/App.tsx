import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { PropertyListingPage } from './pages/PropertyListing';
import { PropertyDetailsPage } from './pages/PropertyDetails';
import { AccountPage } from './pages/Account';
import { ChatPage } from './pages/Chat';
import { PostAdPage } from './pages/PostAd';
import { NotFoundPage } from './pages/NotFound';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/properties" replace />} />
          <Route path="/properties" element={<PropertyListingPage />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/post-ad" element={<PostAdPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/*" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
