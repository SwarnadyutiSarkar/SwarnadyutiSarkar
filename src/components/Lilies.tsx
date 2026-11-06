import React from 'react';

// Minimalist Lily Brand Icon (for Navbar and Footer)
export const LilyLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Central petals */}
    <path
      d="M16 3C16 11 11 16 3 17C10 18 16 22 16 30C16 22 22 18 29 17C21 16 16 11 16 3Z"
      fill="#D49B9E"
      opacity="0.9"
    />
    <path
      d="M16 7C16 13 12 17 6 18C11 19 16 22 16 27C16 22 21 19 26 18C20 17 16 13 16 7Z"
      fill="#F5EAE9"
    />
    <circle cx="16" cy="17.5" r="2.2" fill="#5B2A4A" />
  </svg>
);

// Blooming Pink Lily (Standard garden lily)
export const BloomingLily: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g className="lily-bloom-target">
      {/* Leaves */}
      <path
        d="M26 62C18 52 24 38 35 44C30 52 32 58 26 62Z"
        fill="#95A78D"
        opacity="0.8"
      />
      <path
        d="M54 62C62 52 56 38 45 44C50 52 48 58 54 62Z"
        fill="#748A6D"
        opacity="0.8"
      />
      <path d="M40 76V48" stroke="#748A6D" strokeWidth="2.5" strokeLinecap="round" />

      {/* Petals */}
      <path
        d="M40 10C40 24 30 35 15 38C28 42 38 48 40 60C42 48 52 42 65 38C50 35 40 24 40 10Z"
        fill="#F8ECEB"
        stroke="#E8C5C8"
        strokeWidth="1.2"
      />
      <path
        d="M40 16C40 28 32 37 20 40C30 43 38 48 40 56C42 48 50 43 60 40C48 37 40 28 40 16Z"
        fill="#E8C5C8"
        opacity="0.6"
      />
      {/* Pistils and stamens */}
      <path d="M40 42L32 30M40 42L48 30M40 42V26" stroke="#5B2A4A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="29" r="2" fill="#D49B9E" />
      <circle cx="48" cy="29" r="2" fill="#D49B9E" />
      <circle cx="40" cy="25" r="2.2" fill="#5B2A4A" />
      <circle cx="40" cy="42" r="3" fill="#5B2A4A" />
    </g>
  </svg>
);

// Tiger Lily (Recurved speckled petals)
export const TigerLily: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g className="lily-bloom-target">
      {/* Stem & Leaves */}
      <path d="M40 75C39 60 41 52 40 46" stroke="#748A6D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M39 58C30 54 22 58 18 64C26 64 34 61 39 58Z" fill="#95A78D" />
      <path d="M41 52C50 48 58 52 62 58C54 58 46 55 41 52Z" fill="#748A6D" />

      {/* Flared Tiger Petals */}
      <path
        d="M40 14C36 28 14 26 12 40C26 38 34 46 40 50C46 46 54 38 68 40C66 26 44 28 40 14Z"
        fill="#F3D1C8"
        stroke="#D49B9E"
        strokeWidth="1.2"
      />
      {/* Inner Petals */}
      <path
        d="M40 22C38 32 24 32 20 42C30 40 36 44 40 47C44 44 50 40 60 42C56 32 42 32 40 22Z"
        fill="#E29E98"
      />
      {/* Speckles */}
      <circle cx="36" cy="36" r="1" fill="#5B2A4A" />
      <circle cx="38" cy="32" r="1.2" fill="#5B2A4A" />
      <circle cx="44" cy="36" r="1" fill="#5B2A4A" />
      <circle cx="42" cy="32" r="1.2" fill="#5B2A4A" />
      <circle cx="34" cy="42" r="1" fill="#5B2A4A" />
      <circle cx="46" cy="42" r="1" fill="#5B2A4A" />
      {/* Long prominent stamens */}
      <path d="M40 46C34 50 24 56 20 62M40 46C46 50 56 56 60 62M40 46V64" stroke="#5B2A4A" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="19" cy="63" r="2.2" fill="#5B2A4A" />
      <circle cx="61" cy="63" r="2.2" fill="#5B2A4A" />
      <circle cx="40" cy="65" r="2.2" fill="#5B2A4A" />
    </g>
  </svg>
);

