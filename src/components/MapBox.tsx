import React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBoxComponent: React.FC<{
  latitude?: number;
  longitude?: number;
  zoom?: number;
}> = ({ latitude = -79.3832, longitude = 43.6532, zoom = 10 }) => {
  return (
    <Map
      initialViewState={{ longitude, latitude, zoom }}
      style={{ width: "100%", height: "255px", borderRadius: "12px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
    >
      <Marker
        longitude={longitude}
        latitude={latitude}
        // style={{ background: "#B3322F" }}
      ></Marker>
    </Map>
  );
};

export default MapBoxComponent;
