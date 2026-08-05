import { ExternalLink, Headphones } from 'lucide-react';
import TiltCard from './TiltCard';

const PLATFORMS = [
  { name: 'Spotify', href: 'https://open.spotify.com', color: '#1DB954', initials: '♫' },
  { name: 'Apple Music', href: 'https://music.apple.com', color: '#FA243C', initials: '' },
  { name: 'Amazon Music', href: 'https://music.amazon.com', color: '#00A8E1', initials: 'a' },
  { name: 'TikTok Music', href: 'https://www.tiktok.com/music', color: '#FF2D55', initials: '♪' },
  { name: 'Instagram Music', href: 'https://www.instagram.com', color: '#E1306C', initials: '◎' },
  { name: 'iHeartRadio', href: 'https://www.iheart.com', color: '#C6002B', initials: '♥' },
  { name: 'Tidal', href: 'https://tidal.com', color: '#0FF', initials: 'T' },
  { name: 'Deezer', href: 'https://www.deezer.com', color: '#FEAA2D', initials: 'D' },
  { name: 'SoundCloud', href: 'https://soundcloud.com', color: '#FF5500', initials: '☁' },
  { name: 'Bandcamp', href: 'https://bandcamp.com', color: '#629AA9', initials: 'B' },
];

export default function Listen() {
  return (
    <section id="listen" className="section-pad relative">
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-80 w-80 rounded-full bg-nebula-blue/10 blur-[120px]" />
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-nebula-cyan">
            Listen
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            Stream the catalogue
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            Play tracks right here with the built-in player, or open your
            preferred streaming platform below.
          </p>
        </div>

        {/* Built-in player prompt */}
        <div className="reveal mt-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nebula-blue/25 to-nebula-violet/25 text-nebula-cyan ring-1 ring-white/10">
            <Headphones className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <p className="text-sm text-slate-300">
            Use the player button in the bottom-right corner to listen
            directly — no external services required.
          </p>
        </div>

        <div className="reveal mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {PLATFORMS.map((p) => (
            <TiltCard key={p.name} max={12} scale={1.04} className="group">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass relative flex items-center gap-3 overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:border-white/20"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ring-1 ring-white/10 [transform:translateZ(20px)]"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}cc, ${p.color}66)`,
                    boxShadow: `0 4px 20px -6px ${p.color}80`,
                  }}
                >
                  {p.initials || p.name[0]}
                </span>
                <span className="min-w-0 flex-1 [transform:translateZ(10px)]">
                  <span className="block truncate text-sm font-medium text-white">
                    {p.name}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500">
                    Open
                    <ExternalLink className="h-2.5 w-2.5" />
                  </span>
                </span>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
