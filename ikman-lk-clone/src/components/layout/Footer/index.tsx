import { useIsMobile } from '../../../hooks/useIsMobile';

const FA = "'Open Sans', Arial, Helvetica, sans-serif";

const sections = [
  {
    title: 'More from ikman',
    links: [
      { label: 'Sell Fast', href: '#' },
      { label: 'Membership', href: '#' },
      { label: 'Banner Ads', href: '#' },
      { label: 'Boost Ad', href: '#' },
    ],
  },
  {
    title: 'Help & Support',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Stay safe', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
  {
    title: 'About ikman',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Terms and Conditions', href: '#' },
      { label: 'Privacy policy', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
  },
  {
    title: 'Blog & Guides',
    links: [
      { label: 'MotorGuide LK', href: '#' },
      { label: 'PropertyGuide LK', href: '#' },
      { label: 'Official Blog', href: '#' },
    ],
  },
];

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.333 10c0-4.6-3.733-8.333-8.333-8.333A8.336 8.336 0 0 0 1.667 10c0 4.033 2.866 7.392 6.666 8.167V12.5H6.667V10h1.666V7.917A2.92 2.92 0 0 1 11.25 5h2.083v2.5h-1.666a.836.836 0 0 0-.834.833V10h2.5v2.5h-2.5v5.792a8.332 8.332 0 0 0 7.5-8.292z" fill="#2F3432" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <g clipPath="url(#tw-clip)">
      <path d="M14.175.843h2.76l-6.03 6.91L18 17.157h-5.554l-4.354-5.703-4.975 5.703H.354l6.449-7.393L0 .844h5.696l3.929 5.212 4.55-5.213zm-.97 14.658h1.53L4.86 2.413H3.22l9.984 13.088z" fill="#2F3432" />
    </g>
    <defs><clipPath id="tw-clip"><path fill="#fff" d="M0 0h18v18H0z" /></clipPath></defs>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M14.058 4.507A3.803 3.803 0 0 1 13.116 2h-2.747v11.022a2.304 2.304 0 0 1-2.302 2.222 2.318 2.318 0 0 1-2.311-2.31c0-1.53 1.475-2.676 2.995-2.205V7.92C5.684 7.511 3 9.893 3 12.933 3 15.893 5.453 18 8.058 18a5.063 5.063 0 0 0 5.058-5.067v-5.59a6.533 6.533 0 0 0 3.822 1.226V5.822s-1.671.08-2.88-1.315z" fill="#2F3432" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.385 5.783a2.195 2.195 0 0 0-1.547-1.549C15.473 3.867 10 3.867 10 3.867s-5.473 0-6.838.365a2.19 2.19 0 0 0-1.547 1.55C1.25 7.147 1.25 10 1.25 10s0 2.852.365 4.217a2.193 2.193 0 0 0 1.547 1.549c1.365.367 6.838.367 6.838.367s5.473 0 6.838-.367a2.19 2.19 0 0 0 1.547-1.55c.365-1.364.365-4.216.365-4.216s0-2.852-.365-4.217zM8.262 12.617V7.383l4.531 2.597-4.531 2.637z" fill="#2F3432" />
  </svg>
);

const GooglePlayBadge = () => (
  <svg width="120" height="36" viewBox="0 0 120 36" fill="none">
    <rect width="120" height="36" rx="4" fill="#000" />
    <rect x="0.5" y="0.5" width="119" height="35" rx="3.5" stroke="#A6A6A6" />
    <path d="M9.28 6.786c-.29.352-.436.803-.409 1.26v19.908c-.027.457.12.908.409 1.26l.062.063 11.013-11.142v-.261L9.342 6.723l-.062.063z" fill="url(#gp1)" />
    <path d="M24 21.852l-3.644-3.717v-.261L24 14.148l.08.045 4.364 2.511c1.245.711 1.245 1.881 0 2.601l-4.346 2.502-.098.045z" fill="url(#gp2)" />
    <path d="M24.107 21.798L20.356 18 9.28 29.214a1.439 1.439 0 0 0 1.849.054l12.987-7.47" fill="url(#gp3)" />
    <path d="M24.107 14.202L11.12 6.732a1.437 1.437 0 0 0-1.849.054L20.356 18l3.75-3.798z" fill="url(#gp4)" />
    <text x="37" y="13" fill="#fff" fontSize="7" fontFamily="Arial" fontWeight="400">GET IT ON</text>
    <text x="37" y="26" fill="#fff" fontSize="12" fontFamily="Arial" fontWeight="700">Google Play</text>
    <defs>
      <linearGradient id="gp1" x1="15.879" y1="7.839" x2="6.321" y2="17.279" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00A0FF" /><stop offset="1" stopColor="#00E3FF" />
      </linearGradient>
      <linearGradient id="gp2" x1="30.071" y1="18" x2="8.569" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE000" /><stop offset="1" stopColor="#FF9C00" />
      </linearGradient>
      <linearGradient id="gp3" x1="22.071" y1="21.579" x2="5.742" y2="37.699" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF3A44" /><stop offset="1" stopColor="#C31162" />
      </linearGradient>
      <linearGradient id="gp4" x1="6.489" y1="5.051" x2="13.777" y2="12.249" gradientUnits="userSpaceOnUse">
        <stop stopColor="#32A071" /><stop offset="1" stopColor="#00F076" />
      </linearGradient>
    </defs>
  </svg>
);

const AppStoreBadge = () => (
  <svg width="120" height="36" viewBox="0 0 120 36" fill="none">
    <rect width="120" height="36" rx="4" fill="#000" />
    <rect x="0.5" y="0.5" width="119" height="35" rx="3.5" stroke="#A6A6A6" />
    <path d="M14 10.5c1.5-1.8 2.5-1.7 2.5-1.7s.2 1.5-.8 2.8c-1.1 1.4-2.3 1.2-2.3 1.2S13 12 14 10.5z" fill="#fff" />
    <path d="M13.5 13.5c.6 0 1.8-.8 3.3-.8 2.6 0 3.6 1.9 3.6 1.9s-2 1-2 3.4c0 2.7 2.4 3.6 2.4 3.6s-1.7 4.7-3.9 4.7c-1 0-1.8-.7-2.9-.7-1.1 0-2.2.7-2.9.7-2.1 0-4.1-4.5-4.1-8.1 0-3.5 2.2-5.3 4.2-5.3 1.3 0 2.3.6 3.3.6z" fill="#fff" />
    <text x="25" y="13" fill="#fff" fontSize="6.5" fontFamily="Arial">Download on the</text>
    <text x="25" y="26" fill="#fff" fontSize="13" fontFamily="Arial" fontWeight="700">App Store</text>
  </svg>
);

export const Footer = () => {
  const isMobile = useIsMobile();
  const sectionBasis = isMobile ? '45%' : '16%';

  return (
    <footer style={{ backgroundColor: 'rgb(243,246,245)', fontFamily: FA, fontSize: 14 }}>
      <div style={{ maxWidth: 985, margin: '0 auto' }}>
        <div style={{ padding: isMobile ? '24px 16px 0' : '33px 0 0' }}>

          {/* Main grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16, width: '100%', fontSize: 14, lineHeight: '24px', gap: isMobile ? '0 10%' : 0 }}>

            {/* Link sections */}
            {sections.map(({ title, links }) => (
              <div key={title} style={{ flexBasis: sectionBasis, marginBottom: 24 }}>
                <div style={{ fontWeight: 800, color: 'rgb(66,78,78)', marginBottom: 8, marginTop: 4, fontSize: isMobile ? 14 : 16 }}>
                  {title}
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {links.map(({ label, href }) => (
                    <li key={label} style={{ lineHeight: 2.3 }}>
                      <a href={href} style={{ textDecoration: 'none', color: 'rgb(47,52,50)', fontFamily: FA }}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>

                {title === 'Blog & Guides' && (
                  <div style={{ marginTop: 8 }}>
                    {[
                      { Icon: FacebookIcon, href: '#' },
                      { Icon: TwitterIcon, href: '#' },
                      { Icon: TikTokIcon, href: '#' },
                      { Icon: YouTubeIcon, href: '#' },
                    ].map(({ Icon, href }, i) => (
                      <a key={i} href={href} style={{ marginRight: 8, display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Icon />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Download section */}
            <div style={{ flexBasis: sectionBasis, marginBottom: 24 }}>
              <div style={{ fontWeight: 800, color: 'rgb(66,78,78)', marginBottom: 8, marginTop: 4, fontSize: isMobile ? 14 : 16 }}>
                Download our app
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <a href="#" style={{ display: 'inline-block', textDecoration: 'none' }}>
                  <GooglePlayBadge />
                </a>
                <a href="#" style={{ display: 'inline-block', textDecoration: 'none' }}>
                  <AppStoreBadge />
                </a>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div style={{ borderBottom: '1px solid rgb(212,222,217)', width: '100%' }} />

          {/* Copyright row */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            margin: '18px 0',
            color: 'rgb(112,118,118)',
            fontSize: 14, lineHeight: '24px',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'stretch',
            gap: isMobile ? 8 : 0,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            <div style={{ flexBasis: isMobile ? '100%' : '50%' }}>
              © 2026 All rights reserved.
            </div>
            <div style={{ flexBasis: isMobile ? '100%' : '50%', textAlign: isMobile ? 'center' : 'right' }}>
              <span style={{ fontFamily: FA, fontSize: 20, fontWeight: 800, color: 'rgb(47,52,50)' }}>Logo</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
