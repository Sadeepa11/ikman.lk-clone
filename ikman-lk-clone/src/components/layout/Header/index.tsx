import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const FA = "'Open Sans', Arial, Helvetica, sans-serif";
const GREEN = '#149777';

const ChatIcon = () => (
  <svg viewBox="0 0 60 60" width="22" height="22" fill="white">
    <path d="M38.05 30.85c-9.16.64-11.38-4.9-11.38-9.44a10.16 10.16 0 0 1 .26-2.25H20a10.57 10.57 0 0 0-2.14 20.77v4.5a1.6 1.6 0 0 0 1.57 1.6 1.53 1.53 0 0 0 1.02-.4l5.92-5.4H30a11.03 11.03 0 0 0 9.8-7.4z" />
    <path d="M28.9 21.4a7.32 7.32 0 0 1 7.03-7.4h7.03a7.43 7.43 0 0 1 1.06 14.7v3.07a1.12 1.12 0 0 1-1.1 1.13 1.08 1.08 0 0 1-.72-.28l-.04-.04-.03-.03-3.72-3.73h-2.46a7.32 7.32 0 0 1-7.03-7.4" />
  </svg>
);

const AccountIcon = () => (
  <svg viewBox="0 0 60 60" width="22" height="22" fill="white">
    <path d="M36.723 34.65c1.637 1.243 6.495 2.38 10.397 4.484 1.286.694 1.396 1.724 1.492 2.345.097.622.3 7.404.3 7.404H11s.204-6.782.3-7.404c.097-.621.105-1.565 1.493-2.345 3.866-2.169 8.738-3.169 10.375-4.412.65-.494.482-1.292.627-2.058.144-.766.626-.24.626-1.052 0-.819.153-.676.063-1.763-.078-.948-1.386-1.049-1.46-2.821-.015-.374-.674-.623-1.06-1.197-.385-.574-1.01-1.579-1.01-2.727s.24-.862.24-2.297-.053-2.267.771-5.598c.308-1.243 1.354-2.7 2.402-3.359 1.413-.888.845.296 5.593-.756 3.077-.682 7.898 2.488 7.946 5.024.065 3.43.276 3.172.48 4.593.145 1.005.434.766.434 1.914 0 1.15-.626 2.584-1.011 3.158-.385.575-.742 1.496-.792 1.866-.252 1.917-1.54 1.474-1.593 2.501-.05.938-.111.818.03 1.549.118.61.476-.04.62.726.146.765.045 1.89.649 2.225" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

const LoginIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
  </svg>
);

const IkmanLogo = () => (
  <div style={{ fontFamily: FA, fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1, whiteSpace: 'nowrap' }}>
    Logo
  </div>
);

const navLinkStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 6,
  color: '#fff', textDecoration: 'none', fontFamily: FA,
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
};

const drawerItemStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10,
  color: '#fff', textDecoration: 'none', fontFamily: FA,
  fontSize: 15, fontWeight: 600, padding: '12px 0',
  background: 'none', border: 'none', cursor: 'pointer', width: '100%',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
};

