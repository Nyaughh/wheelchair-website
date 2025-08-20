import { PulseIcon } from './icons';
import { Theme } from '@/types';

interface LogCardProps {
  theme: Theme;
  logs: string[];
  logContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const LogCard = ({ theme, logs, logContainerRef }: LogCardProps) => {
  return (
    <div className="p-6">
      <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] mb-4 flex items-center gap-2 ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>
        <PulseIcon />
        ACTIVITY LOG
      </h3>
      <div ref={logContainerRef} className={`${theme === 'light' ? 'log-container-medical' : 'log-container'} p-4`}>
        {logs.length === 0 ? (
          <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-zinc-400'}`}>No activity yet...</div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={index} 
              className={`text-sm py-1 border-b last:border-b-0 ${theme === 'light' ? 'border-gray-200 text-gray-800' : 'border-zinc-800/30 text-white'}`}
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
