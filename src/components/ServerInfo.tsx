import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

// Типы для данных сервера
interface ServerData {
  players: number;
  ping: number;
  maxPlayers: number;
  status: 'ONLINE' | 'OFFLINE';
}

const ServerInfo: React.FC = () => {
  const [serverData, setServerData] = useState<ServerData>({
    players: 0,
    ping: 0,
    maxPlayers: 16,
    status: 'OFFLINE'
  });
  const [loading, setLoading] = useState(true);
  const serverIP = "46.174.48.48:27223";

  const gamemonitoringServerId = "8967211"; // ID вашего сервера в GameMonitoring

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.gamemonitoring.ru/servers/${gamemonitoringServerId}`);
        const data = await response.json();
        
        setServerData({
          players: data.players,
          ping: data.ping,
          maxPlayers: 16, // или data.maxPlayers если API возвращает
          status: data.players >= 0 ? 'ONLINE' : 'OFFLINE' // предполагаем, что отрицательное значение = оффлайн
        });
      } catch (error) {
        console.error('Error fetching server data:', error);
        setServerData(prev => ({
          ...prev,
          status: 'OFFLINE'
        }));
      } finally {
        setLoading(false);
      }
    };

    // Первый запрос
    fetchServerData();
    
    // Интервал обновления (каждые 30 секунд)
    const interval = setInterval(fetchServerData, 30000);

    return () => clearInterval(interval);
  }, [gamemonitoringServerId]);

  if (loading) {
    return (
      <div className="server-info bg-black/50 border border-[#ff7700]/30 p-4 rounded">
        <div className="text-center text-[#ff7700]">Loading server data...</div>
      </div>
    );
  }

  return (
    <div className="server-info bg-black/50 border border-[#ff7700]/30 p-4 rounded">
      <div className="server-title text-center mb-6">
        <h2 className="text-[#ff7700] text-xl md:text-2xl font-mono font-bold tracking-widest glow-text">
          CITADEL HL2DM SERVER
        </h2>
        <div className="server-status-line flex items-center justify-center mt-1">
          <div className={`h-2 w-2 rounded-full ${serverData.status === 'ONLINE' ? 'bg-[#4AAE4C]' : 'bg-red-500'} mr-2 animate-pulse`}></div>
          <span className={`text-xs ${serverData.status === 'ONLINE' ? 'text-[#4AAE4C]' : 'text-red-500'}`}>
            {serverData.status}
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
                {serverData.players}/{serverData.maxPlayers}
              </span>
            </div>
            <div className="stat bg-black/70 border border-green-500/30 px-3 py-1">
              <span className="text-gray-400 font-mono">Ping:</span>
              <span className="text-[#ff7700] font-mono ml-2">
                {serverData.status === 'ONLINE' ? `${serverData.ping}ms` : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Остальная часть компонента без изменений */}
      </div>
    </div>
  );
};

export default ServerInfo;
