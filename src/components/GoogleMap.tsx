import { MapPinIcon } from "@heroicons/react/20/solid";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = () => <MapPinIcon className="h-8 text-red-600" />;

type GoogleMapComponentProps = {
  latitude?: number;
  longitude?: number;
};

export default function GoogleMapComponent({
  latitude,
  longitude,
}: GoogleMapComponentProps) {
  const defaultProps = {
    center: {
      lat: latitude ?? 59.955413,
      lng: longitude ?? 30.337844,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: "" }} // Add your Google Maps API key here
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent />
      </GoogleMapReact>
    </div>
  );
}
