'use client';

import { memo, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { StatusCard } from '@/components/StatusCard';
import { ConfigurationCard } from '@/components/ConfigurationCard';
import dynamic from 'next/dynamic';
import { LocationCard } from '@/components/LocationCard';
import { LogCard } from '@/components/LogCard';

import { useTheme } from '@/hooks/useTheme';
import { useLogs } from '@/hooks/useLogs';
import { useDeviceConnection } from '@/hooks/useDeviceConnection';
import { useLocation } from '@/hooks/useLocation';
import { useVoiceControl } from '@/hooks/useVoiceControl';
import { useEmail } from '@/hooks/useEmail';
const ControlPad = dynamic(() => import('@/components/ControlPad').then(m => m.ControlPad), { ssr: false });

const Home = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const { logs, logContainerRef, addLog, clearLog } = useLogs();
  const { 
    motorBaseUrl, 
    isOnline, 
    lastCommand, 
    commandCount, 
    ipInputRef, 
    sendCommand, 
    pingDevice, 
    saveBaseUrl 
  } = useDeviceConnection(addLog);
  
  const {
    location,
    locationError,
    isLocationLoading,
    locationPermission,
    isAddressLoading,
    isAutoUpdating,
    dbLocation,
    isLoadingDbLocation,
    getCurrentLocation,
    fetchLocationFromDatabase,
    formatLocation,
    formatAccuracy
  } = useLocation();

  const { isListening, toggleListening } = useVoiceControl(sendCommand, addLog);
  
  const {
    emailConfig,
    setEmailConfig,
    isEmailConfigured,
    isSendingEmail,
    sendEmergencyEmail,
    testEmailConfig,
    saveEmailConfig
  } = useEmail(addLog);

  const handleSendCommand = useCallback((cmd: string) => {
    if (cmd === 'emergency' && location) {
      sendEmergencyEmail(location);
    }
    sendCommand(cmd);
  }, [location, sendEmergencyEmail, sendCommand]);

  const backgroundClass = useMemo(() => 
    theme === 'light' 
      ? 'bg-gradient-to-br from-blue-50 via-blue-25 to-white via-blue-25 to-blue-50' 
      : 'bg-black text-white',
    [theme]
  );

  const mainCardClass = useMemo(() => 
    `${theme === 'light' ? 'medical-card' : 'glass-card'} transition-all duration-300 group overflow-hidden relative transform-gpu mb-8`,
    [theme]
  );

  const cardBackgroundClass = useMemo(() => 
    `absolute inset-0 shadow-lg ${theme === 'light' ? 'bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 border border-blue-200' : 'bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30'}`,
    [theme]
  );

  const gridClass = useMemo(() => 
    `grid grid-cols-1 lg:grid-cols-2 divide-x ${theme === 'light' ? 'divide-blue-200' : 'divide-zinc-700/30'}`,
    [theme]
  );

  return (
    <div className={`min-h-screen ${backgroundClass}`} suppressHydrationWarning>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main 
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12 performance-optimized"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          touchAction: 'pan-y',
        }}
      >
        <StatusCard 
          theme={theme}
          isOnline={isOnline}
          isListening={isListening}
          lastCommand={lastCommand}
          commandCount={commandCount}
          location={location}
          dbLocation={dbLocation}
          isEmailConfigured={isEmailConfigured}
          pingDevice={pingDevice}
        />

        <ConfigurationCard 
          theme={theme}
          ipInputRef={ipInputRef}
          emailConfig={emailConfig}
          setEmailConfig={setEmailConfig}
          isEmailConfigured={isEmailConfigured}
          isSendingEmail={isSendingEmail}
          saveBaseUrl={saveBaseUrl}
          pingDevice={pingDevice}
          saveEmailConfig={saveEmailConfig}
          testEmailConfig={testEmailConfig}
        />

        <ControlPad 
          theme={theme}
          isListening={isListening}
          isSendingEmail={isSendingEmail}
          sendCommand={handleSendCommand}
          toggleListening={toggleListening}
          clearLog={clearLog}
        />

        <div className={mainCardClass}>
          <div className={cardBackgroundClass}></div>
          <div className="relative z-10">
            <div className={gridClass}>
              <LocationCard 
                theme={theme}
                location={location}
                locationError={locationError}
                isLocationLoading={isLocationLoading}
                locationPermission={locationPermission}
                isAddressLoading={isAddressLoading}
                isAutoUpdating={isAutoUpdating}
                dbLocation={dbLocation}
                isLoadingDbLocation={isLoadingDbLocation}
                getCurrentLocation={getCurrentLocation}
                fetchLocationFromDatabase={fetchLocationFromDatabase}
                formatLocation={formatLocation}
                formatAccuracy={formatAccuracy}
              />
              <LogCard 
                theme={theme}
                logs={logs}
                logContainerRef={logContainerRef}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;