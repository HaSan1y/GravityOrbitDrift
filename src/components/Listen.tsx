import { Youtube, Music2 } from 'lucide-react';

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
            Available on all platforms. Press play, dim the lights, and let the
            signal reach you.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Spotify */}
          <article className="reveal glass overflow-hidden rounded-3xl p-5 md:p-6">
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
          </article>

          {/* YouTube */}
          <article className="reveal glass overflow-hidden rounded-3xl p-5 md:p-6">
            <header className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF0000]/15 text-[#FF5A5A] ring-1 ring-white/10">
                <Youtube className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-white">
                  YouTube
                </h3>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Visual journeys
                </p>
              </div>
            </header>
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                title="GravityOrbitDrift on YouTube"
                src="https://www.youtube.com/embed/jxf1ltTrt0A?si=qlGXVWlSrLi6L_bB"
                width="100%"
                height="380"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="block w-full aspect-video"
              />
            </div>
          </article>
        </div>

        {/* Platform pills */}
        <div className="reveal mt-10 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-slate-500">
            Also on
          </span>
          {['Apple Music', 'Bandcamp', 'SoundCloud', 'Tidal', 'Deezer'].map((p) => (
            <span
              key={p}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300 transition-colors hover:border-white/20 hover:text-white"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
