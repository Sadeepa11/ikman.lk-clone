const FA = "'Open Sans', Arial, sans-serif";

export const ChatPage = () => (
  <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: FA }}>
    <div style={{ maxWidth: 985, margin: '16px auto', padding: '0 12px 34px' }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: 4, padding: 24,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 16, color: 'rgb(47,52,50)',
          fontWeight: 700, marginBottom: 32, fontFamily: FA,
        }}>
          No conversations yet!
        </div>
        <img
          srcSet="https://w.bikroy-st.com/dist/img/all/chat/icon-emptystate-7182b78c.png 1x, https://w.bikroy-st.com/dist/img/all/chat/icon-emptystate-2x-081e62ec.png 1.3x"
          width="96"
          alt=""
          style={{ display: 'block', margin: '0 auto 32px' }}
        />
        <div style={{ color: 'rgb(112,118,118)', marginBottom: 32, fontSize: 14, fontFamily: FA }}>
          Click "Chat" on an ad or post your own ad to start chatting.
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 16, maxWidth: 320, margin: '0 auto' }}>
          <a href="/properties" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            borderRadius: 4, fontWeight: 700, fontSize: 14,
            padding: '7px 14px', flex: '1 1 0%',
            backgroundColor: 'rgb(243,246,245)', color: 'rgb(112,118,118)',
            border: '1px solid rgb(212,222,217)', textDecoration: 'none',
            fontFamily: FA,
          }}>
            Browse ads
          </a>
          <a href="/post-ad" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            borderRadius: 4, fontWeight: 800, fontSize: 14,
            padding: '7px 14px', flex: '1 1 0%',
            backgroundColor: 'rgb(255,200,0)', color: 'rgb(103,53,0)',
            textDecoration: 'none', fontFamily: FA,
          }}>
            Post an ad!
          </a>
        </div>
      </div>
    </div>
  </div>
);
