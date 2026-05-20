import { ImageResponse } from 'next/og';
import { getPost } from '../lib';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Toshi Consulting blog post';

// Solid teal gradient backgrounds keyed by post tone family. Falls back to default.
const toneToHex: Record<string, [string, string]> = {
  'from-teal-600 to-cyan-600':       ['#0d9488', '#0891b2'],
  'from-teal-500 to-cyan-500':       ['#14b8a6', '#06b6d4'],
  'from-emerald-500 to-teal-500':    ['#10b981', '#14b8a6'],
  'from-cyan-500 to-sky-500':        ['#06b6d4', '#0ea5e9'],
  'from-teal-500 to-emerald-500':    ['#14b8a6', '#10b981'],
  'from-cyan-500 to-teal-500':       ['#06b6d4', '#14b8a6'],
  'from-emerald-500 to-cyan-500':    ['#10b981', '#06b6d4'],
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const [c1, c2] = toneToHex[post?.tone ?? ''] ?? ['#14b8a6', '#06b6d4'];
  const title = post?.title ?? 'Toshi Consulting';
  const category = post?.category ?? 'Insights';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          position: 'relative',
          color: 'white',
        }}
      >
        {/* Decorative rings */}
        <div
          style={{
            position: 'absolute',
            right: -120,
            bottom: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            border: '2px solid rgba(255,255,255,0.18)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -60,
            bottom: -60,
            width: 380,
            height: 380,
            borderRadius: 9999,
            border: '1px solid rgba(255,255,255,0.22)',
          }}
        />

        {/* Top row: brand + category */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 900,
              }}
            >
              T
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em' }}>
                Toshi.
              </span>
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginTop: 4,
                  opacity: 0.85,
                }}
              >
                Consulting
              </span>
            </div>
          </div>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.35)',
              fontSize: 18,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            {category}
          </div>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: title.length > 70 ? 56 : 72,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 22,
              opacity: 0.9,
              letterSpacing: '0.04em',
            }}
          >
            toshiconsulting.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
