import { useState, useEffect, useRef } from 'react';

export const useDeviceConnection = (addLog: (message: string, type?: string) => void) => {
  const [motorBaseUrl, setMotorBaseUrl] = useState('http://192.168.1.14');
  const [isOnline, setIsOnline] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [commandCount, setCommandCount] = useState(0);
  const ipInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedUrl = localStorage.getItem('motorBaseUrl');
    if (savedUrl) {
      setMotorBaseUrl(savedUrl);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (motorBaseUrl) {
        pingDevice();
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [motorBaseUrl]);

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
      const errorMsg = e instanceof Error ? e.message : String(e);
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
        const errorMsg = err instanceof Error ? err.message : String(err);
        if (errorMsg.includes('CONNECTION_RESET') || errorMsg.includes('AbortError')) {
          addLog(`Command sent (connection reset)`, 'status');
          setIsOnline(true);
        } else {
          addLog(`Error: ${errorMsg}`, 'error');
          setIsOnline(false);
        }
      });
  };

  return {
    motorBaseUrl,
    isOnline,
    lastCommand,
    commandCount,
    ipInputRef,
    sendCommand,
    pingDevice,
    saveBaseUrl
  };
};
