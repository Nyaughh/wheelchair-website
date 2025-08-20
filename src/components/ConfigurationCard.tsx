import { SaveIcon, TestIcon } from './icons';
import { Theme } from '@/types';

interface ConfigurationCardProps {
  theme: Theme;
  ipInputRef: React.RefObject<HTMLInputElement | null>;
  emailConfig: { emergencyEmail: string };
  setEmailConfig: (config: { emergencyEmail: string }) => void;
  isEmailConfigured: boolean;
  isSendingEmail: boolean;
  saveBaseUrl: () => void;
  pingDevice: () => void;
  saveEmailConfig: () => void;
  testEmailConfig: () => void;
}

export const ConfigurationCard = ({
  theme,
  ipInputRef,
  emailConfig,
  setEmailConfig,
  isEmailConfigured,
  isSendingEmail,
  saveBaseUrl,
  pingDevice,
  saveEmailConfig,
  testEmailConfig
}: ConfigurationCardProps) => {
  return (
    <div className={`${theme === 'light' ? 'medical-card' : 'glass-card'} transition-all duration-500 group overflow-hidden relative transform-gpu mb-8 sm:mb-10`}> 
      <div className={`absolute inset-0 backdrop-blur-2xl shadow-lg ${theme === 'light' ? 'bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 border border-blue-200' : 'bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30'}`}></div>
      <div className="relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 divide-x ${theme === 'light' ? 'divide-blue-200' : 'divide-zinc-700/30'}`}>
          <div className="p-4 flex flex-col justify-between h-40">
            <div>
              <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] mb-3 ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>DEVICE URL</h3>
              <div className="space-y-3">
                <div>
                  <input 
                    ref={ipInputRef}
                    className={`${theme === 'light' ? 'input-medical' : 'input-dark'} w-full px-3 py-2 text-sm font-mono tracking-wide`}
                    placeholder="http://192.168.1.14" 
                    defaultValue="http://192.168.1.14"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                className={`${theme === 'light' ? 'btn-medical-secondary' : 'btn-secondary'} flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2`}
                onClick={saveBaseUrl}
              >
                <SaveIcon />
                Save
              </button>
              <button 
                className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2`}
                onClick={pingDevice}
              >
                <TestIcon />
                Test
              </button>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between h-40">
            <div>
              <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] mb-3 ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>EMERGENCY EMAIL ADDRESS</h3>
              <div className="space-y-3">
                <div>
                  <input 
                    type="email"
                    className={`${theme === 'light' ? 'input-medical' : 'input-dark'} w-full px-3 py-2 text-sm font-mono tracking-wide`}
                    placeholder="emergency@example.com"
                    value={emailConfig.emergencyEmail}
                    onChange={(e) => setEmailConfig({ ...emailConfig, emergencyEmail: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                className={`${theme === 'light' ? 'btn-medical-secondary' : 'btn-secondary'} flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2`}
                onClick={saveEmailConfig}
              >
                <SaveIcon />
                Save
              </button>
              <button 
                className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2`}
                onClick={testEmailConfig}
                disabled={!isEmailConfigured || isSendingEmail}
              >
                {isSendingEmail ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Testing...
                  </>
                ) : (
                  <>
                    <TestIcon />
                    Test
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
