import { useState, useEffect } from 'react';
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
        
        try {
          await saveLocationToDatabase(locationData);
          
          setIsAddressLoading(true);
          try {
            const address = await getAddressFromCoordinates(locationData.latitude, locationData.longitude);
            setLocation(prev => prev ? { ...prev, address } : null);
            
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
        } catch (error) {
          console.error('Failed to save location to database:', error);
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
        }
      }
    } catch (error) {
      console.error('Failed to load location from database:', error);
    } finally {
      setIsLoadingDbLocation(false);
    }
  };

  const formatLocation = (location: LocationData) => {
    return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  };

  const formatAccuracy = (accuracy: number) => {
    if (accuracy < 10) return `${accuracy.toFixed(1)}m`;
    if (accuracy < 100) return `${accuracy.toFixed(0)}m`;
    return `${(accuracy / 1000).toFixed(1)}km`;
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermission === 'granted') {
      const interval = setInterval(() => {
        getCurrentLocation(true);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [locationPermission]);

  useEffect(() => {
    if (locationPermission === 'denied' && !location && !dbLocation) {
      fetchLocationFromDatabase();
    }
  }, [locationPermission, location, dbLocation]);

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
