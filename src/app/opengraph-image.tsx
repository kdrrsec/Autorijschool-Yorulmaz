import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Autorijschool Yorulmaz – rijlessen in Doesburg en omgeving'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/images/logo.png'))
  const src = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#16213a',
          color: '#ffffff',
          padding: '60px 80px',
        }}
      >
        <img src={src} width={880} height={247} alt="" />
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 48 }}>
          <div style={{ width: 48, height: 4, background: '#e3000f', marginRight: 20 }} />
          <div style={{ fontSize: 30, letterSpacing: 4, color: 'rgba(255,255,255,0.8)' }}>
            RIJLESSEN IN DOESBURG EN OMGEVING
          </div>
          <div style={{ width: 48, height: 4, background: '#e3000f', marginLeft: 20 }} />
        </div>
      </div>
    ),
    size,
  )
}
