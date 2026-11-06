import React, { useEffect, useState } from 'react';
import { Butterfly } from './Butterfly';

interface ButterflyConfig {
  id: number;
  baseX: number; // percentage from left (0 - 100)
  baseY: number; // percentage from top (0 - 100)
  size: number;
  depthLayer: number; // 1 = far/slow, 2 = mid, 3 = foreground
  speedY: number; // parallax multiplier on Y
  speedX: number; // subtle horizontal drift multiplier
  baseRotate: number;
  opacity: number;
}

const BUTTERFLIES: ButterflyConfig[] = [
  {
    id: 1,
    baseX: 12,
    baseY: 18,
    size: 26,
    depthLayer: 1,
    speedY: 0.14,
    speedX: 0.04,
    baseRotate: 12,
    opacity: 0.55,
  },
  {
    id: 2,
    baseX: 86,
    baseY: 28,
    size: 32,
    depthLayer: 2,
    speedY: -0.22,
    speedX: -0.05,
    baseRotate: -15,
    opacity: 0.7,
  },
  {
    id: 3,
    baseX: 18,
    baseY: 52,
    size: 22,
    depthLayer: 1,
    speedY: 0.18,
    speedX: -0.06,
    baseRotate: 8,
    opacity: 0.45,
  },
  {
    id: 4,
    baseX: 82,
    baseY: 68,
    size: 34,
    depthLayer: 3,
    speedY: -0.28,
    speedX: 0.07,
    baseRotate: -22,
    opacity: 0.75,
  },
  {
    id: 5,
    baseX: 25,
    baseY: 82,
    size: 28,
    depthLayer: 2,
    speedY: 0.16,
    speedX: 0.05,
    baseRotate: 18,
    opacity: 0.6,
  },
];

export const ParallaxButterflies: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {BUTTERFLIES.map((b) => {
        // Multi-layered parallax calculation
        const offsetY = scrollY * b.speedY;
        const offsetX = Math.sin((scrollY + b.id * 200) * 0.002) * 25 + scrollY * b.speedX;
        const tiltX = Math.sin((scrollY + b.id * 100) * 0.003) * 12;
        const tiltY = Math.cos((scrollY + b.id * 100) * 0.003) * 12;
        const translateZ = (b.depthLayer - 2) * 40; // -40px (far), 0 (mid), +40px (near)

        return (
          <div
            key={b.id}
            className="absolute will-change-transform transition-transform duration-100 ease-out"
            style={{
              left: `${b.baseX}%`,
              top: `${b.baseY}%`,
              opacity: b.opacity,
              transform: `
                translate3d(${offsetX}px, ${offsetY}px, ${translateZ}px)
                rotate(${b.baseRotate + tiltX * 0.5}deg)
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
              `,
            }}
          >
            <Butterfly size={b.size} animated={true} />
          </div>
        );
      })}
    </div>
  );
};