export const Header = () => {
  const { isLoggedIn, logout, openLoginModal } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setDrawerOpen(false); }, [location]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setDrawerOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const close = () => setDrawerOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40" style={{ backgroundColor: GREEN, fontFamily: FA }}>
        <div style={{ maxWidth: 985, margin: '0 auto', padding: '0 16px', minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <IkmanLogo />
          </Link>

          {/* Desktop center */}
          <ul className="hidden md:flex" style={{ listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', gap: 0 }}>
            <li>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 14, padding: '4px 12px' }}>
                All ads
              </Link>
            </li>
            <li>
              <div style={{ display: 'flex', border: '1px solid #007168', borderRadius: 4, overflow: 'hidden' }}>
                <button style={{ background: 'transparent', border: 'none', color: '#fff', padding: '0 12px', cursor: 'pointer', fontSize: 12, fontFamily: FA, lineHeight: '1.71429' }}>සිංහල</button>
                <button style={{ background: 'transparent', border: 'none', borderLeft: '1px solid #007168', color: '#fff', padding: '0 12px', cursor: 'pointer', fontSize: 12, fontFamily: FA, lineHeight: '1.71429' }}>தமிழ்</button>
              </div>
            </li>
          </ul>

          {/* Desktop right */}
          <ul className="hidden md:flex" style={{ listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', gap: 0 }}>
            <li style={{ marginRight: 24 }}>
              <Link to="/chat" style={navLinkStyle}>
                <ChatIcon />
                <span style={{ fontSize: 14 }}>Chat</span>
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li style={{ marginRight: 24 }}>
                  <Link to="/account" style={navLinkStyle}>
                    <AccountIcon />
                    <span style={{ fontSize: 14 }}>Account</span>
                  </Link>
                </li>
                <li style={{ marginRight: 16 }}>
                  <button onClick={logout} style={navLinkStyle}>
                    <LogoutIcon />
                    <span style={{ fontSize: 14 }}>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li style={{ marginRight: 16 }}>
                <button onClick={openLoginModal} style={navLinkStyle}>
                  <LoginIcon />
                  <span style={{ fontSize: 14 }}>Log In</span>
                </button>
              </li>
            )}
            <li>
              <Link to="/post-ad" style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffc800', color: '#673500', fontWeight: 800, fontSize: 14, padding: 14, borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: FA, lineHeight: 1, whiteSpace: 'nowrap' }}>
                  POST YOUR AD
                </button>
              </Link>
            </li>
          </ul>

          {/* Mobile right: POST AD + Hamburger */}
          <div className="flex md:hidden" style={{ alignItems: 'center', gap: 10 }}>
            <Link to="/post-ad" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#ffc800', color: '#673500', fontWeight: 800, fontSize: 12, padding: '9px 11px', borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: FA, whiteSpace: 'nowrap' }}>
                POST AD
              </button>
            </Link>
            <button onClick={() => setDrawerOpen(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999 }}>
          {/* Backdrop */}
          <div onClick={close} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />

          {/* Panel */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '78%', maxWidth: 300, height: '100%',
            backgroundColor: GREEN, display: 'flex', flexDirection: 'column',
            fontFamily: FA, overflowY: 'auto',
          }}>
            {/* Drawer header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
              <IkmanLogo />
              <button onClick={close} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M6 18L18 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Drawer items */}
            <nav style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column' }}>
              <Link to="/" onClick={close} style={drawerItemStyle}>All ads</Link>

              <div style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ border: '1px solid rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden', display: 'inline-flex' }}>
                  <button style={{ background: 'transparent', border: 'none', color: '#fff', padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontFamily: FA }}>සිංහල</button>
                  <button style={{ background: 'transparent', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontFamily: FA }}>தமிழ்</button>
                </div>
              </div>

              <Link to="/chat" onClick={close} style={drawerItemStyle}>
                <ChatIcon /> Chat
              </Link>

              {isLoggedIn ? (
                <>
                  <Link to="/account" onClick={close} style={drawerItemStyle}>
                    <AccountIcon /> Account
                  </Link>
                  <button onClick={() => { logout(); close(); }} style={drawerItemStyle}>
                    <LogoutIcon /> Logout
                  </button>
                </>
              ) : (
                <button onClick={() => { openLoginModal(); close(); }} style={drawerItemStyle}>
                  <LoginIcon /> Log In
                </button>
              )}

              <div style={{ paddingTop: 20 }}>
                <Link to="/post-ad" onClick={close} style={{ textDecoration: 'none', display: 'block' }}>
                  <button style={{ width: '100%', backgroundColor: '#ffc800', color: '#673500', fontWeight: 800, fontSize: 15, padding: '14px 0', borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: FA }}>
                    POST YOUR AD
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
