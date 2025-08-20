import { useState, useEffect, useRef } from 'react';

export const useVoiceControl = (sendCommand: (cmd: string) => void, addLog: (message: string, type?: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

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
        else if (transcript.includes('left')) sendCommand('left');
        else if (transcript.includes('right')) sendCommand('right');
        else if (transcript.includes('stop')) sendCommand('stop');
        else addLog('Command not recognized');
      }
    };
    
    newRecognition.onerror = function (e: any) {
      addLog(`Speech recognition error: ${e.error}`, 'error');
      if (e.error === 'no-speech' || e.error === 'audio-capture' || e.error === 'not-allowed') {
        setIsListening(false);
      }
    };
    
    newRecognition.onend = function () {
      if (isListening) {
        newRecognition.start();
      } else {
        setIsListening(false);
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
      addLog('Stopping voice control...');
    } else {
      setIsListening(true);
      addLog('Listening for commands...');
      rec.start();
    }
  };

  return {
    isListening,
    toggleListening
  };
};
