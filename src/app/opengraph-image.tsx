import { ImageResponse } from 'next/og'

export const alt = 'Autorijschool Yorulmaz – rijlessen in Doesburg en omgeving'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0c121c',
          color: '#ffffff',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: 4 }}>YORULMAZ</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            <div style={{ width: 40, height: 3, background: '#d7263d', marginRight: 16 }} />
            <div style={{ fontSize: 18, letterSpacing: 8, color: 'rgba(255,255,255,0.65)' }}>
              AUTORIJSCHOOL
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Zeker de weg op.
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, color: 'rgba(255,255,255,0.5)' }}>
            Stap voor stap naar je rijbewijs.
          </div>
          <div style={{ marginTop: 36, fontSize: 26, color: '#d7263d', letterSpacing: 3 }}>
            RIJLESSEN IN DOESBURG EN OMGEVING
          </div>
        </div>
      </div>
    ),
    size,
  )
}
