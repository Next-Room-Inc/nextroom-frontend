import React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBoxComponent = () => {
  return (
    <Map
      initialViewState={{
        longitude: -79.3832, // Toronto
        latitude: 43.6532,
        zoom: 10,
      }}
      style={{ width: "100%", height: "255px", borderRadius: "12px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
    >
      <Marker longitude={-122.4} latitude={37.8} />
    </Map>
  );
};

export default MapBoxComponent;
