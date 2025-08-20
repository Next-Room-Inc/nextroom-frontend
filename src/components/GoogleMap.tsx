import { MapPinIcon } from "@heroicons/react/20/solid";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <MapPinIcon className="h-8" />;

export default function GoogleMapComponent({ latitude, longitude }) {
    const defaultProps = {
        center: {
            lat: latitude || 59.955413,
            lng: longitude || 30.337844
        },
        zoom: 11
    };
    //  orderpref.notify ? true : userprf.noitfy
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                // bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                // lat={59.955413}
                // lng={30.337844}
                />
            </GoogleMapReact>
        </div>
    );
}