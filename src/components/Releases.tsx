import { Disc3, Clock } from 'lucide-react';
import TiltCard from './TiltCard';

type Release = {
  title: string;
  year: string;
  type: string;
  duration: string;
  blurb: string;
  accent: string;
  glow: string;
};

const RELEASES: Release[] = [
  {
    title: 'Orbital Frequencies',
    year: '2026',
    type: 'Album',
    duration: '52 min',
    blurb: 'Eight movements tracing a single orbit — from atmospheric entry to the long drift home.',
    accent: 'from-nebula-cyan/30 to-nebula-blue/10',
    glow: 'rgba(34, 211, 238, 0.25)',
  },
  {
    title: 'Heliosphere',
    year: '2025',
    type: 'EP',
    duration: '24 min',
    blurb: 'Four tracks recorded at the boundary where the solar wind meets interstellar space.',
    accent: 'from-nebula-violet/30 to-nebula-indigo/10',
    glow: 'rgba(124, 92, 255, 0.25)',
  },
  {
    title: 'Transit',
    year: '2025',
    type: 'Single',
    duration: '8 min',
    blurb: 'A slow, weightless passage. One chord, drifting, for the full duration of a flyby.',
    accent: 'from-nebula-blue/30 to-nebula-cyan/10',
    glow: 'rgba(59, 130, 246, 0.25)',
  },
  {
    title: 'Event Horizon',
    year: '2024',
    type: 'Album',
    duration: '48 min',
    blurb: 'The debut. A study in gravity and absence — the sound of light failing to escape.',
    accent: 'from-nebula-indigo/30 to-nebula-violet/10',
    glow: 'rgba(79, 70, 229, 0.25)',
  },
];

export default function Releases() {
  return (
    <section id="releases" className="section-pad relative">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-nebula-violet/10 blur-[120px]" />
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-nebula-cyan">
            Discography
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            Release timeline
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            A chronological orbit through the catalogue. Each release is
            mastered as a single continuous listen.
          </p>
        </div>

        <ol className="relative mt-16 border-l border-white/10 pl-8 md:pl-10">
          {RELEASES.map((r, i) => (
            <li
              key={r.title}
              className="reveal relative mb-12 last:mb-0"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Node */}
              <span
                className={`absolute -left-[2.45rem] flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${r.accent} ring-1 ring-white/15 md:-left-[2.7rem]`}
                style={{ boxShadow: `0 0 24px -4px ${r.glow}` }}
              >
                <Disc3 className="h-4 w-4 text-white" strokeWidth={1.5} />
              </span>

              <TiltCard max={6} scale={1.01} className="h-full">
                <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-colors duration-500 hover:border-white/20 md:p-7">
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: r.glow }}
                  />
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-widest text-slate-400 [transform:translateZ(20px)]">
                    <span className="rounded-full bg-white/5 px-3 py-1 text-nebula-cyan ring-1 ring-white/10">
                      {r.year}
                    </span>
                    <span>{r.type}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {r.duration}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-white [transform:translateZ(30px)]">
                    {r.title}
                  </h3>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-400 [transform:translateZ(15px)]">
                    {r.blurb}
                  </p>
                  <a
                    href="#listen"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-nebula-cyan transition-colors hover:text-white"
                  >
                    Listen
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </TiltCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
