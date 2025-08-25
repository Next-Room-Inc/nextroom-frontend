import React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBoxComponent = () => {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 10,
      }}
      style={{ width: "100%", height: "500px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.VITE_MAP_BOX_TOKEN}
    >
      <Marker longitude={-122.4} latitude={37.8} />
    </Map>
  );
};

export default MapBoxComponent;
