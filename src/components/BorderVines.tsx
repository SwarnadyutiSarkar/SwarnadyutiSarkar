import React, { useEffect, useState } from 'react';

/**
 * Decorative SVG flower vines along the fixed left and right screen borders.
 * Moves with a subtle parallax / sway based on vertical scroll position.
 */
export const BorderVines: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle scroll calculations
  const leftShift = Math.sin(scrollY * 0.003) * 6;
  const rightShift = Math.cos(scrollY * 0.003) * 6;
  const verticalShiftLeft = (scrollY * 0.04) % 120;
  const verticalShiftRight = (scrollY * 0.035) % 120;

  return (
    <>
      {/* LEFT BORDER VINE */}
      <div
        aria-hidden="true"
        className="fixed top-0 bottom-0 left-0 w-10 sm:w-14 md:w-16 pointer-events-none z-20 overflow-hidden select-none"
      >
        <div
          className="w-full h-[120%] -top-[10%] absolute left-0 transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translate3d(${leftShift}px, ${-verticalShiftLeft}px, 0)`,
          }}
        >
          <svg
            viewBox="0 0 60 1000"
            preserveAspectRatio="none"
            className="w-full h-full opacity-65 sm:opacity-85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main Winding Stem */}
            <path
              d="M0 0C25 100 10 200 24 300C38 400 12 500 28 600C44 700 8 800 22 900C36 1000 15 1100 20 1200"
              stroke="#748A6D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Secondary Tendril */}
            <path
              d="M0 50C15 150 35 220 18 320C2 420 30 520 16 620C2 720 32 820 14 920"
              stroke="#95A78D"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Leaves and Lily Buds along the left vine */}
            {/* Node 1 */}
            <path d="M18 120C32 105 45 115 38 132C28 130 20 126 18 120Z" fill="#748A6D" />
            <circle cx="42" cy="112" r="3.5" fill="#D49B9E" />
            <circle cx="42" cy="112" r="1.5" fill="#5B2A4A" />

            {/* Node 2 */}
            <path d="M14 260C28 245 42 250 36 270C24 268 16 264 14 260Z" fill="#95A78D" />
            {/* Small Lily Flower */}
            <g transform="translate(32, 245) scale(0.65)">
              <path d="M10 0C10 10 0 14 0 20C10 16 16 20 20 10C16 10 10 0 10 0Z" fill="#FAF0EA" stroke="#D49B9E" strokeWidth="1" />
              <circle cx="10" cy="12" r="2.5" fill="#D49B9E" />
            </g>

            {/* Node 3 */}
            <path d="M22 390C38 375 50 385 44 402C32 400 24 396 22 390Z" fill="#748A6D" />
            <circle cx="48" cy="380" r="4" fill="#E8C5C8" />
            <circle cx="48" cy="380" r="1.8" fill="#5B2A4A" />

            {/* Node 4 */}
            <path d="M16 530C30 515 44 520 38 540C26 538 18 534 16 530Z" fill="#95A78D" />
            <g transform="translate(34, 515) scale(0.65)">
              <path d="M10 0C10 10 0 14 0 20C10 16 16 20 20 10C16 10 10 0 10 0Z" fill="#FAF0EA" stroke="#D49B9E" strokeWidth="1" />
              <circle cx="10" cy="12" r="2.5" fill="#D49B9E" />
            </g>

            {/* Node 5 */}
            <path d="M26 680C42 665 54 675 48 692C36 690 28 686 26 680Z" fill="#748A6D" />
            <circle cx="52" cy="670" r="3.5" fill="#D49B9E" />

            {/* Node 6 */}
            <path d="M12 820C26 805 40 810 34 830C22 828 14 824 12 820Z" fill="#95A78D" />
            <g transform="translate(30, 805) scale(0.65)">
              <path d="M10 0C10 10 0 14 0 20C10 16 16 20 20 10C16 10 10 0 10 0Z" fill="#FAF0EA" stroke="#D49B9E" strokeWidth="1" />
              <circle cx="10" cy="12" r="2.5" fill="#D49B9E" />
            </g>

            {/* Node 7 */}
            <path d="M20 950C36 935 48 945 42 962C30 960 22 956 20 950Z" fill="#748A6D" />
            <circle cx="46" cy="940" r="3.5" fill="#E8C5C8" />
          </svg>
        </div>
      </div>

      {/* RIGHT BORDER VINE */}
      <div
        aria-hidden="true"
        className="fixed top-0 bottom-0 right-0 w-10 sm:w-14 md:w-16 pointer-events-none z-20 overflow-hidden select-none"
      >
        <div
          className="w-full h-[120%] -top-[10%] absolute right-0 transition-transform duration-75 ease-out will-change-transform scale-x-[-1]"
          style={{
            transform: `scaleX(-1) translate3d(${rightShift}px, ${-verticalShiftRight}px, 0)`,
          }}
        >
          <svg
            viewBox="0 0 60 1000"
            preserveAspectRatio="none"
            className="w-full h-full opacity-65 sm:opacity-85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main Winding Stem */}
            <path
              d="M0 0C25 110 8 210 26 310C42 410 10 510 24 610C40 710 12 810 28 910C42 1010 10 1110 25 1210"
              stroke="#748A6D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Secondary Tendril */}
            <path
              d="M0 60C18 160 32 230 15 330C-2 430 28 530 12 630C-4 730 30 830 16 930"
              stroke="#95A78D"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Nodes along right vine */}
            <path d="M18 80C34 65 46 75 40 92C28 90 20 86 18 80Z" fill="#748A6D" />
            <circle cx="44" cy="72" r="3.5" fill="#E8C5C8" />

            <path d="M12 210C26 195 40 200 34 220C22 218 14 214 12 210Z" fill="#95A78D" />
            <g transform="translate(30, 195) scale(0.65)">
              <path d="M10 0C10 10 0 14 0 20C10 16 16 20 20 10C16 10 10 0 10 0Z" fill="#FAF0EA" stroke="#D49B9E" strokeWidth="1" />
              <circle cx="10" cy="12" r="2.5" fill="#D49B9E" />
            </g>

            <path d="M24 350C40 335 52 345 46 362C34 360 26 356 24 350Z" fill="#748A6D" />
            <circle cx="50" cy="340" r="4" fill="#D49B9E" />

            <path d="M15 480C29 465 43 470 37 490C25 488 17 484 15 480Z" fill="#95A78D" />
            <g transform="translate(33, 465) scale(0.65)">
              <path d="M10 0C10 10 0 14 0 20C10 16 16 20 20 10C16 10 10 0 10 0Z" fill="#FAF0EA" stroke="#D49B9E" strokeWidth="1" />
              <circle cx="10" cy="12" r="2.5" fill="#D49B9E" />
            </g>

            <path d="M22 620C38 605 50 615 44 632C32 630 24 626 22 620Z" fill="#748A6D" />
            <circle cx="48" cy="610" r="3.5" fill="#E8C5C8" />

            <path d="M14 770C28 755 42 760 36 780C24 778 16 774 14 770Z" fill="#95A78D" />
            <g transform="translate(32, 755) scale(0.65)">
              <path d="M10 0C10 10 0 14 0 20C10 16 16 20 20 10C16 10 10 0 10 0Z" fill="#FAF0EA" stroke="#D49B9E" strokeWidth="1" />
              <circle cx="10" cy="12" r="2.5" fill="#D49B9E" />
            </g>

            <path d="M24 900C40 885 52 895 46 912C34 910 26 906 24 900Z" fill="#748A6D" />
            <circle cx="50" cy="890" r="4" fill="#D49B9E" />
          </svg>
        </div>
      </div>
    </>
  );
};
