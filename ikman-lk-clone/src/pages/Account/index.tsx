import { Link, useLocation } from 'react-router-dom';

const FA = "'Open Sans', Arial, sans-serif";

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" style={{ flexShrink: 0, marginLeft: 10 }}>
    <path d="M9 18l6-6-6-6" stroke="rgb(175,183,173)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const accountNavItems = [
  { label: 'My ads', href: '/account' },
  { label: 'My membership', href: '/account/membership' },
  { label: 'Saved searches', href: '/account/saved-searches' },
  { label: 'Favorites', href: '/account/favorites' },
  { label: 'Settings', href: '/account/settings' },
  { label: 'Phone Numbers', href: '/account/phone-numbers' },
];


const EmptyBoxIllustration = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <g fillRule="evenodd" clipRule="evenodd">
      <path d="M64.755 39.035v38.621c0 2.236-1.77 4.046-3.955 4.046H5.727c-2.186 0-3.956-1.81-3.956-4.046V39.035h62.984z" fill="#CCB47F" />
      <path d="M33.263 39.035H1.771v38.621c0 2.236 1.77 4.046 3.956 4.046h27.536V39.035z" fill="#C1A772" />
      <path d="M64.755 39.022H1.771v.013h62.984v34.54-34.553z" fill="#E7E3D8" />
      <path d="M64.755 39.035H33.263v12.177h10.159l21.333 22.363v-34.54z" fill="#BFA772" />
      <path d="M1.771 39.035h31.492v12.177H1.771V39.035z" fill="#B69D68" />
      <path d="M19.04 58.35h28.445v16.24H19.041V58.35z" fill="#E3E2D5" />
      <path d="M19.04 58.337h14.223v.015H19.041v-.015z" fill="#B79E6C" />
      <path d="M19.04 74.591h14.223v-16.24H19.041v16.24z" fill="#D7D6CA" />
      <path d="M22.089 61.398h22.349v4.05h-22.35v-4.05zM22.089 67.493h22.349v4.05h-22.35v-4.05z" fill="#A9A9A9" />
      <path d="M22.089 61.385h11.174v4.063H22.09v-4.063zM22.089 67.48h11.174v4.063H22.09V67.48z" fill="#999" />
      <path d="M54.596 21.766H11.93L1.77 39.036h62.984l-10.159-17.27z" fill="#89733E" />
      <path d="M11.93 20.763h42.666V39.05H11.93V20.763z" fill="#725F36" />
      <path d="M66.904 50.095l-25.861-25.86-5.747 5.747 25.86 25.861 5.748-5.748z" fill="#C1A772" />
      <path d="M29.2 39.036L64.755 74.59v-17.27L46.215 39.29" fill="#B59B6A" />
      <path d="M87.016 81.702l-51.72-51.72 5.747-5.747 51.72 51.72-5.747 5.747z" fill="#CCB47F" />
      <path d="M98.279 55.613L61.387 18.72l-20.344 5.515 51.72 51.72 5.516-20.342z" fill="#CCB47F" />
      <path d="M61.387 18.72l-20.344 5.515 25.86 25.86 12.93-12.929L61.387 18.72z" fill="#C6AF7F" />
      <path d="M47.656 51.633c0 1.46-.987 2.64-2.202 2.64H21.073c-1.215 0-2.2-1.18-2.2-2.64v-.814c0-1.458.985-2.64 2.2-2.64h24.38c1.216 0 2.203 1.182 2.203 2.64v.814z" fill="#4F493D" />
    </g>
  </svg>
);

const ARROW_PNG = "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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4KfpfwGj2h1lA63PIQAAAABJRU5ErkJggg==";

