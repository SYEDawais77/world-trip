/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";
export default function Map() {
  let currentCityMapPosition;
  const { cities, currentCity } = useCities();
  const {
    isLoading: isLoadingGeoLocation,
    position: geolocationMapPosition,
    getPosition,
  } = useGeolocation();

  if (Object.keys(currentCity).length > 0) {
    currentCityMapPosition = [
      currentCity.position.lat,
      currentCity.position.lng,
    ];
  } else {
    currentCityMapPosition = [51.505, -0.09];
  }

  const [mapLat, mapLng] = useURLPosition();
  const [mapPosition, setMapPosition] = useState(currentCityMapPosition);

  useEffect(
    function () {
      if (geolocationMapPosition) {
        setMapPosition([
          geolocationMapPosition.lat,
          geolocationMapPosition.lng,
        ]);
      }
    },
    [geolocationMapPosition]
  );

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingGeoLocation
          ? "Getting your position..."
          : "Get Your Current Position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <div>
                <h6>{city.cityName}</h6>
              </div>
            </Popup>
          </Marker>
        ))}
        <ChangeMapPosition position={mapPosition} />
        <DetectClickOnMap />
      </MapContainer>
    </div>
  );
}

function ChangeMapPosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClickOnMap() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
