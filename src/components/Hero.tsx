import { ArrowDown, Play, Sparkles } from 'lucide-react';
import Waveform from './Waveform';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nebula-violet/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[20%] h-72 w-72 rounded-full bg-nebula-blue/20 blur-[100px] animate-drift" />
        <div className="absolute bottom-[10%] left-[8%] h-80 w-80 rounded-full bg-nebula-cyan/10 blur-[110px] animate-pulse-slow" />
      </div>

      {/* Subtle grid overlay */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40 mask-fade-b" />

      <div className="container-x flex flex-col items-center text-center">
        <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-widest text-slate-300 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-nebula-cyan" />
          New album — Orbital Frequencies — out now
        </div>

        <h1 className="reveal font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl">
          <span className="block text-gradient">GravityOrbitDrift</span>
        </h1>

        <p className="reveal mt-6 max-w-2xl text-balance text-base leading-relaxed text-slate-300 md:text-lg">
          Cinematic electronic music for deep space exploration. Immersive
          instrumental soundscapes built from orbital frequencies, ambient
          textures, and the silence between the stars.
        </p>

        <div className="reveal mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a href="#listen" className="btn-primary">
            <Play className="h-4 w-4" fill="currentColor" />
            Listen Now
          </a>
          <a href="#releases" className="btn-ghost">
            Explore Releases
          </a>
        </div>

        {/* Waveform */}
        <div className="reveal mt-16 w-full max-w-3xl">
          <Waveform bars={56} height={140} className="opacity-90" />
        </div>

        <a
          href="#about"
          aria-label="Scroll to about"
          className="reveal mt-14 flex flex-col items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-300"
        >
          <span>Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
