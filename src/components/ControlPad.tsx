import { 
  CaretUpIcon, 
  CaretDownIcon, 
  CaretLeftIcon, 
  CaretRightIcon, 
  StopIcon, 
  EmergencyIcon, 
  MicrophoneIcon, 
  TrashIcon 
} from './icons';
import { Theme } from '@/types';

interface ControlPadProps {
  theme: Theme;
  isListening: boolean;
  isSendingEmail: boolean;
  sendCommand: (cmd: string) => void;
  toggleListening: () => void;
  clearLog: () => void;
}

export const ControlPad = ({
  theme,
  isListening,
  isSendingEmail,
  sendCommand,
  toggleListening,
  clearLog
}: ControlPadProps) => {
  return (
    <div className={`${theme === 'light' ? 'medical-card' : 'glass-card'} transition-all duration-500 group overflow-hidden relative transform-gpu mb-8 sm:mb-10`}>
      <div className={`absolute inset-0 backdrop-blur-2xl shadow-lg ${theme === 'light' ? 'bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 border border-blue-200' : 'bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30'}`}></div>
      <div className="relative z-10">
        <div className="p-3 sm:p-4">
          <div className="pt-1 sm:pt-2 px-1.5 sm:px-2 pb-2 relative z-10">
            <div className="grid grid-cols-5 grid-rows-5 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-md aspect-square mx-auto">
              <div className="col-start-2 col-span-3 row-start-1">
                <button
                  aria-label="Forward"
                  className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} w-full h-full pad-shape-top pad-button`}
                  onClick={() => sendCommand('forward')}
                >
                  <CaretUpIcon />
                </button>
              </div>
              <div className="col-start-1 row-start-2 row-span-3">
                <button
                  aria-label="Left"
                  className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} w-full h-full pad-shape-left pad-button`}
                  onClick={() => sendCommand('left')}
                >
                  <CaretLeftIcon />
                </button>
              </div>
              <div className="col-start-5 row-start-2 row-span-3">
                <button
                  aria-label="Right"
                  className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} w-full h-full pad-shape-right pad-button`}
                  onClick={() => sendCommand('right')}
                >
                  <CaretRightIcon />
                </button>
              </div>
              <div className="col-start-2 col-span-3 row-start-5">
                <button
                  aria-label="Back"
                  className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} w-full h-full pad-shape-bottom pad-button`}
                  onClick={() => sendCommand('back')}
                >
                  <CaretDownIcon />
                </button>
              </div>
              <div className="col-start-2 row-start-2 col-span-3 row-span-3 grid place-items-center">
                <button
                  aria-label="Stop"
                  className={`${theme === 'light' ? 'btn-medical-danger' : 'btn-danger'} w-3/4 h-3/4 pad-button`}
                  onClick={() => sendCommand('stop')}
                >
                  <StopIcon />
                </button>
              </div>
            </div>
            <button 
              aria-label="Emergency"
              className={`${theme === 'light' ? 'btn-medical-emergency' : 'btn-emergency'} w-full px-4 py-4 text-sm flex items-center justify-center gap-2 mt-4`}
              onClick={() => sendCommand('emergency')}
              disabled={isSendingEmail}
            >
              {isSendingEmail ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <EmergencyIcon />
                  Medical Emergency
                </>
              )}
            </button>

            <div className="mt-3 space-y-3">
              <button 
                className={`w-full px-4 py-4 text-sm flex items-center justify-center gap-2 ${isListening ? (theme === 'light' ? 'btn-medical-danger' : 'btn-danger') : (theme === 'light' ? 'btn-medical-success' : 'btn-success')}`}
                onClick={toggleListening}
              >
                {isListening ? <StopIcon /> : <MicrophoneIcon />}
                {isListening ? 'Stop Voice Control' : 'Start Voice Control'}
              </button>
              <button 
                className={`${theme === 'light' ? 'btn-medical-secondary' : 'btn-secondary'} w-full px-4 py-3 text-sm flex items-center justify-center gap-2`}
                onClick={clearLog}
              >
                <TrashIcon />
                Clear Activity Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
