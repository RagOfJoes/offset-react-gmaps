import React, { useState } from "react";
import Map from "../views/Map";
import Marker from "../views/Marker";
import InfoWindow from "../views/InfoWindow";
import { mapStyle } from "../config/mapStyle";
import { regionNames, coordinates } from "../config/regionCoords";
const App = () => {
    const [hasInfoWindowOpen, toggleInfoWindows] = useState(false);

    const toggleInfoWindow = () => {
        toggleInfoWindows(!hasInfoWindowOpen);
    };

    return (
        <Map
            defaultZoom={6}
            apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
            defaultCenter={{ lat: 40.4710635, lng: -125.5791852 }}
            // Map Options Props
            mapOptions={{
                // Zoom control options
                zoomControl: true, // shows Zoom buttons in Google Maps

                // Gesture options
                gestureHandling: "greedy",

                // UI Control
                disableDefaultUI: true,

                // Custom Map Style
                styles: mapStyle
            }}
        >
            {regionNames.map(region => {
                const { lat, lng, appellations } = coordinates[region];

                return (
                    <Marker
                        // Required Props
                        lat={lat}
                        lng={lng}
                        key={region}
                        images={{
                            on: require(`../assets/${region}.svg`),
                            off: require(`../assets/${region}.svg`)
                        }}
                        // Clickable/Info Window Props
                        isClickable
                        hasInfoWindow
                        hasInfoWindowOpen={hasInfoWindowOpen}
                        toggleInfoWindow={(toggle) => toggleInfoWindow(toggle)}
                        infoWindowComponent={
                            <InfoWindow
                                region={region}
                                appellations={appellations}
                            />
                        }
                    />
                );
            })}
        </Map>
    );
};

export default App;
