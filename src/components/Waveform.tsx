import { useEffect, useRef } from 'react';

type Props = {
  bars?: number;
  className?: string;
  color?: string;
  speed?: number;
  height?: number;
};

/**
 * Animated audio waveform rendered on canvas. Lightweight, no audio
 * dependency — purely decorative. Respects prefers-reduced-motion.
 */
export default function Waveform({
  bars = 64,
  className = '',
  color = 'rgba(124, 92, 255, 0.9)',
  speed = 0.04,
  height = 120,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let logicalHeight = height;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      logicalHeight = rect.height || height;
      canvas.width = width * dpr;
      canvas.height = logicalHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const phases = new Float32Array(bars);
    for (let i = 0; i < bars; i++) phases[i] = Math.random() * Math.PI * 2;

    const draw = () => {
      ctx.clearRect(0, 0, width, logicalHeight);
      const gap = 2;
      const barW = (width - gap * (bars - 1)) / bars;
      const mid = logicalHeight / 2;

      for (let i = 0; i < bars; i++) {
        phases[i] += speed + (i % 5) * 0.002;
        const env = Math.sin((i / bars) * Math.PI); // taper at edges
        const amp = (Math.sin(phases[i]) * 0.5 + 0.5) * env * (logicalHeight * 0.42);
        const x = i * (barW + gap);
        const h = Math.max(2, amp * 2);

        const grad = ctx.createLinearGradient(0, mid - h, 0, mid + h);
        grad.addColorStop(0, 'rgba(34, 211, 238, 0.9)');
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, 'rgba(59, 130, 246, 0.6)');
        ctx.fillStyle = grad;
        const r = Math.min(barW / 2, 2.5);
        roundRect(ctx, x, mid - h, barW, h * 2, r);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (prefersReduced) {
      draw();
      cancelAnimationFrame(rafRef.current);
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [bars, color, speed, height]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block w-full ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
