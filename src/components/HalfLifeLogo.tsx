import React from 'react';
import { Atom } from 'lucide-react';

interface HalfLifeLogoProps {
  className?: string;
}

const HalfLifeLogo: React.FC<HalfLifeLogoProps> = ({ className = '' }) => {
  return (
    <div className={`logo-container flex flex-col items-center ${className}`}>
      <div className="logo-icon relative">
        <Atom size={64} className="text-[#ff7700] glow-text" />
        <div className="absolute inset-0 logo-glitch opacity-70 animate-logo-glitch"></div>
      </div>
      <h1 className="logo-text text-[#ff7700] font-mono text-2xl md:text-4xl font-bold tracking-widest mt-2 glow-text">
        HALF-LIFE 2: DM
      </h1>
      <div className="logo-subtitle text-green-500 text-xs md:text-sm font-mono tracking-wider mt-1">
        CITADEL SERVER CONSOLE
      </div>
    </div>
  );
};

export default HalfLifeLogo;