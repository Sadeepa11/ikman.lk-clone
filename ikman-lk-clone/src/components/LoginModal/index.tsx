import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const FA = "'Open Sans', Arial, Helvetica, sans-serif";
const GREEN = 'rgb(20,151,119)';
const DEMO_OTP = '1234';

const CloseIcon = () => (
  <svg viewBox="0 0 60 60" width="24" height="24" fill="rgb(112,118,118)">
    <path d="M10 45.6L45.7 10l4.3 4-35.7 36z" />
    <path d="M10 14.4l4.3-4.3L50 46l-4.3 4z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="16" height="16" style={{ marginRight: 8, flexShrink: 0 }}>
    <defs>
      <path id="g-a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
    </defs>
    <clipPath id="g-b"><use xlinkHref="#g-a" /></clipPath>
    <path clipPath="url(#g-b)" fill="#FBBC05" d="M0 37V11l17 13z" />
    <path clipPath="url(#g-b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
    <path clipPath="url(#g-b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
    <path clipPath="url(#g-b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
  </svg>
);

const FbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" style={{ marginRight: 8, flexShrink: 0 }}>
    <path d="M2.425 0A2.425 2.425 0 0 0 0 2.425v13.15A2.425 2.425 0 0 0 2.425 18H8.91l.012-6.432H7.25a.394.394 0 0 1-.394-.393l-.008-2.074c0-.218.176-.395.394-.395h1.669V6.702c0-2.325 1.42-3.59 3.493-3.59h1.702c.218 0 .395.176.395.394v1.748a.394.394 0 0 1-.394.394h-1.045c-1.128 0-1.346.537-1.346 1.323v1.735h2.478c.236 0 .42.206.392.44l-.246 2.074a.394.394 0 0 1-.392.348h-2.221L11.716 18h3.858A2.426 2.426 0 0 0 18 15.575V2.425A2.425 2.425 0 0 0 15.574 0H2.425z" fill="#fff" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: 8, flexShrink: 0 }}>
    <path d="M24 3.79l-9 10.05a4.22 4.22 0 0 1-3 1.64 4.36 4.36 0 0 1-3-1.7L0 3.79v13.68a8.94 8.94 0 0 0 .1 1.27l5.23-5.37 1.34 1.35-5.34 5.37a10.11 10.11 0 0 0 1.34.12H22a1.69 1.69 0 0 0 .53-.12l-5.2-5.37 1.34-1.35 5.15 5.37a5.52 5.52 0 0 0 .18-1.52V3.79zm-11.24 9.27l8.57-9.27H2.67l8.57 9.27a1.26 1.26 0 0 0 .76.44 1.26 1.26 0 0 0 .76-.44z" fill="#fff" fillRule="evenodd" />
  </svg>
);

