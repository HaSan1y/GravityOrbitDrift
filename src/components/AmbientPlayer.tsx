import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';

/**
 * Floating ambient audio player. Autoplay is blocked by most browsers
 * until the user interacts with the page, so we show a clear play prompt.
 * Volume defaults to a very low 0.15 for background atmosphere.
 *
 * Source: /audio/ambient.wav — a soft drone generated for ambient background.
 * The track is a 60-second looping low-frequency chord with slow swells.
 */
export default function AmbientPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      <audio
        ref={audioRef}
        src="/audio/ambient.wav"
        loop
        preload="auto"
        crossOrigin="anonymous"
      />

      {expanded && (
        <div className="glass-strong flex items-center gap-3 rounded-full px-4 py-2.5 shadow-2xl">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              if (audioRef.current) {
                audioRef.current.volume = v;
                if (v > 0 && muted) {
                  audioRef.current.muted = false;
                  setMuted(false);
                }
              }
            }}
            aria-label="Ambient volume"
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/15 accent-nebula-violet"
          />
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute ambient' : 'Mute ambient'}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-white"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      )}

      <button
        onClick={() => {
          toggle();
          setExpanded(true);
        }}
        onMouseEnter={() => setExpanded(true)}
        aria-label={playing ? 'Pause ambient audio' : 'Play ambient audio'}
        className="glass-strong group relative flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-nebula-violet/20 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        {playing ? (
          <Pause className="relative h-4 w-4 text-white" fill="currentColor" />
        ) : (
          <Play className="relative h-4 w-4 translate-x-0.5 text-white" fill="currentColor" />
        )}
      </button>

      {!expanded && (
        <span className="glass hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest text-slate-300 sm:flex">
          <Radio className="h-3 w-3 text-nebula-cyan" />
          Ambient
        </span>
      )}
    </div>
  );
}
