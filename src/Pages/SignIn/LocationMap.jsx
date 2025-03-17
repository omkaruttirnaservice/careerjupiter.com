import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
});

const LocationMap = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const provider = new OpenStreetMapProvider();

  const handleSearch = async () => {
    const results = await provider.search({ query: searchQuery });
    if (results.length > 0) {
      const { x: lng, y: lat } = results[0];
      setPosition([lat, lng]);
      onLocationSelect({ lat, lng });
    }
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        onLocationSelect({ lat: latitude, lng: longitude });
      },
      (err) => {
        toast.error("Error getting current location");
      }
    );
  };

  return (
    <div className="map-container">
      <div className="map-controls">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location"
        />
        <button onClick={handleSearch}>🔍</button>
        <button onClick={handleCurrentLocation}>📍 Current</button>
      </div>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && <Marker position={position} icon={customIcon} />}
        <MapClickHandler
          setPosition={setPosition}
          onLocationSelect={onLocationSelect}
        />
      </MapContainer>
    </div>
  );
};

const MapClickHandler = ({ setPosition, onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect({ lat, lng });
    },
  });
  return null;
};

export default LocationMap;
