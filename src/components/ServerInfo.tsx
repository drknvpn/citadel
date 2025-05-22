import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface ServerData {
  numplayers: number;
  maxplayers: number;
  status: boolean;
  map: string;
  gamemode: string;
}

const ServerInfo: React.FC = () => {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const serverIP = "citadelhl2dm.ru:27223";

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.gamemonitoring.ru/servers/8967211');
        const data = await response.json();
        
        if (data && data.response) {
          setServerData({
            numplayers: data.response.numplayers,
            maxplayers: data.response.maxplayers,
            status: data.response.status,
            map: data.response.map,
            gamemode: data.response.gamemode
          });
        }
      } catch (error) {
        console.error('Error fetching server data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServerData();
    const interval = setInterval(fetchServerData, 30000);

    return () => clearInterval(interval);
  }, []);

  const isOnline = serverData ? serverData.status : false;

  return (
    <div className="server-info bg-black/50 border border-[#ff7700]/30 p-4 rounded">
      <div className="server-title text-center mb-6">
        <h2 className="text-[#ff7700] text-xl md:text-2xl font-mono font-bold tracking-widest glow-text">
          CITADEL HL2DM SERVER
        </h2>
        <div className="server-status-line flex items-center justify-center mt-1">
          <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-[#4AAE4C]' : 'bg-red-500'} mr-2 animate-pulse`}></div>
          <span className={`text-xs ${isOnline ? 'text-[#4AAE4C]' : 'text-red-500'}`}>
            {isOnline ? 'ONLINE' : 'OFFLINE'}
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
              <span className="text-[#ff7700] font-mono ml-2">
                {loading ? 'Loading...' : `${serverData?.numplayers || 0}/${serverData?.maxplayers || 16}`}
              </span>
            </div>
            <div className="stat bg-black/70 border border-green-500/30 px-3 py-1">
              <span className="text-gray-400 font-mono">Map:</span>
              <span className="text-[#ff7700] font-mono ml-2">
                {loading ? 'Loading...' : serverData?.map || 'Unknown'}
              </span>
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

        <div className="info-row">
          <div className="flex items-center text-green-400">
            <ChevronRight className="h-4 w-4 mr-2" />
            <span className="font-mono">Server maps, hud, icons:</span>
          </div>
          <div className="mt-1 bg-black/70 border border-green-500/30 p-3 font-mono text-gray-300 text-sm">
            <p>1. Go to: <span className="text-[#ff7700]">hl2mp\custom\bruss.org\resource</span></p>
            <p>• Delete all files in this folder (keep folder)</p>
            <p>2. Rename <span className="text-[#ff7700]">bruss.org</span> to <span className="text-[#ff7700]">CITADEL OLD</span></p>
            <p>3. From archive:</p>
            <p>• Copy <span className="text-[#ff7700]">custom</span> to <span className="text-[#ff7700]">hl2mp\custom</span></p>
            <p>• Copy <span className="text-[#ff7700]">maps</span> to <span className="text-[#ff7700]">hl2mp\maps</span></p>
            
            <div className="mt-4 flex justify-center">
              <a href="/path/to/your/files.zip" 
                 className="bg-[#ff7700] hover:bg-[#ff6600] text-black font-mono px-4 py-2 rounded border border-[#ff7700] transition-colors duration-200">
                DOWNLOAD FILES
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerInfo;
