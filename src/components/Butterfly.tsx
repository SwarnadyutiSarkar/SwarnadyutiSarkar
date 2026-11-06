import React from 'react';

export const Butterfly: React.FC<{
  className?: string;
  size?: number;
  animated?: boolean;
}> = ({ className = '', size = 28, animated = true }) => {
  return (
    <div
      className={`inline-block select-none pointer-events-none ${animated ? 'animate-butterfly' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g className={animated ? 'animate-flutter' : ''}>
          {/* Left Wing Top */}
          <path
            d="M20 18C14 10 5 12 6 20C7 26 18 22 20 20Z"
            fill="#D49B9E"
            opacity="0.9"
          />
          {/* Left Wing Bottom */}
          <path
            d="M20 20C15 22 9 26 12 32C15 36 19 28 20 22Z"
            fill="#E8C5C8"
            opacity="0.85"
          />
          {/* Right Wing Top */}
          <path
            d="M20 18C26 10 35 12 34 20C33 26 22 22 20 20Z"
            fill="#D49B9E"
            opacity="0.9"
          />
          {/* Right Wing Bottom */}
          <path
            d="M20 20C25 22 31 26 28 32C25 36 21 28 20 22Z"
            fill="#E8C5C8"
            opacity="0.85"
          />
          {/* Wing delicate patterns */}
          <circle cx="13" cy="18" r="1.5" fill="#5B2A4A" opacity="0.6" />
          <circle cx="27" cy="18" r="1.5" fill="#5B2A4A" opacity="0.6" />
          {/* Butterfly Body */}
          <ellipse cx="20" cy="20" rx="1.4" ry="7" fill="#5B2A4A" />
          {/* Antennae */}
          <path
            d="M19.5 13C18 9 15 8 13 8.5M20.5 13C22 9 25 8 27 8.5"
            stroke="#5B2A4A"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};
