import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Sidenav from '../../parts/Sidenav';
import Header from '../../parts/Header';
import userService from '../../../services';

const DEFAULT_CENTER = { lat: 8.50420300, lng: 124.60238000 };
const DEFAULT_ZOOM = 14;

const DebugPanel = ({ data }) => (
  <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg text-sm z-50">
    <h3 className="font-bold mb-2">Debug Info</h3>
    <div className="space-y-1">
      <p>Total Riders: {data.totalRiders}</p>
      <p>Valid Riders: {data.validRiders}</p>
      <p>Device Location: {JSON.stringify(data.deviceLocation)}</p>
      <p>Current Center: {JSON.stringify(data.currentCenter)}</p>
      <p>Map Loaded: {data.mapLoaded ? 'Yes' : 'No'}</p>
    </div>
  </div>
);

const Alert = ({ message, type = 'error', onClose }) => (
  <div className={`${type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-yellow-100 border-yellow-400 text-yellow-700'} border px-4 py-3 rounded relative mb-4`} role="alert">
    <strong className="font-bold">{type === 'error' ? 'Error! ' : 'Warning! '}</strong>
    <span className="block sm:inline">{message}</span>
    {onClose && (
      <button className="absolute top-0 right-0 px-4 py-3" onClick={onClose}>
        <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
      </button>
    )}
  </div>
);

const RidersLocation = () => {
  const [riders, setRiders] = useState([]);
  const [search, setSearch] = useState('');
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    totalRiders: 0,
    validRiders: 0,
    deviceLocation: null,
    currentCenter: DEFAULT_CENTER,
    mapLoaded: false
  });

  // Get device location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('Device location obtained:', newLocation);
          setDeviceLocation(newLocation);
          setMapCenter(newLocation);
          
          // Update debug info
          setDebugInfo(prev => ({
            ...prev,
            deviceLocation: newLocation,
            currentCenter: newLocation
          }));

          // If map is already loaded, center it on the device location
          if (map) {
            map.panTo(newLocation);
          }
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setWarning('Using default location as device location is unavailable.');
          setDebugInfo(prev => ({
            ...prev,
            deviceLocation: null,
            currentCenter: DEFAULT_CENTER
          }));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, [map]); // Added map as dependency

  const fetchRiders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await userService.fetchLoc();
      console.log('Fetched riders:', response);
      
      if (!response || !Array.isArray(response)) {
        throw new Error('Invalid response format');
      }

      setRiders(response);
      setDebugInfo(prev => ({
        ...prev,
        totalRiders: response.length
      }));
    } catch (err) {
      console.error('Error fetching riders:', err);
      setError('Failed to fetch riders locations.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and refresh interval
  useEffect(() => {
    fetchRiders();
    // const interval = setInterval(fetchRiders, 10000);
    // return () => clearInterval(interval);
  }, [fetchRiders]);

  const validRiders = React.useMemo(() => {
    const filtered = riders.filter(rider => {
      const lat = parseFloat(rider.rider_latitude);
      const lng = parseFloat(rider.rider_longitude);
      const isValid = !isNaN(lat) && !isNaN(lng) &&
                     lat >= -90 && lat <= 90 &&
                     lng >= -180 && lng <= 180;

      if (!isValid) {
        console.log('Invalid coordinates for rider:', { id: rider.user_id, lat, lng });
      }

      return isValid && 
             rider.user?.first_name?.toLowerCase().includes(search.toLowerCase());
    });

    setDebugInfo(prev => ({
      ...prev,
      validRiders: filtered.length
    }));

    return filtered;
  }, [riders, search]);

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const handleMapLoad = (mapInstance) => {
    console.log('Map loaded successfully');
    setMap(mapInstance);
    setMapLoaded(true);
    setDebugInfo(prev => ({
      ...prev,
      mapLoaded: true
    }));

    // If we already have the device location, center the map
    if (deviceLocation) {
      mapInstance.panTo(deviceLocation);
    }

    // Fit bounds only if there are valid riders
    if (validRiders.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      
      // Add device location to bounds if available
      if (deviceLocation) {
        bounds.extend(deviceLocation);
      }
      
      // Add all rider locations to bounds
      validRiders.forEach(rider => {
        bounds.extend({
          lat: parseFloat(rider.rider_latitude),
          lng: parseFloat(rider.rider_longitude)
        });
      });
      
      mapInstance.fitBounds(bounds);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidenav />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-grow p-4 bg-gray-50">
            <div className="mb-6 relative">
              <h1 className="text-2xl font-bold mb-4">Riders Location</h1>
              
              {error && <Alert message={error} onClose={() => setError(null)} />}
              {warning && <Alert message={warning} type="warning" onClose={() => setWarning(null)} />}

              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Search by rider name"
                  className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r transition-colors"
                  onClick={() => setSearch('')}
                >
                  Clear
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Available Riders: {validRiders.length} / {riders.length}
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-[600px] bg-gray-100 rounded">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="relative">
                  <LoadScript 
                    googleMapsApiKey="AIzaSyAekXSq_b4GaHneUKEBVsl4UTGlaskobFo"
                    onLoad={() => console.log('Google Maps Script loaded')}
                    onError={(error) => {
                      console.error('Google Maps Script Error:', error);
                      setError('Failed to load Google Maps');
                    }}
                  >
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={mapCenter}
                      zoom={20}
                      onLoad={handleMapLoad}
                    >
                      {/* Device Location Marker */}
                      {deviceLocation && (
                        <Marker
                          position={deviceLocation}
                          icon={{
                            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                            scaledSize: new window.google.maps.Size(32, 32)
                          }}
                          title="Your Location"
                        />
                      )}

                      {/* Rider Markers */}
                      {mapLoaded && validRiders.map((rider) => {
                        const position = {
                          lat: parseFloat(rider.rider_latitude),
                          lng: parseFloat(rider.rider_longitude)
                        };
                        
                        return (
                          <Marker
                            key={rider.user_id}
                            position={position}
                            icon={{
                              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                              scaledSize: new window.google.maps.Size(32, 32)
                            }}
                            title={`${rider.user?.first_name} ${rider.user?.last_name}`}
                          />
                        );
                      })}
                    </GoogleMap>
                  </LoadScript>
                  
                  {process.env.NODE_ENV === 'development' && (
                    <DebugPanel data={debugInfo} />
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RidersLocation;