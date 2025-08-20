import { useState, useEffect, useRef } from 'react';

export const useLogs = () => {
  const [logs, setLogs] = useState(['System ready.']);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, newLog]);
  };

  const clearLog = () => {
    setLogs([]);
  };

  return {
    logs,
    logContainerRef,
    addLog,
    clearLog
  };
};
