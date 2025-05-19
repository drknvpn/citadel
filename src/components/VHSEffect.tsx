import React from 'react';

const VHSEffect: React.FC = () => {
  return (
    <>
      {/* VHS Scan lines overlay */}
      <div className="scanlines absolute inset-0 pointer-events-none z-20"></div>
      
      {/* CRT glow effect */}
      <div className="crt-glow absolute inset-0 bg-[#ff7700]/5 pointer-events-none z-10 animate-glow"></div>
      
      {/* Noise texture overlay */}
      <div className="noise absolute inset-0 opacity-10 pointer-events-none z-30"></div>
      
      {/* Vignette effect */}
      <div className="vignette absolute inset-0 pointer-events-none z-15"></div>
    </>
  );
};

export default VHSEffect;