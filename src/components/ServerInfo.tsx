import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const ServerInfo: React.FC = () => {
  const [playerCount, setPlayerCount] = useState<number>(Math.floor(Math.random() * 16));
  const [pingTime, setPingTime] = useState<number>(Math.floor(Math.random() * 100) + 20);
  const serverIP = "citadelhl2dm.ru:27223";

  useEffect(() => {
    // Simulate changing player count and ping
    const interval = setInterval(() => {
      setPlayerCount(Math.floor(Math.random() * 16));
      setPingTime(Math.floor(Math.random() * 100) + 20);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="server-info bg-black/50 border border-[#ff7700]/30 p-4 rounded">
      <div className="server-title text-center mb-6">
        <h2 className="text-[#ff7700] text-xl md:text-2xl font-mono font-bold tracking-widest glow-text">
          CITADEL HL2DM SERVER
        </h2>
        <div className="server-status-line flex items-center justify-center mt-1">
          <div className={`h-2 w-2 rounded-full ${playerCount > 0 ? 'bg-[#4AAE4C]' : 'bg-red-500'} mr-2 animate-pulse`}></div>
          <span className={`text-xs ${playerCount > 0 ? 'text-[#4AAE4C]' : 'text-red-500'}`}>
            {playerCount > 0 ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      <div className="server-details space-y-4">
        <div className="info-row">
          <div className="flex items-center text-green-400">
            <ChevronRight className="h-4 w-4 mr-2" />
            <span className="font-mono">Server IP:</span>
          </div>
          <div className="ip-display mt-1 bg-black/70 border border-green-500/30 px-3 py-1 font-mono text-[#ff7700] text-center select-all">
            {serverIP}
          </div>
        </div>

        <div className="info-row">
          <div className="flex items-center text-green-400">
            <ChevronRight className="h-4 w-4 mr-2" />
            <span className="font-mono">Current status:</span>
          </div>
          <div className="status-display mt-1 grid grid-cols-2 gap-2 text-sm">
            <div className="stat bg-black/70 border border-green-500/30 px-3 py-1">
              <span className="text-gray-400 font-mono">Players:</span>
              <span className="text-[#ff7700] font-mono ml-2">{playerCount}/16</span>
            </div>
            <div className="stat bg-black/70 border border-green-500/30 px-3 py-1">
              <span className="text-gray-400 font-mono">Ping:</span>
              <span className="text-[#ff7700] font-mono ml-2">{pingTime}ms</span>
            </div>
          </div>
        </div>

        <div className="info-row">
          <div className="flex items-center text-green-400">
            <ChevronRight className="h-4 w-4 mr-2" />
            <span className="font-mono">How to connect:</span>
          </div>
          <div className="connect-instructions mt-1 bg-black/70 border border-green-500/30 p-3 font-mono text-gray-300 text-sm">
            <p>1. Launch Half-Life 2: Deathmatch</p>
            <p>2. Open console (~)</p>
            <p>3. Type: <span className="text-[#ff7700] select-all">connect {serverIP}</span></p>
            <p>4. Press Enter</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerInfo;
