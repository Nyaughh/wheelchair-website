'use client';

import { useState, useEffect, useRef } from 'react';

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

const HeartbeatIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StethoscopeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const PulseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
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
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }

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

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add('disable-transitions');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    // Force reflow to ensure transition disabling takes effect
    void root.offsetHeight;
    setTimeout(() => {
      root.classList.remove('disable-transitions');
    }, 0);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 via-blue-25 to-white via-blue-25 to-blue-50' : 'bg-black text-white'}`}>
      <header className={`border-b ${theme === 'light' ? 'border-blue-200/60 bg-white/90 shadow-blue-500/5' : 'border-zinc-800/40 bg-black/50'} backdrop-blur-sm shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30' : 'bg-zinc-700 text-white'}`}>
                <WheelchairIcon />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg sm:text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                  {theme === 'light' ? 'Medical Mobility Assistant' : 'Smart Wheelchair'}
                </span>
                <span className={`text-xs sm:text-sm ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>
                  {theme === 'light' ? 'Healthcare Mobility' : 'Voice-Controlled System'}
                </span>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                theme === 'light' 
                  ? 'bg-blue-100 hover:bg-blue-200 text-blue-600' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">

        <div className={`${theme === 'light' ? 'medical-card' : 'glass-card'} transition-all duration-500 group overflow-hidden relative transform-gpu mb-10 sm:mb-12 lg:mb-16`}>
          <div className={`absolute inset-0 backdrop-blur-2xl shadow-lg ${theme === 'light' ? 'bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 border border-blue-200' : 'bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30'}`}></div>
          <div className="relative z-10">
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x ${theme === 'light' ? 'divide-blue-200' : 'divide-zinc-700/30'}`}>
              <div className="p-4 flex flex-col justify-between h-32">
                <div className="flex items-center justify-between">
                  <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>CONNECTION STATUS</h3>
                  <button 
                    className={`text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors ${theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-zinc-400 hover:text-zinc-300'}`}
                    onClick={pingDevice}
                    title="Check connection"
                  >
                    <RefreshIcon />
                  </button>
                </div>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  isOnline ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-32">
                <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>VOICE CONTROL</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  isListening ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    isListening ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                  <span>{isListening ? 'Listening' : 'Inactive'}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-32">
                <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>LAST COMMAND</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  lastCommand ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    lastCommand ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                  <span>{lastCommand || 'None'}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-32">
                <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>COMMANDS SENT</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  commandCount > 0 ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    commandCount > 0 ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                  <span>{commandCount}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-32">
                <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>GPS LOCATION</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  location || dbLocation ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
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
                <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>EMERGENCY EMAIL</h3>
                <div className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold ${
                  isEmailConfigured ? (theme === 'light' ? 'status-medical-online' : 'status-online') : (theme === 'light' ? 'status-medical-offline' : 'status-offline')
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
                        defaultValue={motorBaseUrl}
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
                    Save Configuration
                  </button>
                  <button 
                    className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2`}
                    onClick={pingDevice}
                  >
                    <TestIcon />
                    Test Connection
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
                        onChange={(e) => setEmailConfig(prev => ({ ...prev, emergencyEmail: e.target.value }))}
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
                    Save Emergency Email
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
                        Test Email
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

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

        <div className={`${theme === 'light' ? 'medical-card' : 'glass-card'} transition-all duration-500 group overflow-hidden relative transform-gpu mb-8`}>
          <div className={`absolute inset-0 backdrop-blur-2xl shadow-lg ${theme === 'light' ? 'bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 border border-blue-200' : 'bg-gradient-to-br from-zinc-800/90 via-zinc-900/80 to-black/95 border border-zinc-700/30'}`}></div>
          <div className="relative z-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 divide-x ${theme === 'light' ? 'divide-blue-200' : 'divide-zinc-700/30'}`}>
              <div className="p-6">
                <h3 className={`text-[10px] font-semibold uppercase tracking-[0.15em] mb-4 flex items-center gap-2 ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>
                  <LocationIcon />
                  {theme === 'light' ? 'PATIENT LOCATION' : 'GPS LOCATION'}
                </h3>
                <div className="space-y-4">
                {locationPermission === 'denied' && (
                  <div className={`${theme === 'light' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-red-500/10 border border-red-500/20 text-red-400'} p-3 text-sm rounded-lg`}>
                    Location permission denied. Please enable location access in your browser settings.
                  </div>
                )}
                
                {locationError && (
                  <div className={`${theme === 'light' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-red-500/10 border border-red-500/20 text-red-400'} p-3 text-sm rounded-lg`}>
                    {locationError}
                  </div>
                )}
                
                {location ? (
                  <div className="space-y-3">
                    <div className={`${theme === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-blue-500/10 border border-blue-500/20'} p-4 rounded-lg`}>
                      <div className={`${theme === 'light' ? 'text-blue-700' : 'text-blue-400'} text-sm mb-2 font-semibold`}>Current Location</div>
                      <div className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} text-lg font-mono mb-1`}>
                        {formatLocation(location)}
                      </div>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-zinc-400'}`}>
                        Accuracy: {formatAccuracy(location.accuracy)}
                      </div>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-zinc-400'}`}>
                        Updated: {new Date(location.timestamp).toLocaleTimeString()}
                        {isAutoUpdating && (
                          <span className={`${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} ml-2`}>
                            <div className={`inline-block w-3 h-3 border ${theme === 'light' ? 'border-blue-600' : 'border-blue-400'} border-t-transparent rounded-full animate-spin mr-1`}></div>
                            Auto-updating...
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {location.address && (
                      <div className={`${theme === 'light' ? 'bg-green-50 border border-green-200' : 'bg-green-500/10 border border-green-500/20'} p-4 rounded-lg`}>
                        <div className={`${theme === 'light' ? 'text-green-700' : 'text-green-400'} text-sm mb-2 font-semibold`}>Address</div>
                        <div className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} text-sm leading-relaxed`}>
                          {location.address}
                        </div>
                      </div>
                    )}
                    
                    {isAddressLoading && (
                      <div className={`${theme === 'light' ? 'bg-yellow-50 border border-yellow-200' : 'bg-yellow-500/10 border border-yellow-500/20'} p-4 rounded-lg`}>
                        <div className={`flex items-center gap-2 ${theme === 'light' ? 'text-yellow-700' : 'text-yellow-400'}`}>
                          <div className={`w-4 h-4 border-2 ${theme === 'light' ? 'border-yellow-600' : 'border-yellow-400'} border-t-transparent rounded-full animate-spin`}></div>
                          <span className="text-sm">Getting address...</span>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm flex items-center justify-center gap-2`}
                      onClick={openInMaps}
                    >
                      <MapIcon />
                      Open in Google Maps
                    </button>
                  </div>
                ) : dbLocation ? (
                  <div className="space-y-3">
                    <div className={`${theme === 'light' ? 'bg-yellow-50 border border-yellow-200' : 'bg-yellow-500/10 border border-yellow-500/20'} p-4 rounded-lg`}>
                      <div className={`${theme === 'light' ? 'text-yellow-700' : 'text-yellow-400'} text-sm mb-2 font-semibold`}>Last Known Location (Database)</div>
                      <div className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} text-lg font-mono mb-1`}>
                        {formatLocation(dbLocation)}
                      </div>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-zinc-400'}`}>
                        Accuracy: {formatAccuracy(dbLocation.accuracy)}
                      </div>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-zinc-400'}`}>
                        Updated: {new Date(dbLocation.timestamp).toLocaleTimeString()}
                      </div>
                      <div className={`text-xs mt-2 ${theme === 'light' ? 'text-yellow-700' : 'text-yellow-400'}`}>
                        GPS permission denied - showing database location
                      </div>
                    </div>
                    
                    {dbLocation.address && (
                      <div className={`${theme === 'light' ? 'bg-green-50 border border-green-200' : 'bg-green-500/10 border border-green-500/20'} p-4 rounded-lg`}>
                        <div className={`${theme === 'light' ? 'text-green-700' : 'text-green-400'} text-sm mb-2 font-semibold`}>Address</div>
                        <div className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} text-sm leading-relaxed`}>
                          {dbLocation.address}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button 
                        className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm flex items-center justify-center gap-2`}
                        onClick={() => window.open(`https://www.google.com/maps?q=${dbLocation.latitude},${dbLocation.longitude}`, '_blank')}
                      >
                        <MapIcon />
                        Open in Google Maps
                      </button>
                      <button 
                        className={`${theme === 'light' ? 'btn-medical-secondary' : 'btn-secondary'} px-3 sm:px-4 py-2.5 sm:py-3 text-sm flex items-center justify-center gap-2`}
                        onClick={fetchLocationFromDatabase}
                        disabled={isLoadingDbLocation}
                      >
                        {isLoadingDbLocation ? (
                          <div className={`w-4 h-4 border-2 ${theme === 'light' ? 'border-blue-600' : 'border-white'} border-t-transparent rounded-full animate-spin`}></div>
                        ) : (
                          <LocationIcon />
                        )}
                        Refresh
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className={`${theme === 'light' ? 'text-gray-600' : 'text-zinc-400'} mb-4`}>
                      {locationPermission === 'denied' ? 'GPS permission denied' : 'No location data available'}
                    </div>
                    {locationPermission === 'denied' ? (
                      <div className="space-y-3">
                        <button 
                          className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} px-5 sm:px-6 py-2.5 sm:py-3 text-sm flex items-center justify-center gap-2 mx-auto`}
                          onClick={fetchLocationFromDatabase}
                          disabled={isLoadingDbLocation}
                        >
                          {isLoadingDbLocation ? (
                            <>
                              <div className={`w-4 h-4 border-2 ${theme === 'light' ? 'border-blue-600' : 'border-white'} border-t-transparent rounded-full animate-spin`}></div>
                              Loading from Database...
                            </>
                          ) : (
                            <>
                              <LocationIcon />
                              Load from Database
                            </>
                          )}
                        </button>
                        <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-zinc-500'}`}>
                          Shows last known location from other devices
                        </div>
                      </div>
                    ) : (
                      <button 
                        className={`${theme === 'light' ? 'btn-medical-primary' : 'btn-primary'} px-5 sm:px-6 py-2.5 sm:py-3 text-sm flex items-center justify-center gap-2 mx-auto`}
                        onClick={handleGetLocation}
                        disabled={isLocationLoading}
                      >
                        {isLocationLoading ? (
                          <>
                            <div className={`w-4 h-4 border-2 ${theme === 'light' ? 'border-blue-600' : 'border-white'} border-t-transparent rounded-full animate-spin`}></div>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}