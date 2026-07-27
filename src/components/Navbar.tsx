import { useEffect, useState } from 'react';
import { Menu, X, Radio } from 'lucide-react';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#releases', label: 'Releases' },
  { href: '#listen', label: 'Listen' },
  { href: '#newsletter', label: 'Newsletter' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-void-950/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          onClick={close}
          className="group flex items-center gap-2.5"
          aria-label="GravityOrbitDrift home"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-nebula-violet/30 blur-md transition-all duration-500 group-hover:bg-nebula-violet/50" />
            <Radio className="relative h-5 w-5 text-nebula-cyan" strokeWidth={1.5} />
          </span>
          <span className="font-display text-sm font-medium tracking-widest text-slate-100">
            GRAVITY<span className="text-nebula-violet">ORBIT</span>DRIFT
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs uppercase tracking-widest text-slate-400 transition-colors duration-300 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#listen" className="hidden md:inline-flex btn-primary !px-5 !py-2 text-xs">
          Listen Now
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="glass mx-4 mb-4 flex flex-col gap-1 rounded-2xl p-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={close}
                className="block rounded-xl px-4 py-3 text-sm uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#listen"
              onClick={close}
              className="btn-primary mt-1 w-full !py-2.5 text-xs"
            >
              Listen Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
