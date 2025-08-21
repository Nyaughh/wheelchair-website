import { useState, useEffect, useCallback, useRef } from 'react';
import { LocationData, LocationPermission } from '@/types';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState<LocationPermission>('unknown');
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isAutoUpdating, setIsAutoUpdating] = useState(false);
  const [dbLocation, setDbLocation] = useState<LocationData | null>(null);
  const [isLoadingDbLocation, setIsLoadingDbLocation] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastLocationRef = useRef<LocationData | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const checkLocationPermission = useCallback(async () => {
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
  }, []);

  const getAddressFromCoordinates = useCallback(async (latitude: number, longitude: number): Promise<string> => {
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
  }, []);

  const saveLocationToDatabase = useCallback(async (locationData: LocationData) => {
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
  }, []);

  const getCurrentLocation = useCallback((isAutoUpdate = false) => {
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
      timeout: 20000,
      maximumAge: 60000
    } as PositionOptions;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };

        const hasLocationChanged = !lastLocationRef.current || 
          Math.abs(lastLocationRef.current.latitude - locationData.latitude) > 0.00001 ||
          Math.abs(lastLocationRef.current.longitude - locationData.longitude) > 0.00001;

        if (hasLocationChanged) {
          setLocation(locationData);
          lastLocationRef.current = locationData;
          
          if (debounceRef.current) {
            clearTimeout(debounceRef.current);
          }
          
          debounceRef.current = setTimeout(async () => {
            try {
              await saveLocationToDatabase(locationData);
              
              if (!locationData.address) {
                setIsAddressLoading(true);
                try {
                  const address = await getAddressFromCoordinates(locationData.latitude, locationData.longitude);
                  setLocation(prev => {
                    const updatedLocation = prev ? { ...prev, address } : { ...locationData, address };
                    lastLocationRef.current = updatedLocation;
                    return updatedLocation;
                  });
                  
                  try {
                    await saveLocationToDatabase({ ...locationData, address });
                  } catch (error) {
                    console.error('Failed to update location with address:', error);
                  }
                } catch (error) {
                  console.error('Failed to get address:', error);
                } finally {
                  setIsAddressLoading(false);
                }
              }
            } catch (error) {
              console.error('Failed to save location to database:', error);
            }
          }, 1000);
        }
        
        if (isAutoUpdate) {
          setIsAutoUpdating(false);
        } else {
          setIsLocationLoading(false);
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
      },
      options
    );
  }, [saveLocationToDatabase, getAddressFromCoordinates]);

  const fetchLocationFromDatabase = useCallback(async () => {
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
          if (!dbLoc.address) {
            try {
              const address = await getAddressFromCoordinates(dbLoc.latitude, dbLoc.longitude);
              dbLoc.address = address;
            } catch {}
          }
          setDbLocation(dbLoc);
        }
      }
    } catch (error) {
      console.error('Failed to load location from database:', error);
    } finally {
      setIsLoadingDbLocation(false);
    }
  }, []);

  const formatLocation = useCallback((location: LocationData) => {
    return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  }, []);

  const formatAccuracy = useCallback((accuracy: number) => {
    if (accuracy < 10) return `${accuracy.toFixed(1)}m`;
    if (accuracy < 100) return `${accuracy.toFixed(0)}m`;
    return `${(accuracy / 1000).toFixed(1)}km`;
  }, []);

  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);

  useEffect(() => {
    if (locationPermission === 'granted') {
      intervalRef.current = setInterval(() => {
        getCurrentLocation(true);
      }, 300000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [locationPermission, getCurrentLocation]);

  useEffect(() => {
    if (locationPermission === 'denied' && !location && !dbLocation) {
      fetchLocationFromDatabase();
    }
  }, [locationPermission, location, dbLocation, fetchLocationFromDatabase]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
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
    formatAccuracy,
    checkLocationPermission
  };
};
