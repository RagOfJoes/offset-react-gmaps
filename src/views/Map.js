/**
 * Map View using react-google-maps Component by @author [Tom Chent](https://github.com/tomchentw)
 * 
 * @version 1.0.0
 * @author [Victor Ragojos](https://github.com/RagofJoes)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { assignMapRef, changeMapZoom } from '../Redux/Actions/Map';
import { GoogleMap, withGoogleMap, withScriptjs, KmlLayer } from 'react-google-maps';

/**
 * @see See [Wikipedia](https://tomchentw.github.io/react-google-maps/)
 */
const GoogleMaps = withScriptjs(withGoogleMap((props) => {
    const { map } = useSelector((state) => state.Map.refs);

    // Retrieve props
    const { zoom, mapOptions, defaultZoom, defaultCenter, hasKmlLayer, kmlLayerURL, onMapMounted } = props;

    // GoogleMap Parent Component
    return (
        <GoogleMap
            zoom={zoom}
            defaultZoom={defaultZoom}
            hasKmlLayer={hasKmlLayer}
            options={{ ...mapOptions }}
            defaultCenter={defaultCenter}
            ref={(ref) => map.ref !== ref ? onMapMounted(ref) : null}
        >
            {props.children}
            {
                // Check if wanted KML layer for boundaries etc.
                hasKmlLayer ?
                    <KmlLayer
                        options={
                            {
                                clickable: true,
                                preserveViewport: true,
                                suppressInfoWindows: true
                            }
                        }
                        // onClick={(e) => console.log(e)}
                        url={kmlLayerURL}
                    />
                    : null
            }

        </GoogleMap>
    )
}));

const Map = (props) => {
    const dispatch = useDispatch();
    const { zoom } = useSelector((state) => state.Map.refs.map);
    const { apiKey, mapOptions, defaultZoom, defaultCenter, hasKmlLayer, kmlLayerURL, mapClassName, containerClassName } = props;
    return (
        <GoogleMaps
            zoom={zoom}
            isMarkerShown={true}
            mapOptions={mapOptions}
            hasKmlLayer={hasKmlLayer}
            kmlLayerURL={kmlLayerURL}
            defaultZoom={defaultZoom}
            defaultCenter={defaultCenter}
            loadingElement={<div style={{ width: "100%" }} />}
            onMapMounted={(ref) => dispatch(assignMapRef(ref))}
            mapElement={<div className={mapClassName || "map-element"} />}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
            containerElement={<div className={containerClassName || "map-element-container"} />}
        >
            {props.children}
        </GoogleMaps>
    )
}

Map.propTypes = ({
    /**
     * @param {string} apiKey for Google Maps API Key [required]
     */
    apiKey: PropTypes.string.isRequired,

    /**
     * @param {object} mapOptions for Google Maps Options
     * @see See [Wikipedia](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) for a list of fields
     */
    mapOptions: PropTypes.object,

    /**
     * @param {Int} defaultZoom for defaultZoom for Google Map [required]
     * @param {Int} defaultCenter for defaultCenter for Google Map [required]
     */
    defaultZoom: PropTypes.number.isRequired,
    defaultCenter: PropTypes.object.isRequired,

    /**
     * @param {boolean} hasKmlLayer allows for custom KML Layer for boundaries etc.
     * @param {string} kmlLayerURL if @property hasHmlLayer === true [required]
     */
    hasKmlLayer: PropTypes.bool,
    kmlLayerURL: PropTypes.string,

    /**
     * @param {string} mapClassName custom Google Map Element className @default "map-element"
     * @param {string} containerClassName custom Google Map Container Element className @default "map-element-container"
     */
    mapClassName: PropTypes.string,
    containerClassName: PropTypes.string
})

export default Map;