const PostAdArrowLeft = () => (
  <svg width="77" height="70" viewBox="0 0 77 70" fill="none" style={{ flexShrink: 0 }}>
    <path fill="url(#post-ad-arrow-left-pat)" d="M0 0h77v70H0z" />
    <defs>
      <pattern id="post-ad-arrow-left-pat" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#post-ad-arrow-left-img" transform="matrix(.00658 0 0 .00725 -4.118 -1.688)" />
      </pattern>
      <image id="post-ad-arrow-left-img" width="1382" height="564" href={`data:image/png;base64,${ARROW_PNG}`} />
    </defs>
  </svg>
);

const PostAdArrowRight = () => (
  <svg width="77" height="70" viewBox="0 0 77 70" fill="none" style={{ flexShrink: 0 }}>
    <path transform="matrix(-1 0 0 1 77 0)" fill="url(#post-ad-arrow-right-pat)" d="M0 0h77v70H0z" />
    <defs>
      <pattern id="post-ad-arrow-right-pat" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#post-ad-arrow-right-img" transform="matrix(.00658 0 0 .00725 -4.118 -1.688)" />
      </pattern>
      <image id="post-ad-arrow-right-img" width="1382" height="564" href={`data:image/png;base64,${ARROW_PNG}`} />
    </defs>
  </svg>
);


const MembershipIcon = () => (
  <svg width="72" height="72" viewBox="0 0 880 440" style={{ flexShrink: 0 }}>
    <defs>
      <clipPath id="clip-membership">
        <rect width="880" height="440" rx="8" />
      </clipPath>
    </defs>
    <rect width="880" height="440" rx="8" fill="rgb(0,116,186)" clipPath="url(#clip-membership)" />
    <rect x="0" y="0" width="440" height="440" fill="rgb(41,171,226)" />
    <rect x="440" y="0" width="440" height="440" fill="rgb(0,116,186)" />
    <text x="220" y="270" textAnchor="middle" fill="white" fontSize="200" fontWeight="800" fontFamily="Arial, sans-serif">i</text>
    <rect x="440" y="160" width="280" height="36" rx="4" fill="rgba(255,255,255,0.3)" />
    <rect x="440" y="220" width="200" height="24" rx="4" fill="rgba(255,255,255,0.2)" />
    <rect x="440" y="264" width="240" height="24" rx="4" fill="rgba(255,255,255,0.2)" />
    <text x="560" y="360" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="28" fontFamily="Arial, sans-serif" fontWeight="600">ikman member</text>
  </svg>
);

const SavedSearchArrowLeft = () => (
  <svg width="77" height="70" viewBox="0 0 58 58" fill="none" style={{ flexShrink: 0 }}>
    <path d="M45.936 43.5c-.29 0-.522 0-.754-.058-2.378-2.726-4.408-5.684-5.974-8.99-.812-1.682-3.422-.464-2.61 1.218a46.414 46.414 0 0 0 4.466 7.308C24.302 39.904 15.196 23.026 12.818 6.96c-.29-1.856-3.132-1.334-2.842.464 2.436 16.53 11.89 33.698 28.42 37.932a44.242 44.242 0 0 0-10.092 3.132c-.812.348-1.102 1.566-.464 2.262 1.16 1.218 2.088 1.566 3.77 1.45 1.276-.058 1.45-1.392.812-2.204a40.688 40.688 0 0 1 12.644-2.378c.116.116.232.232.348.29 1.334 1.276 3.538-.58 2.204-1.856l-.058-.058c0-.348-.116-.696-.348-.928.058-.812-.348-1.566-1.276-1.566z" fill="#88CBF3" />
  </svg>
);

