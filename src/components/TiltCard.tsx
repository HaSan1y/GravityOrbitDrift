import { useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  max?: number; // max rotation degrees
  scale?: number;
  glare?: boolean;
};

/**
 * 3D tilt card — tracks the pointer and applies a perspective rotation
 * for a tangible, physical feel. Falls back to a static card when the
 * user prefers reduced motion.
 */
export default function TiltCard({
  children,
  className = '',
  max = 10,
  scale = 1.02,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, o: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
    });
    setGlarePos({ x: px * 100, y: py * 100, o: 0.18 });
  };

  const onLeave = () => {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
    });
    setGlarePos((g) => ({ ...g, o: 0 }));
  };

  const onEnter = () => {
    setStyle({ transition: 'transform 0.1s ease-out' });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={style}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.o}), transparent 50%)`,
            opacity: glarePos.o > 0 ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
