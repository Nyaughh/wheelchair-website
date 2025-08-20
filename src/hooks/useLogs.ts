import { useState, useEffect, useRef, useCallback } from 'react';

const MAX_LOGS = 100;

export const useLogs = () => {
  const [logs, setLogs] = useState(['System ready.']);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = useCallback(() => {
    if (logContainerRef.current && scrollTimeoutRef.current === null) {
      scrollTimeoutRef.current = setTimeout(() => {
        if (logContainerRef.current) {
          logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
        scrollTimeoutRef.current = null;
      }, 16);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [logs, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const addLog = useCallback((message: string, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] ${message}`;
    setLogs(prev => {
      const updatedLogs = [...prev, newLog];
      if (updatedLogs.length > MAX_LOGS) {
        return updatedLogs.slice(-MAX_LOGS);
      }
      return updatedLogs;
    });
  }, []);

  const clearLog = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    logs,
    logContainerRef,
    addLog,
    clearLog
  };
};
