import React, { useEffect, useState, useRef } from 'react';
import ServerInfo from './ServerInfo';
import ConnectButton from './ConnectButton';
import { typeText } from '../utils/terminalEffects';

const Terminal: React.FC = () => {
  const [bootupComplete, setBootupComplete] = useState(false);
  const [bootingText, setBootingText] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bootSequence = async () => {
      const bootupMessages = [
        '> Initializing Citadel terminal...',
        '> Loading security protocols...',
        '> Establishing connection to Citadel network...',
        '> Connection established.',
        '> Accessing server database...',
        '> Server information retrieved.',
        '> Rendering interface...'
      ];

      for (const message of bootupMessages) {
        await typeText(message, setBootingText);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      setBootupComplete(true);
    };

    bootSequence();
  }, []);

  return (
    <div 
      ref={terminalRef}
      className="terminal-container relative bg-black border-2 border-[#ff7700]/50 rounded-sm p-6 md:p-8 overflow-hidden"
    >
      <div className="terminal-header border-b border-[#ff7700]/30 pb-2 mb-4 flex justify-between items-center">
        <div className="terminal-title text-[#ff7700] font-mono text-sm md:text-base">
          Citadel Terminal v2.3.5 [NoSteam]
        </div>
        <div className="terminal-status flex items-center">
          <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-[#4AAE4C] mr-2"></div>
          <span className="text-[#4AAE4C] text-xs md:text-sm font-mono">CONNECTED</span>
        </div>
      </div>

      <div className="terminal-content font-mono text-sm md:text-base text-green-500">
        {bootingText}
        {!bootupComplete && (
          <span className="cursor inline-block h-4 w-2 bg-green-500 ml-1 animate-blink"></span>
        )}
      </div>

      {bootupComplete && (
        <div className="server-content mt-6 animate-fadeIn">
          <ServerInfo />
          <div className="connect-container mt-8 flex justify-center">
            <ConnectButton />
          </div>
          <div className="terminal-footer mt-8 text-xs text-gray-500 text-center">
            <p>© 2025 Citadel Research Facility. All rights reserved.</p>
            <p className="mt-1">Authorized access only. Violations will be prosecuted.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminal;
