import React from "react";
import PropTypes from "prop-types";
import {
    GoogleMap,
    withGoogleMap,
    withScriptjs,
    KmlLayer
} from "react-google-maps";

/**
 * @see See [Wikipedia](https://tomchentw.github.io/react-google-maps/)
 */
const GoogleMaps = withScriptjs(
    withGoogleMap(
        React.memo(props => {
            // Retrieve props
            const {
                mapRef,
                mapOptions,
                defaultZoom,
                hasKmlLayer,
                kmlLayerURL,
                defaultCenter,
                dispatchMapRef
            } = props;

            // GoogleMap Parent Component
            return (
                <GoogleMap
                    // zoom={zoom}
                    defaultZoom={defaultZoom}
                    hasKmlLayer={hasKmlLayer}
                    options={{ ...mapOptions }}
                    defaultCenter={defaultCenter}
                    ref={ref => {
                        if (ref !== null && ref !== mapRef) {
                            dispatchMapRef(ref);
                        }
                    }}
                >
                    {// Check if wanted KML layer for boundaries etc.
                    hasKmlLayer ? (
                        <KmlLayer
                            options={{
                                clickable: false,
                                preserveViewport: true,
                                suppressInfoWindows: true
                            }}
                            url={kmlLayerURL}
                        />
                    ) : null}
                    {props.children}
                </GoogleMap>
            );
        })
    )
);

/**
 * Map View using react-google-maps Component by @author [Tom Chent](https://github.com/tomchentw)
 *
 * @property {string} apiKey for Google Maps API Key [required]
 *
 * @property {node} mapRef for assigning React ref. node to Google Maps [required]
 * @property {object} mapOptions for Google Maps Options
 * @see See [Wikipedia](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) for a list of fields
 * @property {function} dispatchMapRef for Redux [required]
 *
 * @property {number} defaultZoom for defaultZoom for Google Map [required]
 * @property {object} defaultCenter for defaultCenter for Google Map [required]
 *
 * @property {boolean} hasKmlLayer allows for custom KML Layer for boundaries etc.
 * @property {string} kmlLayerURL if @property hasHmlLayer === true [required]
 *
 * @property {string} mapClassName custom Google Map Element className @default "map-element"
 * @property {string} containerClassName custom Google Map Container Element className @default "map-element-container"
 *
 * @version 1.0.0
 * @author [Victor Ragojos](https://github.com/RagofJoes)
 */
const Map = React.memo(props => {
    const {
        apiKey,
        mapRef,
        mapOptions,
        defaultZoom,
        hasKmlLayer,
        kmlLayerURL,
        mapClassName,
        defaultCenter,
        dispatchMapRef,
        containerClassName
    } = props;
    return (
        <GoogleMaps
            mapRef={mapRef}
            isMarkerShown={true}
            mapOptions={mapOptions}
            hasKmlLayer={hasKmlLayer}
            kmlLayerURL={kmlLayerURL}
            defaultZoom={defaultZoom}
            defaultCenter={defaultCenter}
            loadingElement={<div style={{ width: "100%" }} />}
            mapElement={<div className={mapClassName || "map-element"} />}
            dispatchMapRef={ref =>
                dispatchMapRef ? dispatchMapRef(ref) : null
            }
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
            containerElement={
                <div
                    className={containerClassName || "map-element-container"}
                />
            }
        >
            {props.children}
        </GoogleMaps>
    );
});

Map.propTypes = {
    apiKey: PropTypes.string.isRequired,

    mapRef: PropTypes.node.isRequired,
    mapOptions: PropTypes.object,
    dispatchMapRef: PropTypes.func.isRequired,

    defaultZoom: PropTypes.number.isRequired,
    defaultCenter: PropTypes.object.isRequired,

    hasKmlLayer: PropTypes.bool,
    kmlLayerURL: PropTypes.string.isRequired,

    mapClassName: PropTypes.string,
    containerClassName: PropTypes.string
};

export default Map;
