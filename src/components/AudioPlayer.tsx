import { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Radio,
  X,
} from 'lucide-react';

type Track = {
  title: string;
  album: string;
  src: string;
  duration: string;
};

const TRACKS: Track[] = [
  {
    title: 'Orbital Frequencies',
    album: 'Orbital Frequencies',
    src: '/audio/00-Suspended-Chords.wav',
    duration: '03:38',
  }
];

function fmt(sec: number): string {
  if (!sec || !isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(false);

  const track = TRACKS[current];

  // Load metadata when track changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
  }, [current]);

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (!a) return;
    setProgress(a.currentTime);
    setDuration(a.duration);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const skip = (dir: -1 | 1) => {
    const next = (current + dir + TRACKS.length) % TRACKS.length;
    setCurrent(next);
    setPlaying(false);
    setProgress(0);
  };

  // Auto-play after skip if we were playing
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.play().catch(() => setPlaying(false));
    }
  }, [current, playing]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * a.duration;
    setProgress(a.currentTime);
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    setMuted(v === 0);
    if (audioRef.current) {
      audioRef.current.volume = v;
      audioRef.current.muted = v === 0;
    }
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    const nextMuted = !muted;
    setMuted(nextMuted);
    a.muted = nextMuted;
  };

  const selectTrack = (i: number) => {
    setCurrent(i);
    setPlaying(true);
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <>
      {/* Hidden audio element — the source of truth */}
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        onEnded={() => skip(1)}
        preload="metadata"
      />

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close player' : 'Open player'}
        className="glass-strong fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-105"
      >
        {open ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <span className="relative">
            <Radio className="h-5 w-5 text-nebula-cyan" strokeWidth={1.5} />
            {playing && (
              <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nebula-cyan opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-nebula-cyan" />
              </span>
            )}
          </span>
        )}
      </button>

      {/* Player panel */}
      <div
        className={`fixed bottom-5 right-5 z-40 w-[22rem] max-w-[calc(100vw-2.5rem)] transition-all duration-500 ${open
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-8 opacity-0'
          }`}
      >
        <div className="glass-strong overflow-hidden rounded-3xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <Radio className="h-4 w-4 text-nebula-cyan" strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-widest text-slate-300">
                Now Playing
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close player"
              className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Track info */}
          <div className="px-5 pt-5">
            <h3 className="font-display text-lg font-medium text-white">
              {track.title}
            </h3>
            <p className="mt-0.5 text-xs uppercase tracking-widest text-slate-500">
              {track.album}
            </p>
          </div>

          {/* Seek bar */}
          <div className="px-5 pt-4">
            <div
              onClick={seek}
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={progress}
              className="group relative h-1.5 cursor-pointer rounded-full bg-white/10"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-nebula-cyan to-nebula-violet"
                style={{ width: `${pct}%` }}
              />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                style={{ left: `${pct}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] tabular-nums text-slate-500">
              <span>{fmt(progress)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 px-5 py-4">
            <button
              onClick={() => skip(-1)}
              aria-label="Previous track"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <SkipBack className="h-4 w-4" fill="currentColor" />
            </button>
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-nebula-blue to-nebula-violet text-white shadow-lg transition-all hover:scale-105"
            >
              {playing ? (
                <Pause className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
              )}
            </button>
            <button
              onClick={() => skip(1)}
              aria-label="Next track"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <SkipForward className="h-4 w-4" fill="currentColor" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 border-t border-white/5 px-5 py-3">
            <button
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-white"
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              aria-label="Volume"
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-nebula-violet"
            />
          </div>

          {/* Track list */}
          <div className="max-h-44 overflow-y-auto border-t border-white/5 px-2 py-2">
            {TRACKS.map((t, i) => (
              <button
                key={t.title}
                onClick={() => selectTrack(i)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${i === current
                  ? 'bg-white/8 text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[10px] font-mono">
                  {i === current && playing ? (
                    <span className="flex items-end gap-0.5">
                      <span className="h-2 w-0.5 animate-pulse rounded-full bg-nebula-cyan" />
                      <span className="h-3 w-0.5 animate-pulse rounded-full bg-nebula-cyan [animation-delay:150ms]" />
                      <span className="h-1.5 w-0.5 animate-pulse rounded-full bg-nebula-cyan [animation-delay:300ms]" />
                    </span>
                  ) : (
                    (i + 1).toString().padStart(2, '0')
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {t.title}
                  </span>
                  <span className="block truncate text-[10px] uppercase tracking-widest text-slate-500">
                    {t.album}
                  </span>
                </span>
                <span className="text-[10px] tabular-nums text-slate-500">
                  {t.duration}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
