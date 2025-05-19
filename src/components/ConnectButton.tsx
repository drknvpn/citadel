import React, { useState } from 'react';

const ConnectButton: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const serverIP = "citadelhl2dm.ru:27223";
  
  const handleConnect = () => {
    // steam://connect/IP:PORT format for Steam's browser protocol
    window.location.href = `steam://run/320//connect/${serverIP}`;
  };

  return (
    <button
      onClick={handleConnect}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden connect-button bg-[#ff7700] hover:bg-[#ff9d47] text-black font-mono font-bold py-3 px-8 md:py-4 md:px-12 border-2 border-[#ff7700] transition-all duration-300 ${
        isHovering ? 'shadow-[0_0_15px_rgba(255,119,0,0.7)]' : ''
      }`}
    >
      <div className={`button-glitch absolute inset-0 bg-[#ff7700] opacity-0 ${
        isHovering ? 'animate-glitch' : ''
      }`}></div>
      <span className="relative z-10 text-lg md:text-xl tracking-widest">CONNECT on STEAM</span>
    </button>
  );
};

export default ConnectButton;