// Water Lily (Lotus-like open bloom)
export const WaterLily: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g className="lily-bloom-target">
      {/* Pad underneath */}
      <ellipse cx="40" cy="60" rx="34" ry="12" fill="#95A78D" opacity="0.6" />
      <path d="M40 60L46 72" stroke="#FBF4EF" strokeWidth="2" strokeLinecap="round" />

      {/* Outer Petals */}
      <path
        d="M12 50C22 45 32 46 40 54C48 46 58 45 68 50C62 58 48 60 40 60C32 60 18 58 12 50Z"
        fill="#F5EAE9"
        stroke="#E8C5C8"
        strokeWidth="1.2"
      />
      {/* Mid Petals */}
      <path
        d="M20 38C26 32 34 38 40 48C46 38 54 32 60 38C58 48 48 52 40 54C32 52 22 48 20 38Z"
        fill="#ECD3D6"
        stroke="#D49B9E"
        strokeWidth="1"
      />
      {/* Upright Center Petals */}
      <path
        d="M32 24C36 18 38 28 40 40C42 28 44 18 48 24C46 36 43 42 40 44C37 42 34 36 32 24Z"
        fill="#FBF4EF"
        stroke="#E8C5C8"
        strokeWidth="1"
      />
      {/* Golden core */}
      <ellipse cx="40" cy="44" rx="5" ry="3" fill="#D49B9E" />
      <circle cx="40" cy="43" r="2" fill="#5B2A4A" />
    </g>
  </svg>
);

// Stargazer Lily (Deep rose center)
export const StargazerLily: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g className="lily-bloom-target">
      <path d="M40 76V52" stroke="#748A6D" strokeWidth="2.5" />
      <path d="M39 64C28 60 20 66 16 72C26 72 34 68 39 64Z" fill="#748A6D" />
      {/* Starburst petals */}
      <path
        d="M40 10C38 24 22 28 14 36C26 40 34 46 40 56C46 46 54 40 66 36C58 28 42 24 40 10Z"
        fill="#FAF0EF"
        stroke="#D49B9E"
        strokeWidth="1.2"
      />
      <path
        d="M40 18C39 27 28 30 22 36C30 39 36 44 40 50C44 44 50 39 58 36C52 30 41 27 40 18Z"
        fill="#C77D84"
        opacity="0.8"
      />
      {/* Center detail */}
      <circle cx="40" cy="40" r="3.5" fill="#5B2A4A" />
      <path d="M40 40L30 28M40 40L50 28M40 40V24" stroke="#5B2A4A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="27" r="1.8" fill="#D49B9E" />
      <circle cx="50" cy="27" r="1.8" fill="#D49B9E" />
      <circle cx="40" cy="23" r="1.8" fill="#D49B9E" />
    </g>
  </svg>
);

// Calla Lily (Minimalist trumpet form)
export const CallaLily: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g className="lily-bloom-target">
      <path d="M40 75C41 58 38 45 42 32" stroke="#748A6D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M39 62C30 56 24 62 18 68C26 68 34 65 39 62Z" fill="#95A78D" />
      {/* Calla spathe */}
      <path
        d="M42 32C36 28 26 22 28 14C34 12 44 14 52 20C58 25 56 34 46 38C43 35 42 33 42 32Z"
        fill="#FAF2EF"
        stroke="#E8C5C8"
        strokeWidth="1.2"
      />
      <path
        d="M40 31C35 27 30 22 32 17C36 15 42 17 48 22C50 25 48 30 42 33"
        fill="#E8C5C8"
        opacity="0.4"
      />
      {/* Spadix */}
      <path d="M40 28L46 17" stroke="#D49B9E" strokeWidth="3" strokeLinecap="round" />
      <circle cx="46" cy="17" r="2" fill="#5B2A4A" />
    </g>
  </svg>
);

// Helper component that selects lily style
export const LilyBadge: React.FC<{
  styleName?: string;
  className?: string;
}> = ({ styleName = 'blooming', className = 'w-12 h-12' }) => {
  switch (styleName) {
    case 'tiger':
      return <TigerLily className={className} />;
    case 'waterlily':
      return <WaterLily className={className} />;
    case 'stargazer':
      return <StargazerLily className={className} />;
    case 'calla':
      return <CallaLily className={className} />;
    case 'blooming':
    case 'classic':
    default:
      return <BloomingLily className={className} />;
  }
};

// Decorative corner frame / sprig
export const LilyCornerSprig: React.FC<{
  className?: string;
  flipped?: boolean;
}> = ({ className = 'w-48 h-48', flipped = false }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flipped ? '-scale-x-100' : ''} pointer-events-none select-none`}
    aria-hidden="true"
  >
    {/* Soft stems and curves */}
    <path
      d="M10 190C30 140 70 80 180 30"
      stroke="#748A6D"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.45"
    />
    <path
      d="M30 190C60 160 100 120 160 70"
      stroke="#95A78D"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.4"
    />
    {/* Leaves */}
    <path
      d="M80 120C70 95 90 85 105 92C95 108 90 115 80 120Z"
      fill="#95A78D"
      opacity="0.55"
    />
    <path
      d="M130 80C125 55 145 48 158 58C145 72 140 78 130 80Z"
      fill="#748A6D"
      opacity="0.5"
    />
    {/* Blooming lily at the apex */}
    <g transform="translate(135, 15) scale(0.65)">
      <BloomingLily className="w-24 h-24" />
    </g>
    {/* Smaller bud */}
    <g transform="translate(45, 125) scale(0.45)">
      <WaterLily className="w-20 h-20" />
    </g>
  </svg>
);
