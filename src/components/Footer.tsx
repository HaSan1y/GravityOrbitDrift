import { Radio, Instagram, Twitter, Music2, Send, Cloud } from 'lucide-react';

const SOCIALS = [
  { label: 'Spotify', href: 'https://open.spotify.com', Icon: Music2 },
  { label: 'SoundCloud', href: 'https://soundcloud.com', Icon: Cloud },
  { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { label: 'Twitter / X', href: 'https://twitter.com', Icon: Twitter },
  { label: 'Bandcamp', href: 'https://bandcamp.com', Icon: Send },
];

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#releases', label: 'Releases' },
  { href: '#listen', label: 'Listen' },
  { href: '#newsletter', label: 'Newsletter' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-16 md:px-10">
      <div className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-px bg-gradient-to-r from-transparent via-nebula-violet/40 to-transparent" />
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-nebula-violet/30 blur-md" />
                <Radio className="relative h-5 w-5 text-nebula-cyan" strokeWidth={1.5} />
              </span>
              <span className="font-display text-sm font-medium tracking-widest text-slate-100">
                GRAVITY<span className="text-nebula-violet">ORBIT</span>DRIFT
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              Cinematic electronic music for deep space exploration.
              Broadcasting from the edge of the heliosphere.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Connect
            </p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} GravityOrbitDrift. All signals reserved.
          </p>
          <p className="text-xs text-slate-500">
            Crafted in the dark. Mastered for the void.
          </p>
        </div>
      </div>
    </footer>
  );
}