const SavedSearchArrowRight = () => (
  <svg width="77" height="70" viewBox="0 0 58 58" fill="none" style={{ flexShrink: 0 }}>
    <path d="M12.064 43.5c.29 0 .522 0 .754-.058 2.378-2.726 4.408-5.684 5.974-8.99.812-1.682 3.422-.464 2.61 1.218a46.414 46.414 0 0 1-4.466 7.308C33.698 39.904 42.804 23.026 45.182 6.96c.29-1.856 3.132-1.334 2.842.464-2.436 16.53-11.89 33.698-28.42 37.932a44.242 44.242 0 0 1 10.092 3.132c.812.348 1.102 1.566.464 2.262-1.16 1.218-2.088 1.566-3.77 1.45-1.276-.058-1.45-1.392-.812-2.204a40.688 40.688 0 0 0-12.644-2.378c-.116.116-.232.232-.348.29-1.334 1.276-3.538-.58-2.204-1.856l.058-.058c0-.348.116-.696.348-.928-.058-.812.348-1.566 1.276-1.566z" fill="#88CBF3" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M.75 2.333c0-.966.784-1.75 1.75-1.75h7c.966 0 1.75.784 1.75 1.75v10.5a.583.583 0 0 1-.817.535L6 11.428l-4.433 1.94a.583.583 0 0 1-.817-.535v-10.5zM2.5 1.75a.583.583 0 0 0-.583.583v9.608l3.85-1.684a.583.583 0 0 1 .467 0l3.85 1.684V2.333A.583.583 0 0 0 9.5 1.75h-7z" fill="#0074BA" />
  </svg>
);

const NavList = ({ items, activeHref }: { items: typeof accountNavItems; activeHref: string }) => (
  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
    {items.map((item, i) => {
      const isActive = item.href === activeHref;
      return (
        <li key={item.label} style={{
          borderBottom: i < items.length - 1 ? '1px solid rgb(231,237,238)' : 'none',
          borderTop: i === 0 ? '1px solid rgb(231,237,238)' : 'none',
        }}>
          <Link to={item.href} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 8px',
            fontWeight: isActive ? 700 : 400,
            fontSize: 14,
            color: isActive ? 'rgb(47,52,50)' : 'rgb(0,116,186)',
            textDecoration: 'none',
            fontFamily: 'Arial, sans-serif',
          }}>
            {item.label}
            <ChevronRight />
          </Link>
        </li>
      );
    })}
  </ul>
);

const SectionTitle = ({ children }: { children: string }) => (
  <h2 style={{
    paddingBottom: 8,
    borderBottom: '1px solid rgb(212,222,217)',
    fontWeight: 600, color: 'rgb(47,52,50)',
    fontSize: 16, lineHeight: '22px',
    marginBottom: 32, fontFamily: FA,
    marginTop: 0,
  }}>
    {children}
  </h2>
);

const MyAdsContent = () => (
  <>
    <SectionTitle>Guest User</SectionTitle>
    <div style={{
      display: 'flex', flexDirection: 'row',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', marginBottom: 32,
    }}>
      <EmptyBoxIllustration />
      <div style={{
        marginLeft: 18, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', height: 100,
      }}>
        <div style={{
          marginBottom: 18, color: 'rgb(47,52,50)',
          fontSize: 16, fontWeight: 600, fontFamily: FA,
        }}>
          You don't have any ads yet.
        </div>
        <div style={{
          color: 'rgb(112,118,118)', fontSize: 14,
          fontWeight: 400, fontFamily: FA,
        }}>
          Click the Post an ad now! button to post your ad.
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
      <PostAdArrowLeft />
      <button type="button" style={{
        backgroundColor: 'rgb(255,200,0)',
        color: 'rgb(103,53,0)',
        fontWeight: 800, fontSize: 14,
        padding: 14,
        border: 'none', borderRadius: 4,
        cursor: 'pointer', fontFamily: FA,
        display: 'flex', justifyContent: 'center',
        whiteSpace: 'nowrap',
      }}>
        Post your ad now!
      </button>
      <PostAdArrowRight />
    </div>
  </>
);

