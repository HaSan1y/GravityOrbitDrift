import { Music2, ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

const PLATFORMS = [
  {
    name: 'Apple Music',
    href: 'https://music.apple.com',
    color: '#FA243C',
    initials: '',
  },
  {
    name: 'Amazon Music',
    href: 'https://music.amazon.com',
    color: '#00A8E1',
    initials: 'a',
  },
  {
    name: 'TikTok Music',
    href: 'https://www.tiktok.com/music',
    color: '#FF2D55',
    initials: '♪',
  },
  {
    name: 'Instagram Music',
    href: 'https://www.instagram.com',
    color: '#E1306C',
    initials: '◎',
  },
  {
    name: 'iHeartRadio',
    href: 'https://www.iheart.com',
    color: '#C6002B',
    initials: '♥',
  },
  {
    name: 'Tidal',
    href: 'https://tidal.com',
    color: '#0FF',
    initials: 'T',
  },
  {
    name: 'Deezer',
    href: 'https://www.deezer.com',
    color: '#FEAA2D',
    initials: 'D',
  },
  {
    name: 'SoundCloud',
    href: 'https://soundcloud.com',
    color: '#FF5500',
    initials: '☁',
  },
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
            Available on every major platform. Press play, dim the lights, and
            let the signal reach you.
          </p>
        </div>

        {/* Spotify featured embed */}
        <div className="reveal mt-14">
          <TiltCard
            max={5}
            scale={1.005}
            className="glass overflow-hidden rounded-3xl p-5 md:p-6"
          >
            <header className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1DB954]/15 text-[#1DB954] ring-1 ring-white/10">
                <Music2 className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-white">
                  Spotify
                </h3>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Full catalogue
                </p>
              </div>
            </header>
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                title="GravityOrbitDrift on Spotify"
                src="https://open.spotify.com/embed/artist/3LI2HVYaeWpSJSQ1Flxjkq?utm_source=generator&theme=0"
                width="100%"
                height="380"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="block w-full"
              />
            </div>
          </TiltCard>
        </div>

        {/* DistroKid-distributed platforms */}
        <div className="reveal mt-12">
          <p className="mb-6 text-xs uppercase tracking-widest text-slate-500">
            Also streaming on
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {PLATFORMS.map((p) => (
              <TiltCard
                key={p.name}
                max={12}
                scale={1.04}
                className="group"
              >
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass relative flex items-center gap-3 overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:border-white/20"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ring-1 ring-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}cc, ${p.color}66)`,
                      boxShadow: `0 4px 20px -6px ${p.color}80`,
                    }}
                  >
                    {p.initials || p.name[0]}
                  </span>
                  <span className="min-w-0 flex-1">
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
      </div>
    </section>
  );
}
