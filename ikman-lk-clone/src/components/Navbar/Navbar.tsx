import { useState } from 'react'
import './Navbar.css'

const categories = [
  'Property',
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="navbar">
      {/* Top Bar */}
      <div className="navbar__top">
        <div className="navbar__container">
          {/* Hamburger - mobile only */}
          <button
            className="navbar__hamburger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Logo */}
          <a href="/" className="navbar__logo" aria-label="ikman.lk home">
            <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
              <rect width="120" height="40" rx="6" fill="#f26522" />
              <text x="10" y="28" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="22" fill="white">ikman</text>
              <text x="78" y="28" fontFamily="Arial, sans-serif" fontSize="14" fill="white">.lk</text>
            </svg>
          </a>

          {/* Search - desktop */}
          <div className="navbar__search">
            <input
              type="text"
              placeholder="Search ads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar__search-input"
            />
            <button className="navbar__search-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* Right actions */}
          <div className="navbar__actions">
            <button className="navbar__btn navbar__btn--ghost">Login</button>
            <button className="navbar__btn navbar__btn--ghost navbar__btn--hide-sm">Register</button>
            <a href="/post-ad" className="navbar__btn navbar__btn--primary">
              + Post Ad
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="navbar__mobile-search">
        <div className="navbar__search navbar__search--mobile">
          <input
            type="text"
            placeholder="Search ads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar__search-input"
          />
          <button className="navbar__search-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <nav className="navbar__categories" aria-label="Categories">
        <div className="navbar__container">
          <ul className="navbar__cat-list">
            {categories.map((cat) => (
              <li key={cat}>
                <a href={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="navbar__cat-link">
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="navbar__drawer-inner">
          <div className="navbar__drawer-auth">
            <button className="navbar__btn navbar__btn--ghost navbar__btn--full">Login</button>
            <button className="navbar__btn navbar__btn--ghost navbar__btn--full">Register</button>
          </div>
          <nav aria-label="Mobile categories">
            <p className="navbar__drawer-title">Categories</p>
            <ul className="navbar__drawer-list">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="navbar__drawer-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
