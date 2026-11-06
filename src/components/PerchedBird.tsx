import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

interface PerchedBirdProps {
  isHovered: boolean;
  position?: 'left' | 'right' | 'center';
  facing?: 'left' | 'right';
  className?: string;
}

export const PerchedBird: React.FC<PerchedBirdProps> = ({
  isHovered,
  position = 'right',
  facing = 'left',
  className = '',
}) => {
  const [hasTakenFlight, setHasTakenFlight] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (isHovered) {
      setHasTakenFlight(true);
      setIsReturning(false);
    } else if (hasTakenFlight) {
      // When hover ends, wait a moment then glide back to perch
      const timer = setTimeout(() => {
        setIsReturning(true);
        const resetTimer = setTimeout(() => {
          setHasTakenFlight(false);
          setIsReturning(false);
        }, 600);
        return () => clearTimeout(resetTimer);
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [isHovered, hasTakenFlight]);

  // Position classes along the top edge
  const positionClass =
    position === 'left'
      ? 'left-6 sm:left-8'
      : position === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'right-6 sm:right-8';

  // Fly-away transform trajectory
  const flyDirectionMultiplier = facing === 'left' ? -1 : 1;
  const flyTransform = hasTakenFlight && !isReturning
    ? `translate(${flyDirectionMultiplier * 110}px, -150px) rotate(${flyDirectionMultiplier * 32}deg) scale(0.75)`
    : isReturning
    ? `translate(${flyDirectionMultiplier * 40}px, -40px) rotate(${flyDirectionMultiplier * 15}deg) scale(0.9)`
    : 'translate(0, 0) rotate(0deg) scale(1)';

  return (
    <div
      aria-hidden="true"
      className={`absolute top-0 -translate-y-[85%] z-20 pointer-events-none select-none transition-all duration-700 ease-out will-change-transform ${positionClass} ${className}`}
      style={{
        transform: flyTransform,
        opacity: hasTakenFlight && !isReturning ? 0 : 1,
        transition: hasTakenFlight && !isReturning
          ? 'transform 0.85s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.8s ease-in'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out',
      }}
    >
      <svg
        viewBox="0 0 48 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-9 h-7 sm:w-11 sm:h-9 drop-shadow-xs ${facing === 'right' ? 'scale-x-[-1]' : ''}`}
      >
        {/* Bird Body */}
        <path
          d="M10 24C8 19 12 12 21 10C29 8 36 12 37 17C39 22 35 27 27 28C19 29 11 29 10 24Z"
          fill="#3E7CB1"
        />
        {/* Soft Cream Belly */}
        <path
          d="M15 23C13 19 16 15 23 14C29 13 33 17 34 21C32 25 26 27 20 26C17 25 15 25 15 23Z"
          fill="#FBF4EF"
        />
        {/* Bird Head */}
        <circle cx="35" cy="15" r="7.5" fill="#3E7CB1" />
        <circle cx="36" cy="13.5" r="1.5" fill="#1C2D37" />
        <circle cx="36.5" cy="13" r="0.5" fill="#FFFFFF" />

        {/* Beak */}
        <path d="M42 14L47 16L42 18Z" fill="#E07A5F" />

        {/* Wing (animates flapping when flying) */}
        <g
          style={{
            transformOrigin: '23px 15px',
            animation: hasTakenFlight ? 'finch-wing-flap 0.16s infinite alternate ease-in-out' : 'none',
          }}
        >
          <path
            d="M16 17C19 10 29 9 31 15C29 20 23 21 18 20C15 19 13 18 16 17Z"
            fill="#6FA8DC"
          />
          <path
            d="M21 13C24 12 28 13 27 17"
            stroke="#2A5C85"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>

        {/* Tail feathers */}
        <path d="M11 23L3 27L5 24L1 23L9 20" fill="#2A5C85" />

        {/* Perching Little Feet clinging onto the box's top border */}
        {!hasTakenFlight && (
          <path
            d="M21 28V33M23 28V33M19 33H23M21 33H25"
            stroke="#E07A5F"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};