const MyMembershipContent = () => (
  <>
    <SectionTitle>My Membership</SectionTitle>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: 18 }}>
      <MembershipIcon />
      <div style={{
        fontFamily: FA, fontWeight: 600, fontSize: 18,
        color: 'rgb(47,52,50)', marginLeft: 8,
      }}>
        Become a ikman member
      </div>
    </div>
    <p style={{
      marginTop: 26, width: '65%',
      fontFamily: FA, fontSize: 14, color: 'rgb(112,118,118)',
      lineHeight: '1.6', marginBottom: 0,
    }}>
      Become an ikman member and enjoy exclusive benefits including priority customer support,
      enhanced visibility for your ads, and access to premium features that help you sell faster.
    </p>
    <div style={{ marginTop: 22 }}>
      <button type="button" style={{
        backgroundColor: 'rgb(20,151,119)',
        color: '#fff',
        fontWeight: 800, fontSize: 14,
        padding: '14px 40px',
        border: 'none', borderRadius: 4,
        cursor: 'pointer', fontFamily: FA,
      }}>
        Contact us
      </button>
    </div>
  </>
);

const SavedSearchesContent = () => (
  <>
    <SectionTitle>Saved searches</SectionTitle>
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: FA, fontWeight: 600, fontSize: 16,
        color: 'rgb(47,52,50)', marginBottom: 8, textAlign: 'center',
      }}>
        You have no saved searches.
      </div>
      <div style={{
        fontFamily: FA, fontSize: 14, color: 'rgb(112,118,118)',
        marginBottom: 32, textAlign: 'center',
      }}>
        Save your searches to get notified about new ads matching your criteria.
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
        <SavedSearchArrowLeft />
        <button type="button" style={{
          backgroundColor: 'rgb(226,244,255)',
          color: 'rgb(0,116,186)',
          fontSize: 14,
          padding: 14,
          border: 'none', borderRadius: 4,
          cursor: 'default', fontFamily: FA,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          whiteSpace: 'nowrap',
        }}>
          <BookmarkIcon />
          <span style={{ marginLeft: 8 }}>Save search</span>
        </button>
        <SavedSearchArrowRight />
      </div>
    </div>
  </>
);



const SavedFavoritesContent = () => (
  <>
    <SectionTitle>Favorites</SectionTitle>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgb(112,118,118)', fontSize: 14, fontFamily: FA, marginTop: 40,
    }}>
      You have no favorite ads yet.
    </div>
  </>
);

const FavoritesContent = () => (
  <div style={{
    padding: '16px', textAlign: 'center',
    backgroundColor: '#fff', borderRadius: 2,
    fontFamily: FA,
  }}>
    <div style={{
      fontSize: 16, color: 'rgb(47,52,50)',
      fontWeight: 700, marginBottom: 32,
    }}>
      No conversations yet!
    </div>
    <img
      srcSet="https://w.bikroy-st.com/dist/img/all/chat/icon-emptystate-7182b78c.png 1x, https://w.bikroy-st.com/dist/img/all/chat/icon-emptystate-2x-081e62ec.png 1.3x"
      width="96"
      alt=""
      style={{ display: 'block', margin: '0 auto 32px' }}
    />
    <div style={{ color: 'rgb(112,118,118)', marginBottom: 32, fontSize: 14 }}>
      Click "Chat" on an ad or post your own ad to start chatting.
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 16 }}>
      <a href="/properties" style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderRadius: 4, fontWeight: 700, fontSize: 14,
        padding: '7px 14px', flex: '1 1 0%',
        backgroundColor: 'rgb(243,246,245)', color: 'rgb(112,118,118)',
        border: '1px solid rgb(212,222,217)', textDecoration: 'none',
      }}>
        Browse ads
      </a>
      <a href="/post-ad" style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderRadius: 4, fontWeight: 800, fontSize: 14,
        padding: '7px 14px', flex: '1 1 0%',
        backgroundColor: 'rgb(255,200,0)', color: 'rgb(103,53,0)',
        textDecoration: 'none',
      }}>
        Post an ad!
      </a>
    </div>
  </div>
);

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" d="M7.41 8L12 12.58 16.59 8 18 9.41l-6 6-6-6z" fill="rgb(175,183,173)" />
  </svg>
);

