import { Link } from 'react-router-dom';

const ChatIcon = () => (
  <svg viewBox="0 0 60 60" width="24" height="24" fill="white" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M38.05 30.85c-9.16.64-11.38-4.9-11.38-9.44a10.16 10.16 0 0 1 .26-2.25H20a10.57 10.57 0 0 0-2.14 20.77v4.5a1.6 1.6 0 0 0 1.57 1.6 1.53 1.53 0 0 0 1.02-.4l5.92-5.4H30a11.03 11.03 0 0 0 9.8-7.4z" />
    <path d="M28.9 21.4a7.32 7.32 0 0 1 7.03-7.4h7.03a7.43 7.43 0 0 1 1.06 14.7v3.07a1.12 1.12 0 0 1-1.1 1.13 1.08 1.08 0 0 1-.72-.28l-.04-.04-.03-.03-3.72-3.73h-2.46a7.32 7.32 0 0 1-7.03-7.4" />
  </svg>
);

const AccountIcon = () => (
  <svg viewBox="0 0 60 60" width="24" height="24" fill="white" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M36.723 34.65c1.637 1.243 6.495 2.38 10.397 4.484 1.286.694 1.396 1.724 1.492 2.345.097.622.3 7.404.3 7.404H11s.204-6.782.3-7.404c.097-.621.105-1.565 1.493-2.345 3.866-2.169 8.738-3.169 10.375-4.412.65-.494.482-1.292.627-2.058.144-.766.626-.24.626-1.052 0-.819.153-.676.063-1.763-.078-.948-1.386-1.049-1.46-2.821-.015-.374-.674-.623-1.06-1.197-.385-.574-1.01-1.579-1.01-2.727s.24-.862.24-2.297-.053-2.267.771-5.598c.308-1.243 1.354-2.7 2.402-3.359 1.413-.888.845.296 5.593-.756 3.077-.682 7.898 2.488 7.946 5.024.065 3.43.276 3.172.48 4.593.145 1.005.434.766.434 1.914 0 1.15-.626 2.584-1.011 3.158-.385.575-.742 1.496-.792 1.866-.252 1.917-1.54 1.474-1.593 2.501-.05.938-.111.818.03 1.549.118.61.476-.04.62.726.146.765.045 1.89.649 2.225" />
  </svg>
);

const IkmanLogo = () => (
  <div style={{
    fontFamily: "'Open Sans', Arial, Helvetica, sans-serif",
    fontSize: '20px',
    fontWeight: 800,
    color: '#ffffff',
    letterSpacing: '-0.5px',
    lineHeight: '1',
    whiteSpace: 'nowrap',
  }}>
    Logo
  </div>
);

export const Header = () => {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: '#149777',
        minHeight: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px 16px',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '985px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left side */}
        <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontSize: '12px', gap: 0 }}>
          {/* Logo */}
          <li style={{ marginLeft: 0, marginRight: '12px' }}>
            <Link to="/" title="ikman - the largest marketplace in Sri Lanka" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <IkmanLogo />
            </Link>
          </li>

          {/* All ads */}
          <li>
            <Link
              to="/"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '14px',
                padding: '4px 12px',
                borderRadius: '4px',
                margin: '0 12px',
                display: 'inline-block',
              }}
            >
              All ads
            </Link>
          </li>

          {/* Language selector */}
          <li>
            <div
              style={{
                display: 'flex',
                border: '1px solid #007168',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0 12px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  lineHeight: '1.71429',
                }}
              >
                සිංහල
              </button>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderLeft: '1px solid #007168',
                  color: '#ffffff',
                  padding: '0 12px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  lineHeight: '1.71429',
                }}
              >
                தமிழ்
              </button>
            </div>
          </li>
        </ul>

        {/* Right side */}
        <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontSize: '12px', gap: 0 }}>
          {/* Chat */}
          <li style={{ marginRight: '24px' }}>
            <Link
              to="/chat"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
                gap: '4px',
              }}
            >
              <ChatIcon />
              <span style={{ marginLeft: '4px' }}>Chat</span>
            </Link>
          </li>

          {/* Account */}
          <li style={{ marginRight: '16px' }}>
            <Link
              to="/account"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
                gap: '4px',
              }}
            >
              <AccountIcon />
              <span style={{ marginLeft: '4px' }}>Account</span>
            </Link>
          </li>

          {/* POST YOUR AD */}
          <li style={{ marginLeft: '12px' }}>
            <Link to="/post-ad" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: '#ffc800',
                  color: '#673500',
                  fontWeight: 800,
                  fontSize: '14px',
                  padding: '14px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                POST YOUR AD
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
