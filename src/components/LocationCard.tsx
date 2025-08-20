import { LocationIcon, MapIcon } from './icons';
import { Theme, LocationData } from '@/types';

interface LocationCardProps {
  theme: Theme;
  location: LocationData | null;
  locationError: string | null;
  isLocationLoading: boolean;
  locationPermission: string;
  isAddressLoading: boolean;
  isAutoUpdating: boolean;
  dbLocation: LocationData | null;
  isLoadingDbLocation: boolean;
  getCurrentLocation: (isAutoUpdate?: boolean) => void;
  fetchLocationFromDatabase: () => void;
  formatLocation: (location: LocationData) => string;
  formatAccuracy: (accuracy: number) => string;
}

export const LocationCard = ({
  theme,
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
}: LocationCardProps) => {
  const openInMaps = () => {
    if (!location) return;
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };

  return (
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
              Maps
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
                Maps
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
                      Load
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
                onClick={() => getCurrentLocation(false)}
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
                      Locate
                    </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