const SettingsTextInput = ({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) => (
  <div style={{ paddingBottom: 12 }}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <label style={{ fontSize: 12, color: 'rgb(112,118,118)', marginBottom: 4, fontFamily: FA }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          fontSize: 14, width: '100%',
          border: '1px solid rgb(212,222,217)', borderRadius: 2,
          padding: '6px 6px 6px 12px', height: 32,
          fontFamily: FA, outline: 'none', boxSizing: 'border-box',
          color: 'rgb(47,52,50)', backgroundColor: '#fff',
        }}
      />
    </div>
    <div style={{ minHeight: 20 }} />
  </div>
);

const SettingsDropdown = ({ label }: { label: string }) => (
  <div style={{ paddingBottom: 12 }}>
    <div style={{ marginBottom: 4 }}>
      <label style={{ fontSize: 12, color: 'rgb(112,118,118)', fontFamily: FA }}>{label}</label>
    </div>
    <button type="button" style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      width: '100%', height: 32,
      border: '1px solid rgb(212,222,217)', borderRadius: 2,
      backgroundColor: '#fff', paddingLeft: 8, paddingRight: 2,
      fontSize: 14, fontFamily: FA, color: 'rgb(175,183,173)',
      cursor: 'pointer', outline: 'none', boxSizing: 'border-box',
    }}>
      <span>{label}</span>
      <span style={{ width: 24, height: 24, marginRight: 4, display: 'flex', alignItems: 'center' }}>
        <ChevronDownIcon />
      </span>
    </button>
    <div style={{ minHeight: 20 }} />
  </div>
);

const SettingsContent = () => (
  <>
    <h2 style={{
      paddingBottom: 4, borderBottom: '1px solid rgb(212,222,217)',
      fontWeight: 600, color: 'rgb(47,52,50)', fontSize: 16,
      marginTop: 0, marginBottom: 0, fontFamily: FA,
    }}>
      Settings
    </h2>

    <div>
      <h2 style={{
        marginTop: 26, marginBottom: 16,
        fontWeight: 600, color: 'rgb(66,78,78)', fontSize: 16, fontFamily: FA,
      }}>
        Change details
      </h2>

      <div style={{ marginTop: 14, marginBottom: 20 }}>
        <label style={{ color: 'rgb(0,152,119)', fontSize: 14, fontFamily: FA }}>Email:</label>
        <span style={{ marginLeft: 4, fontSize: 14, fontFamily: FA, color: 'rgb(47,52,50)' }}>
          user@example.com
        </span>
      </div>

      <form style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxWidth: 344 }}>
          <SettingsTextInput label="Name" placeholder="Name" />
          <SettingsDropdown label="Location" />
          <SettingsDropdown label="Sub location" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 344 }}>
          <button type="submit" style={{
            width: 170, fontWeight: 600, color: 'rgb(47,52,50)',
            backgroundColor: 'rgb(243,246,245)',
            border: '1px solid rgb(212,222,217)', borderRadius: 4,
            padding: 14, fontSize: 14, fontFamily: FA,
            display: 'flex', justifyContent: 'center', cursor: 'pointer',
          }}>
            Update details
          </button>
        </div>
      </form>

      <div style={{ marginTop: 34 }}>
        <h2 style={{
          marginTop: 26, marginBottom: 14,
          fontWeight: 600, color: 'rgb(66,78,78)', fontSize: 16, fontFamily: FA,
        }}>
          Change password
        </h2>
        <form style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ maxWidth: 344 }}>
            <SettingsTextInput label="New password" placeholder="New password" type="password" />
            <SettingsTextInput label="Confirm new password" placeholder="Confirm new password" type="password" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 344 }}>
            <button type="submit" disabled style={{
              width: 170, fontWeight: 600, color: 'rgb(47,52,50)',
              backgroundColor: 'rgb(243,246,245)',
              border: '1px solid rgb(212,222,217)', borderRadius: 4,
              padding: 14, fontSize: 14, fontFamily: FA,
              display: 'flex', justifyContent: 'center',
              pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed',
            }}>
              Change password
            </button>
          </div>
        </form>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'nowrap',
        justifyContent: 'flex-start', gap: 16,
        borderTop: '1px solid rgb(212,222,217)',
        paddingTop: 28, marginTop: 28,
      }}>
        <button type="button" style={{
          width: 170, fontWeight: 600, color: '#fff',
          backgroundColor: 'rgb(20,151,119)',
          border: 'none', borderRadius: 4,
          padding: 14, fontSize: 14, fontFamily: FA,
          display: 'flex', justifyContent: 'center', cursor: 'pointer',
        }}>
          Delete account
        </button>
        <button type="button" style={{
          width: 170, fontWeight: 600, color: '#fff',
          backgroundColor: 'rgb(217,94,70)',
          border: 'none', borderRadius: 4,
          padding: 14, fontSize: 14, fontFamily: FA,
          display: 'flex', justifyContent: 'center', cursor: 'pointer',
        }}>
          Log out
        </button>
      </div>
    </div>
  </>
);

