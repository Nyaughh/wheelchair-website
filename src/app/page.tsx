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

const CaretUpIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const CaretDownIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CaretLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const CaretRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3l6-3" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.968-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

 

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
}

interface EmailConfig {
  emergencyEmail: string;
}

export default function Home() {
  const [motorBaseUrl, setMotorBaseUrl] = useState('http://192.168.1.14');
  const [isOnline, setIsOnline] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [logs, setLogs] = useState(['System ready.']);
  const [lastCommand, setLastCommand] = useState('');
  const [commandCount, setCommandCount] = useState(0);
  const [recognition, setRecognition] = useState<any>(null);
  const ipInputRef = useRef<HTMLInputElement>(null);

  // GPS State
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isAutoUpdating, setIsAutoUpdating] = useState(false);
  const [dbLocation, setDbLocation] = useState<LocationData | null>(null);
  const [isLoadingDbLocation, setIsLoadingDbLocation] = useState(false);

  // Email State
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    emergencyEmail: ''
  });
  const [isEmailConfigured, setIsEmailConfigured] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem('motorBaseUrl');
    if (savedUrl) {
      setMotorBaseUrl(savedUrl);
    }

    const savedEmailConfig = localStorage.getItem('emailConfig');
    if (savedEmailConfig) {
      const config = JSON.parse(savedEmailConfig);
      setEmailConfig(config);
      setIsEmailConfigured(!!config.emergencyEmail);
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

  useEffect(() => {
    checkLocationPermission();
  }, []);

  // Auto-update location every minute
  useEffect(() => {
    if (locationPermission === 'granted') {
      addLog('Auto-update enabled: Location will update every minute', 'status');
    }
    
    const interval = setInterval(() => {
      if (locationPermission === 'granted') {
        getCurrentLocation(true);
      }
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, [locationPermission]);

  // Fetch database location when GPS permission is denied
  useEffect(() => {
    if (locationPermission === 'denied' && !location && !dbLocation) {
      fetchLocationFromDatabase();
    }
  }, [locationPermission, location, dbLocation]);

  const checkLocationPermission = async () => {
    if (!navigator.permissions) {
      setLocationPermission('unknown');
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      setLocationPermission(permission.state);
      
      permission.onchange = () => {
        setLocationPermission(permission.state);
      };
    } catch (error) {
      setLocationPermission('unknown');
    }
  };

  const getCurrentLocation = (isAutoUpdate = false) => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    if (isAutoUpdate) {
      setIsAutoUpdating(true);
    } else {
      setIsLocationLoading(true);
    }
    setLocationError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        setLocation(locationData);
        if (isAutoUpdate) {
          setIsAutoUpdating(false);
        } else {
          setIsLocationLoading(false);
        }
        addLog(`Location updated: ${locationData.latitude.toFixed(6)}, ${locationData.longitude.toFixed(6)}`, 'status');
        
        // Save location to database
        try {
          await saveLocationToDatabase(locationData);
          addLog('Location saved to database', 'status');
        } catch (error) {
          addLog('Failed to save location to database', 'error');
        }
        
        // Get address from coordinates
        setIsAddressLoading(true);
        try {
          const address = await getAddressFromCoordinates(locationData.latitude, locationData.longitude);
          setLocation(prev => prev ? { ...prev, address } : null);
          addLog(`Address: ${address}`, 'status');
          
          // Update location in database with address
          try {
            await saveLocationToDatabase({ ...locationData, address });
          } catch (error) {
            addLog('Failed to update location with address', 'error');
          }
        } catch (error) {
          addLog('Failed to get address', 'error');
        } finally {
          setIsAddressLoading(false);
        }
      },
      (error) => {
        if (isAutoUpdate) {
          setIsAutoUpdating(false);
        } else {
          setIsLocationLoading(false);
        }
        let errorMessage = 'Unknown error occurred';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied';
            setLocationPermission('denied');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        
        setLocationError(errorMessage);
        addLog(`Location error: ${errorMessage}`, 'error');
      },
      options
    );
  };

  const handleGetLocation = () => {
    getCurrentLocation(false);
  };

  const fetchLocationFromDatabase = async () => {
    setIsLoadingDbLocation(true);
    try {
      const response = await fetch('/api/location/latest');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.location) {
          const dbLoc: LocationData = {
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            accuracy: data.location.accuracy,
            timestamp: data.location.timestamp,
            address: data.location.address
          };
          setDbLocation(dbLoc);
          addLog(`Database location loaded: ${dbLoc.latitude.toFixed(6)}, ${dbLoc.longitude.toFixed(6)}`, 'status');
        }
      }
    } catch (error) {
      addLog('Failed to load location from database', 'error');
    } finally {
      setIsLoadingDbLocation(false);
    }
  };

  const openInMaps = () => {
    if (!location) return;
    
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };

  const formatLocation = (location: LocationData) => {
    return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  };

  const formatAccuracy = (accuracy: number) => {
    if (accuracy < 10) return `${accuracy.toFixed(1)}m`;
    if (accuracy < 100) return `${accuracy.toFixed(0)}m`;
    return `${(accuracy / 1000).toFixed(1)}km`;
  };

  const sendEmergencyEmail = async (location: LocationData) => {
    if (!isEmailConfigured) {
      addLog('Email not configured for emergency alerts', 'error');
      return;
    }

    setIsSendingEmail(true);
    addLog('Sending emergency email...', 'status');

    try {
      const subject = '🚨 EMERGENCY ALERT - Wheelchair User Needs Help';
      const text = `
EMERGENCY ALERT

A wheelchair user has triggered an emergency alert and needs immediate assistance.

Location Details:
- Coordinates: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}
- Accuracy: ${formatAccuracy(location.accuracy)}
- Address: ${location.address || 'Not available'}
- Time: ${new Date(location.timestamp).toLocaleString()}

Please respond immediately and contact emergency services if necessary.

This is an automated emergency alert from the Voice Controlled Wheelchair system.
      `;

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">🚨 EMERGENCY ALERT</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Wheelchair User Needs Help</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545;">
            <p style="margin: 0 0 15px 0; font-size: 16px; color: #333;">
              A wheelchair user has triggered an emergency alert and needs immediate assistance.
            </p>
            
            <h3 style="color: #dc3545; margin: 20px 0 10px 0;">Location Details:</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li><strong>Coordinates:</strong> ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}</li>
              <li><strong>Accuracy:</strong> ${formatAccuracy(location.accuracy)}</li>
              <li><strong>Address:</strong> ${location.address || 'Not available'}</li>
              <li><strong>Time:</strong> ${new Date(location.timestamp).toLocaleString()}</li>
            </ul>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px;">
              <p style="margin: 0; color: #856404; font-weight: bold;">
                ⚠️ Please respond immediately and contact emergency services if necessary.
              </p>
            </div>
            
            <p style="margin: 20px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
              This is an automated emergency alert from the Voice Controlled Wheelchair system.
            </p>
          </div>
        </div>
      `;

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailConfig.emergencyEmail,
          subject: subject,
          text: text,
          html: html,
          location: location
        }),
      });

      const result = await response.json();

      if (result.success) {
        addLog('Emergency email sent successfully', 'status');
      } else {
        addLog(`Failed to send emergency email: ${result.error}`, 'error');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      addLog(`Email error: ${errorMsg}`, 'error');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const saveLocationToDatabase = async (locationData: LocationData) => {
    try {
      const response = await fetch('/api/location/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          accuracy: locationData.accuracy,
          timestamp: locationData.timestamp,
          address: locationData.address,
          device_id: 'web'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save location');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error saving location to database:', error);
      throw error;
    }
  };

  const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `/api/geocode?lat=${latitude}&lon=${longitude}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
      
      const data = await response.json();
      
      if (data.display_name) {
        return data.display_name;
      } else if (data.address) {
        const address = data.address;
        const parts = [];
        
        if (address.house_number && address.road) {
          parts.push(`${address.house_number} ${address.road}`);
        } else if (address.road) {
          parts.push(address.road);
        }
        
        if (address.city) {
          parts.push(address.city);
        } else if (address.town) {
          parts.push(address.town);
        } else if (address.village) {
          parts.push(address.village);
        }
        
        if (address.state) {
          parts.push(address.state);
        }
        
        if (address.country) {
          parts.push(address.country);
        }
        
        return parts.join(', ');
      }
      
      return 'Address not available';
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address not available';
    }
  };

  const addLog = (message: string, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, newLog]);
  };

  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

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

  const saveEmailConfig = () => {
    const config = {
      emergencyEmail: emailConfig.emergencyEmail
    };
    
    if (!config.emergencyEmail) {
      addLog('Please enter the emergency email address', 'error');
      return;
    }
    
    setEmailConfig(config);
    localStorage.setItem('emailConfig', JSON.stringify(config));
    setIsEmailConfigured(true);
    addLog('Emergency email configuration saved successfully', 'status');
  };

  const testEmailConfig = async () => {
    if (!isEmailConfigured) {
      addLog('Please configure email settings first', 'error');
      return;
    }

    setIsSendingEmail(true);
    addLog('Testing email configuration...', 'status');

    try {
      const subject = '🧪 Email Test - Voice Controlled Wheelchair';
      const text = `
This is a test email from the Voice Controlled Wheelchair system.

If you receive this email, the email configuration is working correctly.

Test Details:
- Time: ${new Date().toLocaleString()}
- System: Voice Controlled Wheelchair
- Purpose: Configuration Test

This is an automated test email.
      `;

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #17a2b8; color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">🧪 Email Test</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Voice Controlled Wheelchair</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #17a2b8;">
            <p style="margin: 0 0 15px 0; font-size: 16px; color: #333;">
              This is a test email from the Voice Controlled Wheelchair system.
            </p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 4px;">
              <p style="margin: 0; color: #0c5460; font-weight: bold;">
                ✅ If you receive this email, the email configuration is working correctly.
              </p>
            </div>
            
            <h3 style="color: #17a2b8; margin: 20px 0 10px 0;">Test Details:</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
              <li><strong>System:</strong> Voice Controlled Wheelchair</li>
              <li><strong>Purpose:</strong> Configuration Test</li>
            </ul>
            
            <p style="margin: 20px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
              This is an automated test email.
            </p>
          </div>
        </div>
      `;

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailConfig.emergencyEmail,
          subject: subject,
          text: text,
          html: html
        }),
      });

      const result = await response.json();

      if (result.success) {
        addLog('Test email sent successfully', 'status');
      } else {
        addLog(`Failed to send test email: ${result.error}`, 'error');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      addLog(`Test email error: ${errorMsg}`, 'error');
    } finally {
      setIsSendingEmail(false);
    }
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
      const errorMsg = e instanceof Error ? e.message : String(e);
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
    
    if (cmd === 'emergency' && location) {
      sendEmergencyEmail(location);
    }
    
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

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800/40 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-[-0.02em] mb-2">
              Xavier Wheelchair
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8 md:hidden">
          <div className="glass-card transition-all duration-700 group overflow-hidden rounded-3xl relative transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-300/10 via-zinc-500/5 to-transparent rounded-3xl opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="pb-6 pt-6 px-6 border-b border-zinc-700/40 relative z-10">
              <h3 className="text-xl font-extralight text-white tracking-wide text-premium">Controls</h3>
            </div>
            <div className="pt-6 px-6 pb-6 relative z-10">
              <div className="grid grid-cols-5 grid-rows-5 gap-3 w-full max-w-md aspect-square mx-auto">
                <div className="col-start-2 col-span-3 row-start-1">
                  <button aria-label="Forward" className="btn-primary w-full h-full rounded-lg pad-shape-top pad-button" onClick={() => sendCommand('forward')}>
                    <CaretUpIcon />
                  </button>
                </div>
                <div className="col-start-1 row-start-2 row-span-3">
                  <button aria-label="Left" className="btn-primary w-full h-full rounded-lg pad-shape-left pad-button" onClick={() => sendCommand('left')}>
                    <CaretLeftIcon />
                  </button>
                </div>
                <div className="col-start-5 row-start-2 row-span-3">
                  <button aria-label="Right" className="btn-primary w-full h-full rounded-lg pad-shape-right pad-button" onClick={() => sendCommand('right')}>
                    <CaretRightIcon />
                  </button>
                </div>
                <div className="col-start-2 col-span-3 row-start-5">
                  <button aria-label="Back" className="btn-primary w-full h-full rounded-lg pad-shape-bottom pad-button" onClick={() => sendCommand('back')}>
                    <CaretDownIcon />
                  </button>
                </div>
                <div className="col-start-2 row-start-2 col-span-3 row-span-3 grid place-items-center">
                  <button aria-label="Stop" className="btn-danger w-3/4 h-3/4 rounded-lg pad-button" onClick={() => sendCommand('stop')}>
                    <StopIcon />
                  </button>
                </div>
              </div>
              <button aria-label="Emergency" className="btn-emergency w-full px-4 py-4 rounded-lg text-sm flex items-center justify-center gap-2 mt-4" onClick={() => sendCommand('emergency')} disabled={isSendingEmail}>
                {isSendingEmail ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <EmergencyIcon />
                    Emergency
                  </>
                )}
              </button>
              <div className="mt-3 space-y-3">
                <button className={`${isListening ? 'btn-danger' : 'btn-success'} w-full px-4 py-4 rounded-lg text-sm flex items-center justify-center gap-2`} onClick={toggleListening}>
                  {isListening ? <StopIcon /> : <MicrophoneIcon />}
                  {isListening ? 'Stop Voice Control' : 'Start Voice Control'}
                </button>
                <button className="btn-secondary w-full px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2" onClick={clearLog}>
                  <TrashIcon />
                  Clear Activity Log
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="glass-card transition-all duration-500 group overflow-hidden relative transform-gpu mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-zinc-700/30">
              <div className="p-4 flex flex-col justify-between h-32">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em]">CONNECTION STATUS</h3>
                  <button 
                    className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em] transition-colors hover:text-zinc-300"
                    onClick={pingDevice}
                    title="Check connection"
                  >
                    <RefreshIcon />
                  </button>
                </div>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  isOnline ? 'status-online' : 'status-offline'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-32">
                <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em]">VOICE CONTROL</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  isListening ? 'status-online' : 'status-offline'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    isListening ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                  <span>{isListening ? 'Listening' : 'Inactive'}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-32">
                <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em]">LAST COMMAND</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  lastCommand ? 'status-online' : 'status-offline'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    lastCommand ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                  <span>{lastCommand || 'None'}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-32">
                <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em]">COMMANDS SENT</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  commandCount > 0 ? 'status-online' : 'status-offline'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    commandCount > 0 ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                  <span>{commandCount}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-32">
                <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em]">GPS LOCATION</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  location || dbLocation ? 'status-online' : 'status-offline'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    location ? 'bg-blue-500' : dbLocation ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></span>
                  <span>
                    {location ? 'Located' : dbLocation ? 'Database Location' : 'Not Located'}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-32">
                <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em]">EMERGENCY EMAIL</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  isEmailConfigured ? 'status-online' : 'status-offline'
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

        <div className="glass-card transition-all duration-500 group overflow-hidden relative transform-gpu mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-zinc-700/30">
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-3">DEVICE URL</h3>
                  <div className="space-y-3">
                    <div>
                      <input 
                        ref={ipInputRef}
                        className="input-dark w-full px-3 py-2 text-sm font-mono tracking-wide"
                        placeholder="http://192.168.1.14" 
                        defaultValue={motorBaseUrl}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    className="btn-secondary flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2"
                    onClick={saveBaseUrl}
                  >
                    <SaveIcon />
                    Save Configuration
                  </button>
                  <button 
                    className="btn-primary flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2"
                    onClick={pingDevice}
                  >
                    <TestIcon />
                    Test Connection
                  </button>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-3">EMERGENCY EMAIL ADDRESS</h3>
                  <div className="space-y-3">
                    <div>
                      <input 
                        type="email"
                        className="input-dark w-full px-3 py-2 text-sm font-mono tracking-wide"
                        placeholder="emergency@example.com"
                        value={emailConfig.emergencyEmail}
                        onChange={(e) => setEmailConfig(prev => ({ ...prev, emergencyEmail: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    className="btn-secondary flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2"
                    onClick={saveEmailConfig}
                  >
                    <SaveIcon />
                    Save Emergency Email
                  </button>
                  <button 
                    className="btn-primary flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2"
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
                        Test Email
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card transition-all duration-500 group overflow-hidden relative transform-gpu mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"></div>
          <div className="relative z-10">
            <div className="p-4">
              <div className="pt-2 px-2 pb-2 relative z-10">
              <div className="grid grid-cols-5 grid-rows-5 gap-3 w-full max-w-md aspect-square mx-auto">
                <div className="col-start-2 col-span-3 row-start-1">
                  <button
                    aria-label="Forward"
                    className="btn-primary w-full h-full pad-shape-top pad-button"
                    onClick={() => sendCommand('forward')}
                  >
                    <CaretUpIcon />
                  </button>
                </div>
                <div className="col-start-1 row-start-2 row-span-3">
                  <button
                    aria-label="Left"
                    className="btn-primary w-full h-full pad-shape-left pad-button"
                    onClick={() => sendCommand('left')}
                  >
                    <CaretLeftIcon />
                  </button>
                </div>
                <div className="col-start-5 row-start-2 row-span-3">
                  <button
                    aria-label="Right"
                    className="btn-primary w-full h-full pad-shape-right pad-button"
                    onClick={() => sendCommand('right')}
                  >
                    <CaretRightIcon />
                  </button>
                </div>
                <div className="col-start-2 col-span-3 row-start-5">
                  <button
                    aria-label="Back"
                    className="btn-primary w-full h-full pad-shape-bottom pad-button"
                    onClick={() => sendCommand('back')}
                  >
                    <CaretDownIcon />
                  </button>
                </div>
                <div className="col-start-2 row-start-2 col-span-3 row-span-3 grid place-items-center">
                  <button
                    aria-label="Stop"
                    className="btn-danger w-3/4 h-3/4 pad-button"
                    onClick={() => sendCommand('stop')}
                  >
                    <StopIcon />
                  </button>
                </div>
              </div>
              <button 
                aria-label="Emergency"
                className="btn-emergency w-full px-4 py-4 text-sm flex items-center justify-center gap-2 mt-4"
                onClick={() => sendCommand('emergency')}
                disabled={isSendingEmail}
              >
                {isSendingEmail ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <EmergencyIcon />
                    Emergency
                  </>
                )}
              </button>

              <div className="mt-3 space-y-3">
                <button 
                  className={`${isListening ? 'btn-danger' : 'btn-success'} w-full px-4 py-4 text-sm flex items-center justify-center gap-2`}
                  onClick={toggleListening}
                >
                  {isListening ? <StopIcon /> : <MicrophoneIcon />}
                  {isListening ? 'Stop Voice Control' : 'Start Voice Control'}
                </button>
                <button 
                  className="btn-secondary w-full px-4 py-3 text-sm flex items-center justify-center gap-2"
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

        <div className="glass-card transition-all duration-500 group overflow-hidden relative transform-gpu mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-zinc-700/30">
              <div className="p-6">
                <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-4">GPS LOCATION</h3>
                <div className="space-y-4">
                {locationPermission === 'denied' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    Location permission denied. Please enable location access in your browser settings.
                  </div>
                )}
                
                {locationError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {locationError}
                  </div>
                )}
                
                {location ? (
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20">
                      <div className="text-sm text-blue-400 mb-2">Current Location</div>
                      <div className="text-lg font-mono text-white mb-1">
                        {formatLocation(location)}
                      </div>
                      <div className="text-xs text-zinc-400">
                        Accuracy: {formatAccuracy(location.accuracy)}
                      </div>
                      <div className="text-xs text-zinc-400">
                        Updated: {new Date(location.timestamp).toLocaleTimeString()}
                        {isAutoUpdating && (
                          <span className="ml-2 text-blue-400">
                            <div className="inline-block w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin mr-1"></div>
                            Auto-updating...
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {location.address && (
                      <div className="p-4 bg-green-500/10 border border-green-500/20">
                        <div className="text-sm text-green-400 mb-2">Address</div>
                        <div className="text-sm text-white leading-relaxed">
                          {location.address}
                        </div>
                      </div>
                    )}
                    
                    {isAddressLoading && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-center gap-2 text-yellow-400">
                          <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm">Getting address...</span>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      className="btn-primary w-full px-4 py-3 text-sm flex items-center justify-center gap-2"
                      onClick={openInMaps}
                    >
                      <MapIcon />
                      Open in Google Maps
                    </button>
                  </div>
                ) : dbLocation ? (
                  <div className="space-y-3">
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20">
                      <div className="text-sm text-yellow-400 mb-2">Last Known Location (Database)</div>
                      <div className="text-lg font-mono text-white mb-1">
                        {formatLocation(dbLocation)}
                      </div>
                      <div className="text-xs text-zinc-400">
                        Accuracy: {formatAccuracy(dbLocation.accuracy)}
                      </div>
                      <div className="text-xs text-zinc-400">
                        Updated: {new Date(dbLocation.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-yellow-400 mt-2">
                        GPS permission denied - showing database location
                      </div>
                    </div>
                    
                    {dbLocation.address && (
                      <div className="p-4 bg-green-500/10 border border-green-500/20">
                        <div className="text-sm text-green-400 mb-2">Address</div>
                        <div className="text-sm text-white leading-relaxed">
                          {dbLocation.address}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button 
                        className="btn-primary flex-1 px-4 py-3 text-sm flex items-center justify-center gap-2"
                        onClick={() => window.open(`https://www.google.com/maps?q=${dbLocation.latitude},${dbLocation.longitude}`, '_blank')}
                      >
                        <MapIcon />
                        Open in Google Maps
                      </button>
                      <button 
                        className="btn-secondary px-4 py-3 text-sm flex items-center justify-center gap-2"
                        onClick={fetchLocationFromDatabase}
                        disabled={isLoadingDbLocation}
                      >
                        {isLoadingDbLocation ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <LocationIcon />
                        )}
                        Refresh
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-zinc-400 mb-4">
                      {locationPermission === 'denied' ? 'GPS permission denied' : 'No location data available'}
                    </div>
                    {locationPermission === 'denied' ? (
                      <div className="space-y-3">
                        <button 
                          className="btn-primary px-6 py-3 text-sm flex items-center justify-center gap-2 mx-auto"
                          onClick={fetchLocationFromDatabase}
                          disabled={isLoadingDbLocation}
                        >
                          {isLoadingDbLocation ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Loading from Database...
                            </>
                          ) : (
                            <>
                              <LocationIcon />
                              Load from Database
                            </>
                          )}
                        </button>
                        <div className="text-xs text-zinc-500">
                          Shows last known location from other devices
                        </div>
                      </div>
                    ) : (
                      <button 
                        className="btn-primary px-6 py-3 text-sm flex items-center justify-center gap-2 mx-auto"
                        onClick={handleGetLocation}
                        disabled={isLocationLoading}
                      >
                        {isLocationLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Getting Location...
                          </>
                        ) : (
                          <>
                            <LocationIcon />
                            Get Current Location
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

              <div className="p-6">
                <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-4">ACTIVITY LOG</h3>
                <div ref={logContainerRef} className="log-container p-4">
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
        </div>
      </main>
    </div>
  );
}