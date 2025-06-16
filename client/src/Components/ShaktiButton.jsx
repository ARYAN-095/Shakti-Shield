import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

/**
 * Unique SOSButton
 * A hexagonal-inspired emergency button with rotating border and ripple effect.
 */
const ShaktiButton = () => {
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    // trigger ripple animation
    setRipple(true);
    // Here you’d also dispatch your SOS action
  };

  const handleAnimationEnd = () => {
    setRipple(false);
  };

  return (
    <button
      aria-label="Activate Shakti Emergency"
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      className="relative group w-40 h-40 bg-gradient-to-tr from-red-600 to-red-400 rounded-full overflow-visible focus:outline-none"
    >
      {/* Rotating border */}
      <span className="absolute -inset-1 rounded-full border-4 border-transparent border-t-red-600 border-r-red-600 animate-spin-slow" />

      {/* Ripple effect */}
      {ripple && (
        <span className="absolute inset-0 rounded-full bg-red-600/20 animate-sos-ripple" />
      )}

      {/* Inner hexagon shape */}
      <div className="absolute inset-6 bg-red-500 clip-polygon-hexagon transform transition-transform group-hover:scale-95" />

      {/* Icon and label */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <AlertTriangle className="w-12 h-12 mb-2 animate-bounce-fast" strokeWidth={2} />
        <span className="text-xl font-extrabold tracking-widest">SHAKTI</span>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        @keyframes sos-ripple {
          0% { transform: scale(0.6); opacity: 0.6; }
          50% { transform: scale(1.4); opacity: 0.2; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-sos-ripple {
          animation: sos-ripple 1s ease-out;
        }
        @keyframes bounce-fast {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-fast {
          animation: bounce-fast 0.6s infinite;
        }
        /* Hexagon clip-path */
        .clip-polygon-hexagon {
          clip-path: polygon(
            25% 5%, 75% 5%,
            100% 50%,
            75% 95%, 25% 95%,
            0% 50%
          );
        }
      `}</style>
    </button>
  );
};

export default ShaktiButton;
