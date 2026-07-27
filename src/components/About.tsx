import { Headphones, Orbit, Radio, Waves } from 'lucide-react';

const FEATURES = [
  {
    icon: Orbit,
    title: 'Orbital Compositions',
    body: 'Tracks structured around gravitational arcs — slow builds, weightless drifts, and the pull of distant bodies.',
  },
  {
    icon: Waves,
    title: 'Ambient Textures',
    body: 'Layered field recordings, analog drift, and granular synthesis shaped into vast, breathing atmospheres.',
  },
  {
    icon: Headphones,
    title: 'Immersive Listening',
    body: 'Mixed for headphones and dark rooms. Every frequency placed with intent across a wide stereo field.',
  },
  {
    icon: Radio,
    title: 'Signal From Deep Space',
    body: 'A solo project broadcasting from the edge of the heliosphere — one artist, one signal, one long orbit.',
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-x">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-nebula-cyan">
            The Artist
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            Sound from the edge of the heliosphere
          </h2>
          <p className="mt-6 text-balance text-base leading-relaxed text-slate-300 md:text-lg">
            GravityOrbitDrift is a cinematic electronic project exploring the
            emotional language of space — distance, gravity, light, and the
            long silence of transit. Each release is engineered as a single
            continuous journey, scored for headphones, starlight, and the
            space between thoughts.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="reveal glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-nebula-violet/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-nebula-blue/20 to-nebula-violet/20 text-nebula-cyan ring-1 ring-white/10">
                <f.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-base font-medium text-white">
                {f.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
