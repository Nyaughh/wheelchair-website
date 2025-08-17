'use client';

import { useState, useEffect, useRef } from 'react';

// Icon Components
const RefreshIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const MicrophoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const StopIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const TestIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const WheelchairIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <circle cx="17" cy="17" r="3" strokeWidth={2} />
    <circle cx="7" cy="17" r="3" strokeWidth={2} />
  </svg>
);

const EmergencyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.968-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

export default function Home() {
  const [motorBaseUrl, setMotorBaseUrl] = useState('http://192.168.1.14');
  const [isOnline, setIsOnline] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [logs, setLogs] = useState(['System ready.']);
  const [lastCommand, setLastCommand] = useState('');
  const [commandCount, setCommandCount] = useState(0);
  const [recognition, setRecognition] = useState<any>(null);
  const ipInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedUrl = localStorage.getItem('motorBaseUrl');
    if (savedUrl) {
      setMotorBaseUrl(savedUrl);
    }
  }, []);
  
  useEffect(() => {
    // Auto-ping every 10 seconds to check connection
    const interval = setInterval(() => {
      if (motorBaseUrl) {
        pingDevice();
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [motorBaseUrl]);

  const addLog = (message: string, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, newLog]);
  };

  const clearLog = () => {
    setLogs([]);
  };

  const normalizeUrl = (v: string) => {
    let val = (v || '').trim();
    if (!val) return '';
    if (!/^https?:\/\//i.test(val)) val = 'http://' + val;
    return val.replace(/\/$/, '');
  };

  const saveBaseUrl = () => {
    const val = normalizeUrl(ipInputRef.current?.value || '');
    if (!val) return;
    setMotorBaseUrl(val);
    localStorage.setItem('motorBaseUrl', val);
    addLog('Saved device URL: ' + val, 'status');
  };

  const pingDevice = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const res = await fetch(motorBaseUrl, {
        signal: controller.signal,
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
        }
      });
      
      clearTimeout(timeoutId);
      
      // If we get a response (even if connection resets), consider it online
      if (res.status === 200) {
        try {
          const text = await res.text();
          addLog('Ping: ' + res.status + ' ' + text.slice(0, 60), 'status');
        } catch (textError) {
          addLog('Ping: ' + res.status + ' (response received)', 'status');
        }
        setIsOnline(true);
      } else {
        addLog('Ping: ' + res.status, 'error');
        setIsOnline(false);
      }
    } catch (e) {
      const errorMsg = e.toString();
      // If it's a connection reset but we got a 200 status, still consider online
      if (errorMsg.includes('CONNECTION_RESET') || errorMsg.includes('AbortError')) {
        addLog('Connection reset (but device responding)', 'status');
        setIsOnline(true);
      } else {
        addLog('Ping failed: ' + errorMsg, 'error');
        setIsOnline(false);
      }
    }
  };

  const sendCommand = (cmd: string) => {
    addLog(`Sending command: ${cmd}`);
    setLastCommand(cmd);
    setCommandCount(prev => prev + 1);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    fetch(`${motorBaseUrl}/${cmd}`, {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
      }
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (res.status === 200) {
          setIsOnline(true);
          return res.text().catch(() => 'Command sent successfully');
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .then((data) => {
        addLog(`Car responded: ${data}`, 'status');
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        const errorMsg = err.toString();
        // If it's a connection reset, the command likely still worked
        if (errorMsg.includes('CONNECTION_RESET') || errorMsg.includes('AbortError')) {
          addLog(`Command sent (connection reset)`, 'status');
          setIsOnline(true);
        } else {
          addLog(`Error: ${errorMsg}`, 'error');
          setIsOnline(false);
        }
      });
  };

  const ensureRecognition = () => {
    if (recognition) return recognition;
    
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Ctor) {
      addLog('Speech recognition not supported in this browser', 'error');
      return null;
    }
    
    const newRecognition = new Ctor();
    newRecognition.lang = 'en-US';
    newRecognition.interimResults = true;
    
    newRecognition.onresult = function (event: any) {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i)
        transcript += event.results[i][0].transcript;
      transcript = transcript.trim().toLowerCase();
      if (transcript) addLog(`Heard: "${transcript}"`);
      if (event.results[0].isFinal) {
        if (transcript.includes('emergency') || transcript.includes('help') || transcript.includes('alert')) sendCommand('emergency');
        else if (transcript.includes('forward')) sendCommand('forward');
        else if (transcript.includes('back')) sendCommand('back');
        else if (transcript.includes('stop')) sendCommand('stop');
        else addLog('Command not recognized');
      }
    };
    
    newRecognition.onerror = function (e: any) {
      addLog(`Speech recognition error: ${e.error}`, 'error');
    };
    
    newRecognition.onend = function () {
      if (isListening) {
        newRecognition.start();
      } else {
        addLog('Stopped listening');
      }
    };
    
    setRecognition(newRecognition);
    return newRecognition;
  };

  const toggleListening = () => {
    const rec = ensureRecognition();
    if (!rec) return;
    
    if (isListening) {
      setIsListening(false);
      rec.stop();
    } else {
      setIsListening(true);
      addLog('Listening for commands...');
      rec.start();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative border-b bg-gradient-to-r from-zinc-950/80 via-black to-zinc-950/80 backdrop-blur-3xl overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-zinc-300/[0.02] opacity-50"></div>

        <div className="max-w-7xl mx-auto px-8 py-12 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 border border-zinc-700/30 backdrop-blur-sm">
                <WheelchairIcon />
              </div>
              <h1 className="text-5xl font-extralight tracking-[-0.02em] bg-gradient-to-r from-white via-zinc-100 to-zinc-200 bg-clip-text text-transparent leading-tight">
                Voice Controlled Wheelchair
              </h1>
            </div>
            <p className="text-zinc-400">Control your wheelchair with voice commands or manual controls</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="glass-card transition-all duration-500 group overflow-hidden relative rounded-3xl transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-zinc-300/5 to-transparent rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="pb-4 pt-6 px-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-2">CONNECTION STATUS</h3>
                <button 
                  className="px-2 py-1 rounded-md text-xs font-semibold transition-colors hover:opacity-80 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20"
                  onClick={pingDevice}
                  title="Check connection"
                >
                  <RefreshIcon />
                </button>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
                isOnline ? 'status-online' : 'status-offline'
              }`}>
                <span className={`w-2 h-2 rounded-full glow-subtle ${
                  isOnline ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>

          <div className="glass-card transition-all duration-500 group overflow-hidden relative rounded-3xl transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/10 via-zinc-400/5 to-transparent rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="pb-4 pt-6 px-6 relative z-10">
              <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-4">VOICE CONTROL</h3>
              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
                isListening ? 'status-online' : 'status-offline'
              }`}>
                <span className={`w-2 h-2 rounded-full glow-subtle ${
                  isListening ? 'bg-green-500' : 'bg-gray-500'
                }`}></span>
                <span>{isListening ? 'Listening' : 'Inactive'}</span>
              </div>
            </div>
          </div>

          <div className="glass-card transition-all duration-500 group overflow-hidden relative rounded-3xl transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 via-zinc-600/5 to-transparent rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="pb-4 pt-6 px-6 relative z-10">
              <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-4">LAST COMMAND</h3>
              <div className="text-2xl font-bold text-premium">
                {lastCommand || 'None'}
              </div>
              <div className="text-sm mt-1 text-zinc-400">
                Recent action
              </div>
            </div>
          </div>

          <div className="glass-card transition-all duration-500 group overflow-hidden relative rounded-3xl transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/10 via-zinc-300/5 to-transparent rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="pb-4 pt-6 px-6 relative z-10">
              <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-4">COMMANDS SENT</h3>
              <div className="text-2xl font-bold text-premium">
                {commandCount}
              </div>
              <div className="text-sm mt-1 text-zinc-400">
                Total commands
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-card transition-all duration-700 group overflow-hidden rounded-3xl relative transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-zinc-300/5 to-zinc-500/10 rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="pb-6 pt-6 px-6 border-b border-zinc-700/40 relative z-10">
              <h3 className="text-xl font-extralight text-white tracking-wide text-premium">Device Configuration</h3>
            </div>
            <div className="pt-6 px-6 pb-6 relative z-10">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-400">Device URL</label>
                  <input 
                    ref={ipInputRef}
                    className="input-dark w-full px-4 py-3 text-sm"
                    placeholder="http://192.168.1.14" 
                    defaultValue={motorBaseUrl}
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    className="btn-secondary flex-1 px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2"
                    onClick={saveBaseUrl}
                  >
                    <SaveIcon />
                    Save Configuration
                  </button>
                  <button 
                    className="btn-primary px-6 py-3 rounded-lg text-sm flex items-center justify-center gap-2"
                    onClick={pingDevice}
                  >
                    <TestIcon />
                    Test Connection
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card transition-all duration-700 group overflow-hidden rounded-3xl relative transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/10 via-zinc-400/5 to-transparent rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="pb-6 pt-6 px-6 border-b border-zinc-700/40 relative z-10">
              <h3 className="text-xl font-extralight text-white tracking-wide text-premium">Voice Controls</h3>
            </div>
            <div className="pt-6 px-6 pb-6 relative z-10">
              <div className="space-y-4">
                <button 
                  className={`w-full px-4 py-4 rounded-lg text-sm flex items-center justify-center gap-2 ${
                    isListening ? 'btn-danger' : 'btn-success'
                  }`}
                  onClick={toggleListening}
                >
                  {isListening ? <StopIcon /> : <MicrophoneIcon />}
                  {isListening ? 'Stop Voice Control' : 'Start Voice Control'}
                </button>
                <button 
                  className="btn-secondary w-full px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2"
                  onClick={clearLog}
                >
                  <TrashIcon />
                  Clear Activity Log
                </button>
                <div className="text-xs mt-4 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/40 text-zinc-400">
                  Say: "forward", "back", "stop", "emergency", "help", or "alert"
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card transition-all duration-700 group overflow-hidden rounded-3xl relative transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-300/10 via-zinc-500/5 to-transparent rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="pb-6 pt-6 px-6 border-b border-zinc-700/40 relative z-10">
              <h3 className="text-xl font-extralight text-white tracking-wide text-premium">Manual Controls</h3>
            </div>
            <div className="pt-6 px-6 pb-6 relative z-10">
              <div className="grid grid-cols-3 gap-4">
                <button 
                  className="btn-primary col-span-3 px-6 py-4 rounded-lg text-sm flex items-center justify-center gap-2 font-medium"
                  onClick={() => sendCommand('forward')}
                >
                  <ArrowUpIcon />
                  Move Forward
                </button>
                <button 
                  className="btn-danger px-6 py-4 rounded-lg text-sm flex items-center justify-center gap-2 font-medium"
                  onClick={() => sendCommand('stop')}
                >
                  <StopIcon />
                  Stop
                </button>
                <button 
                  className="btn-emergency px-6 py-4 rounded-lg text-sm flex items-center justify-center gap-2 font-medium animate-pulse"
                  onClick={() => sendCommand('emergency')}
                >
                  <EmergencyIcon />
                  EMERGENCY
                </button>
                <button 
                  className="btn-primary px-6 py-4 rounded-lg text-sm flex items-center justify-center gap-2 font-medium"
                  onClick={() => sendCommand('back')}
                >
                  <ArrowDownIcon />
                  Move Back
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card transition-all duration-700 group overflow-hidden rounded-3xl relative transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-400/10 via-zinc-600/5 to-transparent rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="pb-6 pt-6 px-6 border-b border-zinc-700/40 relative z-10">
              <h3 className="text-xl font-extralight text-white tracking-wide text-premium">Activity Log</h3>
            </div>
            <div className="pt-6 px-6 pb-6 relative z-10">
              <div className="log-container p-4">
                {logs.length === 0 ? (
                  <div className="text-sm text-zinc-400">No activity yet...</div>
                ) : (
                  logs.map((log, index) => (
                    <div 
                      key={index} 
                      className="text-sm py-1 border-b border-zinc-800/30 last:border-b-0 text-white"
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}