const PhoneNumbersContent = () => (
  <>
    <h2 style={{
      paddingBottom: 8,
      borderBottom: '1px solid rgb(212,222,217)',
      fontWeight: 600, fontSize: 16, lineHeight: '22px',
      color: 'rgb(47,52,50)', marginTop: 0, marginBottom: 0, fontFamily: FA,
    }}>
      Phone Numbers
    </h2>
    <div style={{ borderBottom: '0.5px solid rgb(200,200,200)', marginBottom: 24 }} />
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgb(112,118,118)', fontSize: 14, fontFamily: FA, marginTop: 40,
    }}>
      You have no phone numbers added yet.
    </div>
  </>
);

const JobsProfileContent = () => (
  <>
    <SectionTitle>My Profile</SectionTitle>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgb(112,118,118)', fontSize: 14, fontFamily: FA, marginTop: 40,
    }}>
      You haven't created a jobs profile yet.
    </div>
  </>
);

const JobsDatabaseContent = () => (
  <>
    <SectionTitle>Profile Database</SectionTitle>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgb(112,118,118)', fontSize: 14, fontFamily: FA, marginTop: 40,
    }}>
      No profiles found in the database.
    </div>
  </>
);

const getContent = (pathname: string) => {
  if (pathname === '/account' || pathname === '/account/') return <MyAdsContent />;
  if (pathname === '/account/membership') return <MyMembershipContent />;
  if (pathname === '/account/saved-searches') return <SavedSearchesContent />;
  if (pathname === '/account/favorites') return <SavedFavoritesContent />;
  if (pathname === '/account/chat') return <FavoritesContent />;
  if (pathname === '/account/settings') return <SettingsContent />;
  if (pathname === '/account/phone-numbers') return <PhoneNumbersContent />;
  if (pathname === '/account/jobs/profile') return <JobsProfileContent />;
  if (pathname === '/account/jobs/database') return <JobsDatabaseContent />;
  return <MyAdsContent />;
};

export const AccountPage = () => {
  const location = useLocation();
  const activeHref = location.pathname;

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: FA }}>
      <div style={{ maxWidth: 985, margin: '16px auto', padding: '0 8px 34px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: 4, padding: 24, display: 'flex' }}>

          {/* Left Navigation */}
          <div style={{ width: '24%', flexShrink: 0, overflowY: 'auto' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4 style={{
                  fontSize: 18, fontWeight: 400,
                  color: 'rgb(47,52,50)', fontFamily: FA, margin: '0 0 12px',
                }}>
                  Account
                </h4>
              </div>
              <NavList items={accountNavItems} activeHref={activeHref} />
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, minWidth: 0, padding: '13px 20px' }}>
            {getContent(activeHref)}
          </div>

        </div>
      </div>
    </div>
  );
};