const PostAdBulletIcon = () => (
  <svg viewBox="0 0 36 36" width="32" height="32" style={{ flexShrink: 0 }}>
    <circle cx="18" cy="18" r="18" fill="rgb(204,180,127)" />
    <path d="M10 24l7-7 4 4 7-9" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FavBulletIcon = () => (
  <svg viewBox="0 0 36 36" width="32" height="32" style={{ flexShrink: 0 }}>
    <circle cx="18" cy="18" r="18" fill="rgb(255,200,0)" />
    <path d="M18 26l-7.5-7a4 4 0 0 1 5.6-5.7L18 15l1.9-1.7a4 4 0 0 1 5.6 5.7z" fill="#fff" />
  </svg>
);

const ManageBulletIcon = () => (
  <svg viewBox="0 0 36 36" width="32" height="32" style={{ flexShrink: 0 }}>
    <circle cx="18" cy="18" r="18" fill="rgb(83,115,138)" />
    <rect x="11" y="12" width="14" height="2" rx="1" fill="#fff" />
    <rect x="11" y="17" width="10" height="2" rx="1" fill="#fff" />
    <rect x="11" y="22" width="7" height="2" rx="1" fill="#fff" />
  </svg>
);

const BENEFITS = [
  { Icon: PostAdBulletIcon, text: 'Start posting your own ads.' },
  { Icon: FavBulletIcon, text: 'Mark ads as favorite and view them later.' },
  { Icon: ManageBulletIcon, text: 'View and manage your ads at your convenience.' },
];

const inputStyle: React.CSSProperties = {
  width: '100%', height: 32,
  border: '1px solid rgb(212,222,217)', borderRadius: 2,
  padding: '6px 12px', fontSize: 14, fontFamily: FA,
  outline: 'none', boxSizing: 'border-box',
};

const primaryBtn: React.CSSProperties = {
  width: '100%', height: 40, borderRadius: 4, border: 'none',
  backgroundColor: GREEN, color: '#fff',
  fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: FA,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const disabledBtn: React.CSSProperties = {
  ...primaryBtn,
  backgroundColor: 'rgb(175,183,173)',
  cursor: 'not-allowed',
  pointerEvents: 'none',
  opacity: 0.5,
};

export const LoginModal = () => {
  const { loginModalOpen, closeLoginModal, login } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  if (!loginModalOpen) return null;

  const handleClose = () => {
    closeLoginModal();
    setStep('phone');
    setPhone('');
    setOtp('');
    setOtpError('');
  };

  const handleContinue = () => {
    if (phone.trim().length >= 9) {
      setStep('otp');
      setOtp('');
      setOtpError('');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === DEMO_OTP) {
      login();
    } else {
      setOtpError(`Incorrect OTP. Use demo OTP: ${DEMO_OTP}`);
    }
  };

  const phoneValid = phone.trim().length >= 9;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FA,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          position: 'relative', backgroundColor: '#fff',
          borderRadius: 4, width: '100%', maxWidth: 688,
          maxHeight: '95vh', overflowY: 'auto',
          padding: '16px 16px 0',
          margin: '0 12px',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: 0, right: 0,
            background: 'transparent', border: 'none',
            padding: 12, cursor: 'pointer', zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Body */}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

          {/* Left panel */}
          <div style={{ flex: '1 1 240px', paddingRight: 24, paddingBottom: 32 }}>
            <h1 style={{ fontWeight: 800, color: 'rgb(47,52,50)', fontSize: 16, marginBottom: 8 }}>
              Welcome to ikman
            </h1>
            <div style={{ color: 'rgb(112,118,118)', marginBottom: 40, marginTop: 4 }}>
              Log in to manage your account.
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgb(112,118,118)' }}>
              {BENEFITS.map(({ Icon, text }) => (
                <li key={text} style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right panel */}
          <div style={{
            flex: '1 1 240px',
            borderLeft: '1px solid rgb(231,237,238)',
            paddingLeft: 24, paddingBottom: 32, paddingTop: 8,
          }}>
            {step === 'phone' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, lineHeight: '19px', color: 'rgb(47,52,50)', marginBottom: 16 }}>
                    Continue with mobile number &amp; OTP
                  </div>
                  {/* Phone row */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                    {/* Country code */}
                    <div style={{
                      border: '1px solid rgb(212,222,217)', borderRadius: 2,
                      height: 32, display: 'flex', alignItems: 'center',
                      padding: '0 8px', background: '#fff',
                      color: 'rgb(47,52,50)', fontSize: 14, whiteSpace: 'nowrap',
                      flexShrink: 0, gap: 4,
                    }}>
                      +94
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="rgb(175,183,173)" fillRule="nonzero" d="M7.41 8L12 12.58 16.59 8 18 9.41l-6 6-6-6z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                      onKeyDown={e => e.key === 'Enter' && phoneValid && handleContinue()}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!phoneValid}
                  style={phoneValid ? primaryBtn : disabledBtn}
                >
                  Continue
                </button>

                <div style={{ textAlign: 'center', fontWeight: 700, color: 'rgb(175,183,173)' }}>OR</div>

                {/* Social buttons */}
                <button onClick={() => login()} style={{
                  width: '100%', height: 40, borderRadius: 4,
                  border: '1px solid rgb(212,222,217)',
                  backgroundColor: '#fff', color: 'rgb(66,78,78)',
                  fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: FA,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <GoogleIcon /> Continue with Google
                </button>

                <button onClick={() => login()} style={{
                  ...primaryBtn,
                  backgroundColor: 'rgb(59,89,153)',
                }}>
                  <FbIcon /> Continue with Facebook
                </button>

                <button onClick={() => login()} style={primaryBtn}>
                  <EmailIcon /> Continue with Email
                </button>

                <div style={{ textAlign: 'center', fontSize: 12, color: 'rgb(112,118,118)', marginTop: 4 }}>
                  <div>By signing up for an account you agree to our</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
                    <a href="#" style={{ color: 'rgb(0,116,186)', textDecoration: 'none' }}>Terms and Conditions</a>
                    <div style={{ width: 1, height: 12, backgroundColor: 'rgb(212,222,217)', margin: '0 15px' }} />
                    <a href="#" style={{ color: 'rgb(0,116,186)', textDecoration: 'none' }}>Privacy Policy</a>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontWeight: 700, color: 'rgb(47,52,50)' }}>Enter OTP</div>

                {/* Demo OTP hint */}
                <div style={{
                  backgroundColor: 'rgb(243,246,245)', borderRadius: 4,
                  padding: '10px 12px', fontSize: 13, color: 'rgb(47,52,50)',
                  border: '1px solid rgb(212,222,217)',
                }}>
                  OTP sent to <strong>+94 {phone}</strong>
                  <br />
                  Demo OTP: <strong style={{ color: GREEN, fontSize: 16, letterSpacing: 2 }}>{DEMO_OTP}</strong>
                </div>

                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
                    style={{
                      ...inputStyle,
                      borderColor: otpError ? 'red' : 'rgb(212,222,217)',
                      letterSpacing: 4, fontSize: 18,
                    }}
                    autoFocus
                  />
                  {otpError && (
                    <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{otpError}</div>
                  )}
                </div>

                <button onClick={handleVerifyOtp} style={primaryBtn}>
                  Verify &amp; Login
                </button>

                <button
                  onClick={() => { setStep('phone'); setOtp(''); setOtpError(''); }}
                  style={{
                    background: 'none', border: 'none', color: GREEN,
                    cursor: 'pointer', fontSize: 14, fontFamily: FA,
                    textDecoration: 'underline', textAlign: 'left', padding: 0,
                  }}
                >
                  ← Change number
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
