import { memo } from 'react';
import { RefreshIcon } from './icons';
import { Theme } from '@/types';

interface StatusCardProps {
  theme: Theme;
  isOnline: boolean;
  isListening: boolean;
  lastCommand: string;
  commandCount: number;
  location: any;
  dbLocation: any;
  isEmailConfigured: boolean;
  pingDevice: () => void;
}

export const StatusCard = memo(({ 
  theme, 
  isOnline, 
  isListening, 
  lastCommand, 
  commandCount, 
  location, 
  dbLocation, 
  isEmailConfigured, 
  pingDevice 
}: StatusCardProps) => {
  return (
    <div className={`${theme === 'light' ? 'medical-card' : 'glass-card'} transition-all duration-300 group overflow-hidden relative transform-gpu mb-10 sm:mb-12 lg:mb-16`}>
      <div className={`absolute inset-0 shadow-lg ${theme === 'light' ? 'bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 border border-blue-200' : 'bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30'}`}></div>
      <div className="relative z-10">
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x ${theme === 'light' ? 'divide-blue-200' : 'divide-zinc-700/30'}`}>
          <div className="p-4 flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>CONNECTION STATUS</h3>
              <button 
                className={`text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors ${theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-zinc-400 hover:text-zinc-300'}`}
                onClick={pingDevice}
                title="Check connection"
              >
                <RefreshIcon />
              </button>
            </div>
            <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
              isOnline ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between h-32">
            <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>VOICE CONTROL</h3>
            <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
              isListening ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                isListening ? 'bg-green-500' : 'bg-gray-500'
              }`}></span>
              <span>{isListening ? 'Listening' : 'Inactive'}</span>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between h-32">
            <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>LAST COMMAND</h3>
            <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
              lastCommand ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                lastCommand ? 'bg-green-500' : 'bg-gray-500'
              }`}></span>
              <span>{lastCommand || 'None'}</span>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between h-32">
            <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>COMMANDS SENT</h3>
            <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
              commandCount > 0 ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                commandCount > 0 ? 'bg-green-500' : 'bg-gray-500'
              }`}></span>
              <span>{commandCount}</span>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between h-32">
            <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>GPS LOCATION</h3>
            <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
              location || dbLocation ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                location ? 'bg-blue-500' : dbLocation ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></span>
              <span>
                {location ? 'Located' : dbLocation ? 'Database' : 'Not Located'}
              </span>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between h-32">
            <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>EMERGENCY EMAIL</h3>
            <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
              isEmailConfigured ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                isEmailConfigured ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
              <span>{isEmailConfigured ? 'Configured' : 'Not Configured'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

StatusCard.displayName = 'StatusCard';
