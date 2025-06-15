import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaSatellite, FaLocationArrow, FaRegDotCircle, FaCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// Fix marker icons issue in Leaflet
const DefaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const TrackMeMap = () => {
  const [currentPosition, setCurrentPosition] = useState([19.0760, 72.8777]);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [isCentered, setIsCentered] = useState(true);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInitialized = useRef(false);

  const createPulsingIcon = () => {
    return L.divIcon({
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="
            position: absolute;
            width: 2rem;
            height: 2rem;
            background-color: #3b82f6;
            border-radius: 9999px;
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            position: relative;
            width: 1.5rem;
            height: 1.5rem;
            background-color: #2563eb;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="width: 0.75rem; height: 0.75rem; background-color: white; border-radius: 9999px;"></div>
          </div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  const handleTrackMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    if (!isTracking) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setCurrentPosition(newLocation);
          setAccuracy(position.coords.accuracy);
          
          if (isCentered && mapRef.current) {
            mapRef.current.setView(newLocation, 18);
          }

          if (markerRef.current) {
            markerRef.current.setLatLng(newLocation);
          }
        },
        (error) => {
          console.error("Error tracking position: ", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      setWatchId(id);
      setIsTracking(true);
    } else {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        setIsTracking(false);
        setWatchId(null);
      }
    }
  };

  const handleCenterMap = () => {
    if (mapRef.current && currentPosition) {
      mapRef.current.setView(currentPosition, 18);
      setIsCentered(true);
    }
  };

  useEffect(() => {
    mapInitialized.current = true;
    return () => {
      // Cleanup geolocation watcher
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      
      // Cleanup map instance
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      mapInitialized.current = false;
    };
  }, [watchId]);

  return (
    <div className="flex flex-col h-[calc(100vh-76px)] relative bg-gradient-to-b from-blue-50 to-indigo-50">
      <style>{`
        @keyframes ping {
          0% { transform: scale(0.8); opacity: 0.7; }
          70%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

      <div className="flex-1 p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <motion.button 
              onClick={handleTrackMe}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: isTracking 
                  ? 'linear-gradient(135deg, #ff416c, #ff4b2b)'
                  : 'linear-gradient(135deg, #4b6cb7, #182848)'
              }}
            >
              <FaSatellite className="text-white" />
              <span className="text-white">
                {isTracking ? "Stop Tracking" : "Track Me"}
              </span>
              {isTracking && (
                <motion.div 
                  className="w-2 h-2 bg-red-400 rounded-full"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </motion.button>

            <motion.button
              onClick={handleCenterMap}
              className="p-2.5 bg-white rounded-xl shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLocationArrow className="text-indigo-600 text-xl" />
            </motion.button>
          </div>

          <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl border-2 border-white">
            {mapInitialized.current && (
              <MapContainer 
                center={currentPosition} 
                zoom={15} 
                className="h-full w-full"
                whenCreated={(map) => {
                  mapRef.current = map;
                }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker 
                  position={currentPosition} 
                  icon={isTracking ? createPulsingIcon() : DefaultIcon}
                  ref={(ref) => {
                    if (ref) {
                      markerRef.current = ref;
                    }
                  }}
                  eventHandlers={{
                    add: () => {
                      if (markerRef.current) {
                        markerRef.current._icon.alt = 'Current location marker';
                      }
                    }
                  }}
                >
                  <Popup>
                    <div className="font-bold">Your Location</div>
                    {accuracy && (
                      <div className="text-sm text-gray-600 mt-1">
                        Accuracy: {Math.round(accuracy)} meters
                      </div>
                    )}
                  </Popup>
                </Marker>
              </MapContainer>
            )}

            {!isCentered && (
              <motion.div 
                className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg cursor-pointer"
                onClick={handleCenterMap}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                  <FaRegDotCircle className="text-xl" />
                  <span>Recentering</span>
                </div>
              </motion.div>
            )}
          </div>

          {isTracking && (
            <motion.div 
              className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 flex items-center gap-3 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex-1">
                <div className="font-bold">Tracking Active</div>
                <div className="text-sm opacity-80 flex items-center gap-1">
                  <FaCircle className="text-xs text-green-400 animate-pulse" />
                  Live location updating
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackMeMap;